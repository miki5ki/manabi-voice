"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { prismaErrorHandler } from "@/lib/prismaErrorHandler";
import { validateSchema } from "@/lib/validation";

const CommentSchema = z.object({
  id: z.string(),
  appUserId: z.string(),
  description: z.string(),
  episodeId: z.string(),
});

const CreateCommentSchema = CommentSchema.omit({ id: true });

export async function CreateComment(formData: FormData) {
  const validComment = validateSchema(CreateCommentSchema, {
    appUserId: formData.get("appUserId"),
    description: formData.get("description"),
    episodeId: formData.get("episodeId"),
  });

  try {
    await prisma.comments.create({
      data: {
        appUserId: validComment.appUserId,
        description: validComment.description,
        episodeId: validComment.episodeId,
      },
    });
  } catch (e) {
    // handler内のthrowで終了する関数なので return 不要
    prismaErrorHandler(e);
  }
  revalidatePath(`/episodes${validComment.episodeId}`);
}

export async function getComments(episodeId: string) {
  try {
    const res = await prisma.comments.findMany({
      include: {
        user: {
          select: { name: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      where: { episodeId },
    });
    const formattedComments = res.map((comment) => ({
      ...comment,
      createdAtFormatted: new Date(comment.createdAt).toLocaleString("ja-JP", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    }));

    return formattedComments;
  } catch (e) {
    // handler内のthrowで終了する関数なので return 不要
    prismaErrorHandler(e);
  }
}
