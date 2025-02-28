import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import React from "react";

import { Header } from "./components/Header";
import { Providers } from "./providers";
export const metadata = {
  title: "学びボイス",
  description: "普段何気ない学びを仲間とクローズドに共有するための音声サービスです",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect("/api/auth/login");
  }

  const { user } = session;

  return (
    <html lang="ja">
      <body>
        <Providers>
          <Header user={user} />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
