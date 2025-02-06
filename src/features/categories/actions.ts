"use server";

import { Category } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { prismaErrorHandler } from "@/lib/prismaErrorHandler";
import { validateSchema } from "@/lib/validation";

const CategorySchema = z.object({
  id: z.string(),
  title: z.string(),
});

const CreateCategorySchema = CategorySchema.omit({ id: true });
const DeleteCategorySchema = CategorySchema.omit({ title: true });

export async function createCategory(formData: FormData) {
  const validCategory = validateSchema(CreateCategorySchema, { title: formData.get("categoryTitle") });

  try {
    await prisma.category.create({
      data: {
        title: validCategory.title,
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
    console.error("Database Error", e);
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
  const validCategory = validateSchema(CategorySchema, {
    id: formData.get("categoryId"),
    title: formData.get("categoryTitle"),
  });

  try {
    await prisma.category.update({
      data: {
        title: validCategory.title,
      },
      where: {
        id: validCategory.id,
      },
    });
  } catch (e) {
    return prismaErrorHandler(e);
  }

  revalidatePath("/categories");
  redirect("/categories");
}

export async function deleteCategory(formData: FormData) {
  const validCategory = validateSchema(DeleteCategorySchema, {
    id: formData.get("categoryId"),
  });

  try {
    await prisma.category.delete({
      where: {
        id: validCategory.id,
      },
    });
  } catch (e) {
    return prismaErrorHandler(e);
  }

  revalidatePath("/categories");
  redirect("/categories");
}
