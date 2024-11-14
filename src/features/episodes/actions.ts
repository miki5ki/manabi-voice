"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const EpisodeSchema = z.object({
  id: z.string(),
  title: z.string(),
  audioId: z.string(),
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
  content: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});
export async function createEpisode(formData: FormData) {
  const validatedFields = CreateEpisodeSchema.safeParse({
    title: formData.get("episodeTitle"),
    audioId: formData.get("audioId"),
    content: formData.get("episodeContent"),
    userId: formData.get("userId"),
  });

  if (!validatedFields.success) {
    throw new Error("Validation failed");
  }

  try {
    await prisma.episode.create({
      data: {
        title: validatedFields.data.title,
        audioId: validatedFields.data.audioId,
        content: validatedFields.data.content,
        userId: validatedFields.data.userId,
      },
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
    content: formData.get("episodeContent"),
    userId: formData.get("userId"),
  });

  if (!validatedFields.success) {
    console.error("Validation Error:", validatedFields.error);
    throw new Error("Validation failed");
  }
  try {
    await prisma.episode.update({
      data: {
        title: validatedFields.data.title,
        audioId: validatedFields.data.audioId,
        content: validatedFields.data.content,
        userId: validatedFields.data.userId,
      },
      where: { id: validatedFields.data.id },
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
    await prisma.episode.delete({
      where: {
        id: validatedFields.data.id,
      },
    });
  } catch (e) {
    console.error("Database Error:", e);
    return {};
  }
  revalidatePath("/episodes");
  redirect("/episodes");
}
