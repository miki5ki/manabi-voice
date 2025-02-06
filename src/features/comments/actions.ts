"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { prismaErrorHandler } from "@/lib/prismaErrorHandler";
import { validateSchema } from "@/lib/validation";

const CommentSchema = z.object({
  id: z.string(),
  description: z.string(),
  episodeId: z.string(),
  userId: z.string(),
});

const CreateCommentSchema = CommentSchema.omit({ id: true });

export async function CreateComment(formData: FormData) {
  const validComment = validateSchema(CreateCommentSchema, {
    description: formData.get("description"),
    episodeId: formData.get("episodeId"),
    userId: formData.get("userId"),
  });

  try {
    await prisma.comments.create({
      data: {
        description: validComment.description,
        episodeId: validComment.episodeId,
        userId: validComment.userId,
      },
    });
  } catch (e) {
    return prismaErrorHandler(e);
  }
  revalidatePath(`/episodes${validComment.episodeId}`);
}

export async function getComments(id: string) {
  try {
    const res = await prisma.comments.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        episodeId: id,
      },
    });
    return res;
  } catch (e) {
    console.error("Database Error:", e);
  }
}
