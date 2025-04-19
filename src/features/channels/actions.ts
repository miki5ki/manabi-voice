"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { prismaErrorHandler } from "@/lib/prismaErrorHandler";
import { validateSchema } from "@/lib/validation";

const ChannelSchema = z.object({
  id: z.string(),
  title: z.string(),
  appUserId: z.string(),
  categoryId: z.string(),
  description: z.string().nullable(),
});

const CreateChannelSchema = ChannelSchema.omit({ id: true });
const DeleteChannelSchema = ChannelSchema.omit({ title: true, categoryId: true, description: true });

type GetChannelsParams = {
  appUserId?: string;
  keyWord?: string;
};

export async function createChannel(formData: FormData) {
  const validChannel = validateSchema(CreateChannelSchema, {
    title: formData.get("channelTitle"),
    appUserId: formData.get("appUserId"),
    categoryId: formData.get("categoryId"),
    description: formData.get("channelDescription"),
  });

  try {
    await prisma.$transaction(async (prisma) => {
      const res = await prisma.channel.create({
        data: {
          title: validChannel.title,
          appUserId: validChannel.appUserId,
          description: validChannel.description,
        },
      });

      const channelId = res.id;
      const categoryId = validChannel.categoryId;

      await prisma.channelsCategoriesRelations.create({
        data: {
          categoryId: categoryId,
          channelId: channelId,
        },
      });
    });
  } catch (e) {
    // handler内のthrowで終了する関数なので return 不要
    prismaErrorHandler(e);
  }
  revalidatePath("/channels");
  redirect("/channels");
}

export async function getChannels(params: GetChannelsParams = {}) {
  try {
    const res = await prisma.channel.findMany({
      where: {
        ...(params.appUserId ? { title: { contains: params.appUserId } } : {}),
        ...(params.keyWord ? { title: { contains: params.keyWord } } : {}),
      },
    });
    return res;
  } catch (e) {
    // handler内のthrowで終了する関数なので return 不要
    prismaErrorHandler(e);
  }
}

export async function getChannel(channelId: string) {
  try {
    const res = await prisma.channel.findUnique({
      where: {
        id: channelId,
      },
    });

    return res;
  } catch (e) {
    // handler内のthrowで終了する関数なので return 不要
    prismaErrorHandler(e);
  }
}

export async function updateChannel(formData: FormData) {
  const validChannel = validateSchema(ChannelSchema, {
    id: formData.get("channelId"),
    title: formData.get("channelTitle"),
    categoryId: formData.get("categoryId"),
    description: formData.get("channelDescription"),
    userId: formData.get("appUserId"),
  });

  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.channel.update({
        data: { title: validChannel.title, description: validChannel.description },
        where: { id: validChannel.id },
      });

      const categoryId = validChannel.categoryId;
      const channelId = validChannel.id;

      await prisma.channelsCategoriesRelations.upsert({
        create: {
          categoryId: categoryId,
          channelId: channelId,
        },
        update: {
          categoryId: categoryId,
        },
        where: { channelId: channelId },
      });
    });
  } catch (e) {
    // handler内のthrowで終了する関数なので return 不要
    prismaErrorHandler(e);
  }
  revalidatePath("/channels");
  redirect("/channels");
}

export async function deleteChannel(formData: FormData) {
  const validChannel = validateSchema(DeleteChannelSchema, {
    id: formData.get("channelId"),
  });

  try {
    await prisma.$transaction(async (prisma) => {
      const channelId = validChannel.id;

      await prisma.channel.delete({
        where: {
          id: channelId,
        },
      });

      await prisma.channelsCategoriesRelations.delete({
        where: {
          channelId: channelId,
        },
      });
    });
  } catch (e) {
    // handler内のthrowで終了する関数なので return 不要
    prismaErrorHandler(e);
  }
  revalidatePath("/channels");
  redirect("/channels");
}
