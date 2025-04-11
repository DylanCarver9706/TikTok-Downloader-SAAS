import { TikTokBulkDownloader } from "@/components/tiktokBulkDownloader";

export default function TikTokBulkDownloaderPage() {
  return (
    <main className="min-h-[calc(100vh-70px)] bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
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
    </main>
  );
}
