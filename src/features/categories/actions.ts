"use server";

import { Category } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { prismaErrorHandler } from "@/lib/prismaErrorHandler";

const CategorySchema = z.object({
  id: z.string(),
  title: z.string(),
});

const CreateCategorySchema = CategorySchema.omit({ id: true });
const DeleteCategorySchema = CategorySchema.omit({ title: true });

export async function createCategory(formData: FormData) {
  const validatedFields = CreateCategorySchema.safeParse({
    title: formData.get("categoryTitle"),
  });

  if (!validatedFields.success) {
    return new Response("リクエストの入力値が正しくありません", { status: 400 });
  }

  try {
    await prisma.category.create({
      data: {
        title: validatedFields.data.title,
      },
    });
  } catch (e) {
    return prismaErrorHandler(e);
  }

  revalidatePath("/categories");
  redirect("/categories");
}

export async function getCategory(categoryId: string): Promise<Category | null> {
  try {
    const res = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    return res;
  } catch (e) {
    console.error("Prisma Error in getCategory:", e);
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await prisma.category.findMany();
    return res;
  } catch (e) {
    console.error("Database Error", e);
    return [];
  }
}

export async function updateCategory(formData: FormData) {
  const validatedFields = CategorySchema.safeParse({
    id: formData.get("categoryId"),
    title: formData.get("categoryTitle"),
  });

  if (!validatedFields.success) {
    return new Response("リクエストの入力値が正しくありません", { status: 400 });
  }

  try {
    await prisma.category.update({
      data: {
        title: validatedFields.data.title,
      },
      where: {
        id: validatedFields.data.id,
      },
    });
  } catch (e) {
    return prismaErrorHandler(e);
  }
  revalidatePath("/categories");
  redirect("/categories");
}

export async function deleteCategory(formData: FormData) {
  const validatedFields = DeleteCategorySchema.safeParse({
    id: formData.get("categoryId"),
  });

  if (!validatedFields.success) {
    return new Response("リクエストの入力値が正しくありません", { status: 400 });
  }

  try {
    await prisma.category.delete({
      where: {
        id: validatedFields.data.id,
      },
    });
  } catch (e) {
    return prismaErrorHandler(e);
  }
  revalidatePath("/categories");
  redirect("/categories");
}
