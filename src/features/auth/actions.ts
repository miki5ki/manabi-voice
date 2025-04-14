"use server";

import { redirect } from "next/navigation";

import { auth0 } from "@/lib/auth0";

export const getValidSession = async () => {
  const session = await auth0.getSession();
  if (!session) {
    redirect("/auth/login");
  }
  return session;
};
