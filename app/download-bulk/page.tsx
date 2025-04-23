import { TikTokBulkDownloader } from "@/components/tiktokBulkDownloader";
import { generatePageMetadata } from "@/components/seo/metadata";
import { SEOContent } from "@/components/seo/seo-content";
import { GenerateStructuredData } from "@/components/seo/structured-data";

export const metadata = generatePageMetadata({
  title: "Download Multiple TikTok Videos Without Watermark",
  description:
    "Download multiple TikTok videos at once without watermark. Bulk download your favorite TikTok content in HD quality.",
  path: "/download-bulk",
  additionalKeywords: [
    "bulk tiktok downloader",
    "multiple tiktok videos download",
    "tiktok playlist download",
    "download multiple tiktok videos",
    "tiktok bulk download without watermark",
  ],
});

export default function TikTokBulkDownloaderPage() {
  return (
    <main className="min-h-[calc(100vh-70px)] bg-gradient-to-b from-white to-gray-50">
      <GenerateStructuredData id="howto-schema" type="howto" />

      <div className="max-w-5xl mx-auto py-12">
        <div className="text-center mb-8 p-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            TikTok Bulk Video Downloader
          </h1>
          <p className="text-xl text-gray-600">
            Download multiple TikTok videos at once. Paste the video URLs{" "}
            <strong>separated by commas</strong> and get all your videos in a
            single ZIP file.
          </p>
        </div>

        <TikTokBulkDownloader />
      </div>
      <SEOContent
        additionalSteps={[
          {
            title: "Copy Your URLs",
            description:
              "Copy the URLs of all TikTok videos you want to download. You can get these from the share button on each video.",
          },
          {
            title: "Paste Multiple URLs",
            description:
              "Paste all the URLs into the downloader, separating them with commas.",
          },
          {
            title: "Download All Videos",
            description:
              "Click the download button to get all your videos in a single ZIP file.",
          },
        ]}
        additionalFaqs={[
          {
            question: "How many videos can I download at once?",
            answer:
              "You can download multiple videos at once by pasting their URLs separated by commas. There is no strict limit, but we recommend downloading in batches of 10-20 videos for optimal performance.",
          },
          {
            question: "What format will my downloaded videos be in?",
            answer:
              "All videos will be downloaded in MP4 format without watermarks, maintaining their original quality.",
          },
          {
            question: "How do I get the video URLs?",
            answer:
              "You can get the video URL by clicking the share button on any TikTok video and selecting 'Copy link'.",
          },
        ]}
      />
    </main>
  );
}
