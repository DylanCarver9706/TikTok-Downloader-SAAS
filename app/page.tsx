import { Hero } from "@/components/hero";
import { generatePageMetadata } from "@/components/seo/metadata";
import { SEOContent } from "@/components/seo/seo-content";
import { GenerateStructuredData } from "@/components/seo/structured-data";

export const metadata = generatePageMetadata({
  title:
    "TTokDownloader - Download Videos Without Watermark | TikTok Video Downloader",
  path: "/",
});

export default function Home() {
  return (
    <main>
      <GenerateStructuredData id="organization-schema" type="organization" />
      <GenerateStructuredData id="webapp-schema" type="webapp" />

      <Hero />
      <SEOContent includeFeatures={true} />
    </main>
  );
}
