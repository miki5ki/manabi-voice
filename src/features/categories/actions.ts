"use server";

import { Category } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

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
    console.error("Validation Error:", validatedFields.error);
    throw new Error("Validation failed");
  }

  try {
    await prisma.category.create({
      data: {
        title: validatedFields.data.title,
      },
    });
  } catch (e) {
    console.log("Database Error:", e);
  }

  revalidatePath("/categories");
  redirect("/categories");
}

export async function getCategory(categoryId: string): Promise<Category> {
  try {
    const res = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    return res ?? { id: "", title: "" };
  } catch (e) {
    console.log("DataBaseError", e);
    throw new Error(`カテゴリが見つかりませんでした。存在しないIDか、データベースに問題がある可能性があります。`);
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

export async function updateCategory(formData: FormData) {
  const validatedFields = CategorySchema.safeParse({
    id: formData.get("categoryId"),
    title: formData.get("categoryTitle"),
  });
  console.log(formData.get("categoryId"));
  console.log(validatedFields);

  if (!validatedFields.success) {
    throw new Error("Validation failed");
  }

  try {
    await prisma.category.update({
      data: {
        id: validatedFields.data.id,
        title: validatedFields.data.title,
      },
      where: {
        id: validatedFields.data.id,
      },
    });
  } catch (e) {
    console.error("DataBaseError", e);
  }
  revalidatePath("/categories");
  redirect("/categories");
}

export async function deleteCategory(formData: FormData) {
  const validatedFields = DeleteCategorySchema.safeParse({
    id: formData.get("categoryId"),
  });

  if (!validatedFields.success) {
    console.error("Validation Error:", validatedFields.error);
    throw new Error("Validation failed");
  }

  try {
    await prisma.category.delete({
      where: {
        id: validatedFields.data.id,
      },
    });
  } catch (e) {
    console.error("DataBaseError", e);
  }
  revalidatePath("/categories");
  redirect("/categories");
}
