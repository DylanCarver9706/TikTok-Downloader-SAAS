import type { Metadata } from "next";
import { PostHogProvider } from "./providers/posthog";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import Script from "next/script";

import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TTok Downloader",
  description: "TTok Downloader",
  // Only works for development. For production, use the favicon.ico file.
  icons: {
    icon: "/TTokDownloaderLogo.PNG",
    shortcut: "/TTokDownloaderLogo.PNG",
    apple: "/TTokDownloaderLogo.PNG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <html lang="en" suppressHydrationWarning>
        <head>
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        </head>
        <body className={inter.className} suppressHydrationWarning>
          <PostHogProvider>
            <Navbar />
            {children}
            <Toaster position="top-right" />
          </PostHogProvider>
        </body>
      </html>
    </Suspense>
  );
}
