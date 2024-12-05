import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";

const afterCallback = async (req, res, session) => {
  console.log("Session in afterCallback:", session); // セッション情報の確認

  if (session && session.user) {
    console.log("User information in session:", session.user); // ユーザー情報の確認
  } else {
    console.log("No user information in session");
  }

  return session;
};

export const GET = handleAuth({
  callback: handleCallback({
    afterCallback,
    authorizationParams: {
      scope: "openid profile email", // 必要なスコープを指定
    },
  }),
});
