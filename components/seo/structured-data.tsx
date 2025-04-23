import Script from "next/script";

interface GenerateStructuredDataProps {
  id: string;
  type: "howto" | "organization" | "webapp";
}

export function GenerateStructuredData({
  id,
  type,
}: GenerateStructuredDataProps) {
  const schemas = {
    howto: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Download TikTok Videos",
      description:
        "Step-by-step guide to download TikTok videos without watermark",
      step: [
        {
          "@type": "HowToStep",
          name: "Copy the TikTok video URL",
          text: "Find the TikTok video you want to download and copy its URL from the share button",
        },
        {
          "@type": "HowToStep",
          name: "Paste the URL",
          text: "Paste the TikTok video URL into our downloader",
        },
        {
          "@type": "HowToStep",
          name: "Download",
          text: "Click the download button and save your video",
        },
      ],
    },
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "TTok Downloader",
      url: "https://ttokdownloader.com",
      logo: "https://ttokdownloader.com/TTokDownloaderLogo.PNG",
      description:
        "Download TikTok videos in HD quality without watermarks. Fast, free, and easy to use TikTok downloader.",
      sameAs: [
        "https://twitter.com/ttokdownloader",
        "https://facebook.com/ttokdownloader",
      ],
    },
    webapp: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "TTok Downloader",
      url: "https://ttokdownloader.com",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Download TikTok videos without watermark",
        "Download TikTok audio as MP3",
        "Bulk download multiple videos",
        "HD quality downloads",
        "Fast and free service",
      ],
    },
  };

  return (
    <Script id={id} type="application/ld+json" strategy="beforeInteractive">
      {JSON.stringify(schemas[type])}
    </Script>
  );
}
