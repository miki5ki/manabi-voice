"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { assertHasPermission, assertIsOwner } from "@/lib/permission";
import { prisma } from "@/lib/prisma";
import { prismaErrorHandler } from "@/lib/prismaErrorHandler";
import { validateSchema } from "@/lib/validation";

import { getValidSession } from "../auth/actions";

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

const EditEpisodeSchema = EpisodeSchema.extend({
  loginAppUserId: z.string(),
});

const DeleteEpisodeSchema = EpisodeSchema.omit({
  title: true,
  audioId: true,
  categoryId: true,
  channelId: true,
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

      const appUser = await getValidSession();
      assertHasPermission(appUser.user.appUserRole, "episode:create");

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
    // handler内のthrowで終了する関数なので return 不要
    prismaErrorHandler(e);
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
        ...(params.channelId ? { channelId: params.channelId } : {}),
        ...(params.keyWord ? { title: { contains: params.keyWord } } : {}),
      },
    });

    return res;
  } catch (e) {
    prismaErrorHandler(e);
  }
}

export async function updateEpisode(formData: FormData) {
  const validEpisode = validateSchema(EditEpisodeSchema, {
    id: formData.get("episodeId"),
    title: formData.get("episodeTitle"),
    appUserId: formData.get("createdAppUserId"),
    audioId: formData.get("audioId"),
    categoryId: formData.get("categoryId"),
    channelId: formData.get("channelId"),
    description: formData.get("episodeDescription"),
  });

  const appUser = await getValidSession();
  assertHasPermission(appUser.user.appUserRole, "episode:create");
  assertIsOwner(validEpisode.loginAppUserId, validEpisode.appUserId);

  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.episode.update({
        data: {
          title: validEpisode.title,
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
    // handler内のthrowで終了する関数なので return 不要
    prismaErrorHandler(e);
  }
  revalidatePath("/episodes");
  redirect("/episodes");
}

export async function deleteEpisode(formData: FormData) {
  const validEpisode = validateSchema(DeleteEpisodeSchema, {
    id: formData.get("episodeId"),
    appUserId: formData.get("createdAppUserId"),
    loginAppUserId: formData.get("loginAppUserId"),
  });

  assertIsOwner(validEpisode.loginAppUserId, validEpisode.appUserId);

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
    // handler内のthrowで終了する関数なので return 不要
    prismaErrorHandler(e);
  }
  revalidatePath("/episodes");
  redirect("/episodes");
}
