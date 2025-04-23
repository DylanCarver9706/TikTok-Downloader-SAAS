import { TikTokDownloader } from "@/components/tiktokDownloader";
import { generatePageMetadata } from "@/components/seo/metadata";
import { SEOContent } from "@/components/seo/seo-content";
import { GenerateStructuredData } from "@/components/seo/structured-data";

export const metadata = generatePageMetadata({
  title: "Download TikTok Videos Without Watermark",
  path: "/download-video",
});

export default function TikTokDownloaderPage() {
  return (
    <main className="min-h-[calc(100vh-70px)] bg-gradient-to-b from-white to-gray-50">
      <GenerateStructuredData id="howto-schema" type="howto" />

      <div className="max-w-5xl mx-auto py-12">
        <div className="text-center mb-8 p-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            TikTok Video Downloader
          </h1>
          <p className="text-xl text-gray-600">
            Download TikTok videos easily and quickly. Just paste the video URL
            and get your video in seconds.
          </p>
        </div>

        <TikTokDownloader />
        <SEOContent />
      </div>
    </main>
  );
}
