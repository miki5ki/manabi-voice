import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata = {
  title: "学びボイス",
  description: "普段何気ない学びを仲間とクローズドに共有するための音声サービスです",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <UserProvider>
        <body>{children}</body>
      </UserProvider>
    </html>
  );
}
