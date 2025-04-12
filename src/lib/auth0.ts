import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { SessionData } from "@auth0/nextjs-auth0/types";

import { upsertUser } from "@/features/users/actions";

export const auth0 = new Auth0Client({
  sessionStore: {
    async delete() {},
    async get() {
      return null;
    },
    async set(id, sessionData: SessionData) {
      await upsertUser(sessionData);
    },
  },
});
