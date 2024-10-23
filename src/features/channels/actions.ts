"use server";

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

  if (validatedFields.success) {
    try {
      const res = await prisma.channel.create({
        data: validatedFields.data,
      });
      return res;
    } catch (e) {
      console.log("Database Error:", e);
    }
    revalidatePath("/channels");
    redirect("/channels");
  } else {
    console.error("Validation failed:", validatedFields.error);
  }
}
