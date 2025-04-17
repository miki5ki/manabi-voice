"use server";

import { prisma } from "@/lib/prisma";
import { prismaErrorHandler } from "@/lib/prismaErrorHandler";

export async function getChannelsByCategory(categoryId: string) {
  try {
    const relations = await prisma.channelsCategoriesRelations.findMany({
      where: {
        categoryId: categoryId,
      },
    });

    const channels = await Promise.all(
      relations.map((relation) =>
        prisma.channel.findUniqueOrThrow({
          where: {
            id: relation.channelId,
          },
        }),
      ),
    );
    return channels;
  } catch (e) {
    return prismaErrorHandler(e);
  }
}

export async function getEpisodesByCategory(categoryId: string) {
  try {
    const relations = await prisma.episodesCategoriesRelations.findMany({
      where: {
        categoryId: categoryId,
      },
    });

    const episodes = await Promise.all(
      relations.map((relation) =>
        prisma.episode.findUniqueOrThrow({
          where: {
            id: relation.episodeId,
          },
        }),
      ),
    );
    return episodes;
  } catch (e) {
    return prismaErrorHandler(e);
  }
}
