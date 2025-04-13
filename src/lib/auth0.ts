import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { NextResponse } from "next/server";

import { upsertUser } from "@/features/users/actions";

export const auth0 = new Auth0Client({
  async onCallback(error, context, session) {
    // redirect the user to a custom error page
    if (error || !session?.user) {
      return NextResponse.redirect(
        new URL(`/error?error=${error?.message || "unknown error"}`, process.env.APP_BASE_URL),
      );
    }

    // 他のカスタマイズログインロジック
    await upsertUser(session);

    // complete the redirect to the provided returnTo URL
    return NextResponse.redirect(new URL(context.returnTo || "/", process.env.APP_BASE_URL));
  },
});
