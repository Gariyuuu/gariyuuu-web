import type { Metadata } from "next";
import { Share_Tech_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { MatrixRain } from "@/components/matrix-rain";
import { BootIntro } from "@/components/boot-intro";
import "./globals.css";

const hackerFont = Share_Tech_Mono({
  variable: "--font-hacker",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gary Wang — gariyuuu.com",
  description:
    "Personal site and self-hosted AI platform (Yuu no Sekai / Qwen3-8B) powering Gary Wang's apps.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hackerFont.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <MatrixRain />
        <BootIntro />
        <Nav />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
