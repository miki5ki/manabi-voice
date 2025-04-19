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
  appUserId: z.string(),
  audioId: z.string(),
  categoryId: z.string(),
  channelId: z.string(),
  description: z.string(),
});

const CreateEpisodeSchema = EpisodeSchema.omit({ id: true });

const DeleteEpisodeSchema = EpisodeSchema.omit({
  title: true,
  appUserId: true,
  audioId: true,
  categoryId: true,
  description: true,
});

type GetEpisodesParams = {
  channelId?: string;
  keyWord?: string;
};

export async function createEpisode(formData: FormData) {
  try {
    await prisma.$transaction(async (prisma) => {
      const randomString = () => Math.random().toString(36).substring(2);

      const audio = await prisma.audio.create({
        data: {
          filePath: randomString(),
        },
      });

      const validEpisode = validateSchema(CreateEpisodeSchema, {
        title: formData.get("episodeTitle"),
        appUserId: formData.get("appUserId"),
        audioId: audio.id,
        categoryId: formData.get("categoryId"),
        channelId: formData.get("channelId"),
        description: formData.get("episodeDescription"),
      });

      const episode = await prisma.episode.create({
        data: {
          title: validEpisode.title,
          appUserId: validEpisode.appUserId,
          audioId: validEpisode.audioId,
          channelId: validEpisode.channelId,
          description: validEpisode.description,
        },
      });

      const episodeId = episode.id;
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
    prismaErrorHandler(e);
  }
}

export async function getEpisodes(params: GetEpisodesParams = {}) {
  try {
    const res = await prisma.episode.findMany({
      where: {
        ...(params.channelId && { channelId: params.channelId }),
        ...(params.keyWord && { title: { contains: params.keyWord } }),
      },
    });

    return res;
  } catch (e) {
    prismaErrorHandler(e);
  }
}

export async function updateEpisode(formData: FormData) {
  const validEpisode = validateSchema(EpisodeSchema, {
    id: formData.get("episodeId"),
    title: formData.get("episodeTitle"),
    appUserId: formData.get("appUserId"),
    audioId: formData.get("audioId"),
    categoryId: formData.get("categoryId"),
    channelId: formData.get("channelId"),
    description: formData.get("episodeDescription"),
  });

  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.episode.update({
        data: {
          title: validEpisode.title,
          appUserId: validEpisode.appUserId,
          audioId: validEpisode.audioId,
          description: validEpisode.description,
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
