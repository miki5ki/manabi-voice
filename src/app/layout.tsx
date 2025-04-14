import { Header } from "./components/Header";
import { Providers } from "./providers";
export const metadata = {
  title: "学びボイス",
  description: "普段何気ない学びを仲間とクローズドに共有するための音声サービスです",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
