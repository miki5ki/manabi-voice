"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const EpisodeSchema = z.object({
  id: z.string(),
  title: z.string(),
  audioId: z.string(),
  categoryId: z.string(),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  userId: z.string(),
});

const CreateEpisodeSchema = EpisodeSchema.omit({ id: true, createdAt: true, updatedAt: true });
const UpdateEpisodeSchema = EpisodeSchema.omit({ createdAt: true, updatedAt: true });
const DeleteEpisodeSchema = EpisodeSchema.omit({
  title: true,
  audioId: true,
  categoryId: true,
  content: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});
export async function createEpisode(formData: FormData) {
  const validatedFields = CreateEpisodeSchema.safeParse({
    title: formData.get("episodeTitle"),
    audioId: formData.get("audioId"),
    categoryId: formData.get("categoryId"),
    content: formData.get("episodeContent"),
    userId: formData.get("userId"),
  });

  if (!validatedFields.success) {
    throw new Error("Validation failed");
  }

  try {
    await prisma.$transaction(async (prisma) => {
      const res = await prisma.episode.create({
        data: {
          title: validatedFields.data.title,
          audioId: validatedFields.data.audioId,
          content: validatedFields.data.content,
          userId: validatedFields.data.userId,
        },
      });

      const episodeId = res.id;
      const categoryId = validatedFields.data.categoryId;

      await prisma.episodesCategoriesRelations.create({
        data: {
          categoryId: categoryId,
          episodeId: episodeId,
        },
      });
    });
  } catch (e) {
    console.error(e);
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
    return res ?? {};
  } catch (e) {
    console.error(e);
    return {};
  }
}

export async function getEpisodes() {
  try {
    const res = await prisma.episode.findMany();
    return res ?? [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function updateEpisode(formData: FormData) {
  const validatedFields = UpdateEpisodeSchema.safeParse({
    id: formData.get("episodeId"),
    title: formData.get("episodeTitle"),
    audioId: formData.get("audioId"),
    categoryId: formData.get("categoryId"),
    content: formData.get("episodeContent"),
    userId: formData.get("userId"),
  });

  if (!validatedFields.success) {
    console.error("Validation Error:", validatedFields.error);
    throw new Error("Validation failed");
  }
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.episode.update({
        data: {
          title: validatedFields.data.title,
          audioId: validatedFields.data.audioId,
          content: validatedFields.data.content,
          userId: validatedFields.data.userId,
        },
        where: { id: validatedFields.data.id },
      });

      const categoryId = validatedFields.data.categoryId;
      const episodeId = validatedFields.data.id;

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
    console.error("Database Error:", e);
    return {};
  }
  revalidatePath("/episodes");
  redirect("/episodes");
}

export async function deleteEpisode(formData: FormData) {
  const validatedFields = DeleteEpisodeSchema.safeParse({
    id: formData.get("episodeId"),
  });
  if (!validatedFields.success) {
    console.error("Validation Error:", validatedFields.error);
    return null;
  }

  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.episode.delete({
        where: {
          id: validatedFields.data.id,
        },
      });

      await prisma.episodesCategoriesRelations.delete({
        where: {
          episodeId: validatedFields.data.id,
        },
      });
    });
  } catch (e) {
    console.error("Database Error:", e);
    return {};
  }
  revalidatePath("/episodes");
  redirect("/episodes");
}
