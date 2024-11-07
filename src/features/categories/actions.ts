"use server";

import { Category } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const CategorySchema = z.object({
  id: z.number(),
  title: z.string(),
});

const CreateCategorySchema = CategorySchema.omit({ id: true });

export async function createCategory(formData: FormData) {
  const validatedFields = CreateCategorySchema.safeParse({
    title: formData.get("categoryTitle"),
  });

  if (!validatedFields.success) {
    console.error("Validation Error:", validatedFields.error);
    throw new Error("Validation failed");
  }

  try {
    const res = await prisma.category.create({
      data: {
        title: validatedFields.data.title,
      },
    });
    return res;
  } catch (e) {
    console.log("Database Error:", e);
  }
  revalidatePath("/categories");
  redirect("/categories");
}

export async function getCategory(categoryId: string) {
  try {
    const res = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    console.log(res);

    return res;
  } catch (e) {
    console.log("DataBaseError", e);
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await prisma.category.findMany();
    console.log(res);
    return res ?? [];
  } catch (e) {
    console.error("Database Error", e);
    return [];
  }
}
