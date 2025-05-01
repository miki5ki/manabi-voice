"use server";

import { SessionData } from "@auth0/nextjs-auth0/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cache } from "react";
import { z } from "zod";

import { assertHasPermission, assertIsOwner } from "@/lib/permission";
import { prisma } from "@/lib/prisma";
import { prismaErrorHandler } from "@/lib/prismaErrorHandler";
import { validateSchema } from "@/lib/validation";

import { getValidSession } from "../auth/actions";

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  auth0Id: z.string(),
  description: z.string(),
  email: z.string(),
  is_active: z.boolean(),
  role: z.string(),
});

const UpdateUserSchema = UserSchema.omit({
  auth0Id: true,
  is_active: true,
  role: true,
});

const DeactivateUserSchema = z.object({
  appUserId: z.string(),
});

export async function upsertAppUser(sessionData: SessionData) {
  const user = sessionData.user;

  try {
    if (!user.email || !user.sub || !user.name) {
      console.error("Missing required user information: email, sub, or name.");
      return;
    }
    try {
      const res = await prisma.user.upsert({
        create: {
          name: user.name,
          auth0Id: user.sub,
          email: user.email,
          is_active: true,
          role: "user",
        },
        update: {
          is_active: true,
        },
        where: {
          email: user.email,
        },
      });
      if (!res?.id) {
        console.error("User create/upsert failed.");
        return;
      }
      return res;
    } catch (e) {
      // handler内のthrowで終了する関数なので return 不要
      prismaErrorHandler(e);
    }
  } catch (e) {
    console.error("Database Error", e);
  }
}

export const updateAppUser = async (formData: FormData) => {
  const validUser = validateSchema(UpdateUserSchema, {
    id: formData.get("appUserId"),
    name: formData.get("appUserName"),
    description: formData.get("appUserDescription"),
    email: formData.get("appUserEmail"),
  });

  try {
    await prisma.user.update({
      data: {
        name: validUser.name,
        description: validUser.description,
        email: validUser.email,
      },
      where: {
        id: validUser.id,
      },
    });
  } catch (e) {
    // handler内のthrowで終了する関数なので return 不要
    prismaErrorHandler(e);
  }
  revalidatePath(`/users/${validUser.id}`);
  redirect(`/users/${validUser.id}`);
};

export const getAppUser = cache(async (id: string) => {
  try {
    const appUser = await prisma.user.findUnique({
      where: { id },
    });

    return appUser;
  } catch (e) {
    // handler内のthrowで終了する関数なので return 不要
    prismaErrorHandler(e);
  }
});

export const getAppUsers = async (role: string) => {
  if (role == "user") {
    return;
  }
  try {
    const allUsers = await prisma.user.findMany();

    return allUsers;
  } catch (e) {
    // handler内のthrowで終了する関数なので return 不要
    prismaErrorHandler(e);
  }
};

export const deactivateAppUser = async (createdAppUserId: string) => {
  const validUser = validateSchema(DeactivateUserSchema, {
    appUserId: createdAppUserId,
  });

  const session = await getValidSession();
  assertHasPermission(session.user.appUserRole, "user:deactivate");
  assertIsOwner(session.user.appUserId, createdAppUserId);

  try {
    await prisma.user.update({
      data: {
        is_active: false,
      },
      where: {
        id: validUser.appUserId,
      },
    });
  } catch (e) {
    // handler内のthrowで終了する関数なので return 不要
    prismaErrorHandler(e);
  }
};
