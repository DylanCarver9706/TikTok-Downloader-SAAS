import type { Metadata } from "next";
import { Suspense } from "react";
import { PostHogProvider } from "./providers/posthog";
import { Navbar } from "@/components/navbar";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import "./globals.css";

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
  other: {
    "google-adsense-account": process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID,
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
