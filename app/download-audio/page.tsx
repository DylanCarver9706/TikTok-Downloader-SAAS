import { TikTokAudioDownloader } from "@/components/tiktokAudioDownloader";
import { generatePageMetadata } from "@/components/seo/metadata";
import { SEOContent } from "@/components/seo/seo-content";
import { GenerateStructuredData } from "@/components/seo/structured-data";

export const metadata = generatePageMetadata({
  title: "Download TikTok Audio Without Watermark",
  description:
    "Extract and download audio from TikTok videos. Get high-quality MP3 files from your favorite TikTok content.",
  path: "/download-audio",
  additionalKeywords: [
    "tiktok audio downloader",
    "tiktok mp3 download",
    "extract tiktok audio",
    "tiktok sound download",
    "download tiktok music",
  ],
});

export default function TikTokAudioDownloaderPage() {
  return (
    <main className="min-h-[calc(100vh-70px)] bg-gradient-to-b from-white to-gray-50">
      <GenerateStructuredData id="howto-schema" type="howto" />

      <div className="max-w-5xl mx-auto py-12 p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            TikTok Audio Downloader
          </h1>
          <p className="text-xl text-gray-600">
            Extract and download audio from TikTok videos. Just paste the video
            URL and get the audio in seconds.
          </p>
        </div>

        <TikTokAudioDownloader />
      </div>
      <SEOContent
        additionalSteps={[
          {
            title: "Copy the TikTok Video URL",
            description:
              "Find the TikTok video containing the audio you want to download and copy the URL.",
          },
          {
            title: "Paste the URL",
            description: "Paste the URL into the downloader.",
          },
          {
            title: "Extract and Download",
            description:
              "Paste the URL and click download to get the audio in MP3 format.",
          },
        ]}
        additionalFaqs={[
          {
            question: "What audio format will I get?",
            answer:
              "The audio is downloaded in high-quality MP3 format, perfect for listening on any device.",
          },
          {
            question: "Is the audio quality good?",
            answer:
              "Yes, we extract the audio at the highest available quality from the original TikTok video.",
          },
        ]}
      />
    </main>
  );
}
