"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { prismaErrorHandler } from "@/lib/prismaErrorHandler";
import { validateSchema } from "@/lib/validation";

type GetCategoriesParams = {
  keyWord?: string;
};
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
    // handler内のthrowで終了する関数なので return 不要
    prismaErrorHandler(e);
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
    return res;
  } catch (e) {
    // handler内のthrowで終了する関数なので return 不要
    prismaErrorHandler(e);
  }
}

export async function getCategories(params: GetCategoriesParams) {
  try {
    const res = await prisma.category.findMany({
      where: {
        ...(params.keyWord && { title: { contains: params.keyWord } }),
      },
    });
    return res;
  } catch (e) {
    // handler内のthrowで終了する関数なので return 不要
    prismaErrorHandler(e);
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
    // handler内のthrowで終了する関数なので return 不要
    prismaErrorHandler(e);
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
    // handler内のthrowで終了する関数なので return 不要
    prismaErrorHandler(e);
  }

  revalidatePath("/categories");
  redirect("/categories");
}
