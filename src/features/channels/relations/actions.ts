// "use server";

// import { prisma } from "@/lib/prisma";

// export async function getChannelsCategoriesRelationsByChannelId(channelId: string) {
//   const res = await prisma.channelsCategoriesRelations.findUnique({
//     where: {
//       channelId: channelId,
//     },
//   });
//   return res;
// }

// export async function getChannelsCategoriesRelationsByCategoryId(categoryId: string) {
//   const res = await prisma.channelsCategoriesRelations.findMany({
//     where: {
//       categoryId: categoryId,
//     },
//   });
//   return res;
// }
