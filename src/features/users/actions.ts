"use server";

import { Session } from "@auth0/nextjs-auth0";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { User } from "@prisma/client";
import { cache } from "react";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { prismaErrorHandler } from "@/lib/prismaErrorHandler";
import { validateSchema } from "@/lib/validation";

import { DeactivateUserInfo } from "./types";

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  auth0Id: z.string(),
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
  loginUserId: z.string(),
  loginUserRole: z.string(),
  userProfileId: z.string(),
});

export async function upsertUser(session: Session) {
  const user: UserProfile = session.user;

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
      return prismaErrorHandler(e);
    }
  } catch (e) {
    console.error("Database Error", e);
  }
}

export const updateUser = async (formData: FormData) => {
  const validUser = validateSchema(UpdateUserSchema, {
    id: formData.get("userId"),
    name: formData.get("userName"),
    email: formData.get("userEmail"),
  });

  try {
    await prisma.user.update({
      data: {
        name: validUser.name,
        email: validUser.email,
      },
      where: {
        id: validUser.id,
      },
    });
  } catch (e) {
    return prismaErrorHandler(e);
  }
};

export const getUser = cache(async (auth0Id: string): Promise<User | null> => {
  try {
    const userProfile = await prisma.user.findUnique({
      where: { auth0Id },
    });

    return userProfile;
  } catch (e) {
    console.error("DatabaseError", e);
    return null;
  }
});

export const getUsers = async (role: string) => {
  if (role == "user") {
    return;
  }
  try {
    const allUsers = await prisma.user.findMany();

    return allUsers;
  } catch (e) {
    console.error("DatabaseError", e);
    return [];
  }
};

export const deactivateUser = async (deactivateInfo: DeactivateUserInfo) => {
  const validUser = validateSchema(DeactivateUserSchema, {
    loginUserId: deactivateInfo.loginUserId,
    loginUserRole: deactivateInfo.loginUserRole,
    userProfileId: deactivateInfo.userProfileId,
  });

  try {
    if (validUser.loginUserId == validUser.userProfileId || validUser.loginUserRole == "admin") {
      await prisma.user.update({
        data: {
          is_active: false,
        },
        where: {
          id: validUser.userProfileId,
        },
      });
    }
  } catch (e) {
    return prismaErrorHandler(e);
  }
};
