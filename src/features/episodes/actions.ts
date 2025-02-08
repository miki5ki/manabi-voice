"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { prismaErrorHandler } from "@/lib/prismaErrorHandler";
import { validateSchema } from "@/lib/validation";

const EpisodeSchema = z.object({
  id: z.string(),
  title: z.string(),
  audioId: z.string(),
  categoryId: z.string(),
  content: z.string(),
  userId: z.string(),
});

const CreateEpisodeSchema = EpisodeSchema.omit({ id: true });

const DeleteEpisodeSchema = EpisodeSchema.omit({
  title: true,
  audioId: true,
  categoryId: true,
  content: true,
  userId: true,
});
export async function createEpisode(formData: FormData) {
  const validEpisode = validateSchema(CreateEpisodeSchema, {
    title: formData.get("episodeTitle"),
    audioId: formData.get("audioId"),
    categoryId: formData.get("categoryId"),
    content: formData.get("episodeContent"),
    userId: formData.get("userId"),
  });

  try {
    await prisma.$transaction(async (prisma) => {
      const res = await prisma.episode.create({
        data: {
          title: validEpisode.title,
          audioId: validEpisode.audioId,
          content: validEpisode.content,
          userId: validEpisode.userId,
        },
      });

      const episodeId = res.id;
      const categoryId = validEpisode.categoryId;

      await prisma.episodesCategoriesRelations.create({
        data: {
          categoryId: categoryId,
          episodeId: episodeId,
        },
      });
    });
  } catch (e) {
    return prismaErrorHandler(e);
  }

  revalidatePath("/episodes");
  redirect("/episodes");
}

export async function getEpisode(episodeId: string) {
  try {
    const res = await prisma.episode.findUnique({
      where: {
        id: episodeId,
      },
    });
    return res;
  } catch (e) {
    console.error("Database Error", e);
    return null;
  }
}

export async function getEpisodes() {
  try {
    const res = await prisma.episode.findMany();
    return res;
  } catch (e) {
    console.error("Database Error", e);
    return [];
  }
}

export async function updateEpisode(formData: FormData) {
  const validEpisode = validateSchema(EpisodeSchema, {
    id: formData.get("episodeId"),
    title: formData.get("episodeTitle"),
    audioId: formData.get("audioId"),
    categoryId: formData.get("categoryId"),
    content: formData.get("episodeContent"),
    userId: formData.get("userId"),
  });

  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.episode.update({
        data: {
          title: validEpisode.title,
          audioId: validEpisode.audioId,
          content: validEpisode.content,
          userId: validEpisode.userId,
        },
        where: { id: validEpisode.id },
      });

      const categoryId = validEpisode.categoryId;
      const episodeId = validEpisode.id;

      await prisma.episodesCategoriesRelations.upsert({
        create: {
          categoryId: categoryId,
          episodeId: episodeId,
        },
        update: {
          categoryId: categoryId,
        },
        where: { episodeId: episodeId },
      });
    });
  } catch (e) {
    return prismaErrorHandler(e);
  }
  revalidatePath("/episodes");
  redirect("/episodes");
}

export async function deleteEpisode(formData: FormData) {
  const validEpisode = validateSchema(DeleteEpisodeSchema, {
    id: formData.get("episodeId"),
  });

  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.episode.delete({
        where: {
          id: validEpisode.id,
        },
      });

      await prisma.episodesCategoriesRelations.delete({
        where: {
          episodeId: validEpisode.id,
        },
      });
    });
  } catch (e) {
    return prismaErrorHandler(e);
  }
  revalidatePath("/episodes");
  redirect("/episodes");
}
