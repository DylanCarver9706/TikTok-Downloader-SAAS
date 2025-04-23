import { Metadata } from "next";

interface PageMetadataProps {
  title: string;
  description?: string;
  additionalKeywords?: string[];
  path?: string;
  type?: "website";
}

export function generatePageMetadata({
  title,
  description = "Download TikTok videos or their audio in HD quality without watermarks. Fast, free, and easy to use TikTok video downloader. No registration required.",
  additionalKeywords = [],
  path = "/",
  type = "website",
}: PageMetadataProps): Metadata {
  const baseKeywords = [
    "tiktok downloader",
    "download tiktok videos",
    "tiktok video download",
    "tiktok without watermark",
    "tiktok mp3 download",
    "download tiktok video",
    "tiktok video downloader",
    "tiktok downloader free",
    "tiktok video saver",
    "save tiktok video",
  ];

  const keywords = [...baseKeywords, ...additionalKeywords].join(", ");

  return {
    title: `${title} | TTok Downloader`,
    description,
    keywords,
    manifest: "/manifest.json",
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | TTok Downloader`,
      description,
      url: `https://ttokdownloader.com${path}`,
      siteName: "TTok Downloader",
      images: [
        {
          url: "/TTokDownloaderLogo.PNG",
          width: 1200,
          height: 630,
          alt: "TTok Downloader Logo",
        },
      ],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | TTok Downloader`,
      description,
      images: ["/TTokDownloaderLogo.PNG"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
