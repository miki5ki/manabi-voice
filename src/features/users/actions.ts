"use server";

import { Session } from "@auth0/nextjs-auth0";
import { UserProfile } from "@auth0/nextjs-auth0/client";

import { prisma } from "@/lib/prisma";

export async function upsertUser(session: Session) {
  const user: UserProfile = session.user;

  try {
    if (!user.email || !user.sub || !user.name) {
      console.error("DatabaseError");
      return;
    }

    await prisma.user.upsert({
      create: {
        name: user.name,
        auth0Id: user.sub,
        email: session.user.email,
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
  } catch (e) {
    console.error("DatabaseError", e);
  }
}
