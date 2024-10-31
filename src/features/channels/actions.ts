"use server";

import { Channel } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const ChannelSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

const CreateChannelSchema = ChannelSchema.omit({ id: true });

export async function createChannel(formData: FormData) {
  const validatedFields = CreateChannelSchema.safeParse({
    title: formData.get("channelTitle"),
    description: formData.get("channelDescription"),
  });

  if (!validatedFields.success) {
    console.error("Validation Error:", validatedFields.error);
    return null;
  }

  try {
    await prisma.channel.create({
      data: validatedFields.data,
    });
  } catch (e) {
    console.log("Database Error:", e);
  }
  revalidatePath("/channels");
  redirect("/channels");
}

export async function getChannels() {
  try {
    const res = await prisma.channel.findMany();

    return res;
  } catch (e) {
    console.error("Database Error", e);
  }
}

export async function getChannel(channelId: string): Promise<Channel | null> {
  try {
    const res = await prisma.channel.findUnique({
      where: {
        id: channelId,
      },
    });

    return res;
  } catch (e) {
    console.error("Database Error:", e);
    return null;
  }
}

export async function updateChannel(formData: FormData) {
  const validatedFields = ChannelSchema.safeParse({
    id: formData.get("channelId"),
    title: formData.get("channelTitle"),
    description: formData.get("channelDescription"),
  });

  if (!validatedFields.success) {
    console.error("Validation Error:", validatedFields.error);
    return null;
  }
  try {
    await prisma.channel.update({
      data: { title: validatedFields.data.title, description: validatedFields.data.description },
      where: { id: validatedFields.data.id },
    });
  } catch (e) {
    console.error("Database Error:", e);
    return null;
  }
  revalidatePath("/channels");
  redirect("/channels");
}

export async function deleteChannel(channelId: string) {
  try {
    const res = await prisma.channel.delete({
      where: {
        id: channelId,
      },
    });
    return res;
  } catch (e) {
    console.error("Database Error:", e);
    return null;
  }
}
