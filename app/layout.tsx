import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/_components/Header";

export default function RootLayout({
  children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <html lang="ja">
      <body>
        <Header />
          {children}
      </body>
    </html>
  );
}
