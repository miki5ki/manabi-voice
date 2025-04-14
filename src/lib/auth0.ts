import { Auth0Client } from "@auth0/nextjs-auth0/server";

import { upsertAppUser } from "@/features/users/actions";

export const auth0 = new Auth0Client({
  async beforeSessionSaved(session) {
    const appUser = await upsertAppUser(session);
    if (!appUser) {
      throw new Error("ログイン処理に失敗しました。再度お試しください。");
    }
    return {
      ...session,
      user: {
        ...session.user,
        appUserId: appUser.id,
      },
    };
  },
});
