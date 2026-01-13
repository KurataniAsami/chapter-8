import type { Metadata } from "next";
import "./globals.css";
import TopMenu from "@/components/TopMenu";
import SideMenu from "@/components/SideMenu";


export default function RootLayout({
  children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <html lang="ja">
        <main className="flex flex-row">
        
        <SideMenu />
        <section className="pl-[300px] max-lg:pl-[146px] max-md:pl-0 w-full min-h-screen overflow-hidden">
          <TopMenu />
          {children}
        </section>
        </main>
    </html>
  );
}
