import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "AI峰哥部落格 - AI 實戰教學與職場應用",
    template: "%s | AI峰哥",
  },
  description:
    "探索 AI 應用的最新趨勢與實戰技巧，由台灣企業 AI 培訓專家阿峰老師分享 ChatGPT、Gemini 等工具的職場應用。",
  keywords: ["AI教學", "ChatGPT", "Gemini", "企業AI", "職場AI", "AI峰哥"],
  authors: [{ name: "阿峰老師", url: "https://aifengge.com" }],
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "AI峰哥部落格",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
