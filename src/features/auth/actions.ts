"use server";

import { User } from "@prisma/client";

import { auth0 } from "@/lib/auth0";

import { getUser } from "../users/actions";

export const getAuth0User = async (withProfile: boolean): Promise<User | null> => {
  try {
    const session = await auth0.getSession();
    if (!session || !session.user || !withProfile) {
      return null;
    }

    const userProfile = await getUser(session.user.sub);

    return userProfile;
  } catch (e) {
    console.error("Failed to get session:", e);
    return null;
  }
};
