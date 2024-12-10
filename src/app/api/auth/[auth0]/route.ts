import { AfterCallbackAppRoute, handleAuth, handleCallback, Session } from "@auth0/nextjs-auth0";
import { NextRequest } from "next/server";

import { upsertUser } from "@/features/users/actions";
const afterCallback: AfterCallbackAppRoute = async (req: NextRequest, session: Session) => {
  await upsertUser(session);

  return session;
};

export const GET = handleAuth({
  callback: handleCallback({
    afterCallback,
    authorizationParams: {
      scope: "openid profile email",
    },
  }),
});
