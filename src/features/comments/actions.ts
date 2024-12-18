"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const CommentSchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  description: z.string(),
  episodeId: z.string(),
  updatedAt: z.string().datetime(),
  userId: z.string(),
});

const CreateCommentSchema = CommentSchema.omit({ id: true, createdAt: true, updatedAt: true });

export async function CreateComment(formData: FormData) {
  const validatedFields = CreateCommentSchema.safeParse({
    description: formData.get("description"),
    episodeId: formData.get("episodeId"),
    userId: formData.get("userId"),
  });

  if (!validatedFields.success) {
    throw new Error("Validation failed");
  }

  try {
    await prisma.comments.create({
      data: {
        description: validatedFields.data.description,
        episodeId: validatedFields.data.episodeId,
        userId: validatedFields.data.userId,
      },
    });
  } catch (e) {
    console.log("Database Error:", e);
  }
  revalidatePath(`/episodes${validatedFields.data.episodeId}`);
}

export async function getComments(id: string) {
  try {
    const comments = await prisma.comments.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        episodeId: id,
      },
    });
    return comments;
  } catch (e) {
    console.log("Database Error:", e);
  }
}
