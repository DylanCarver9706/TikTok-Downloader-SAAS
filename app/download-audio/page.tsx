import { TikTokAudioDownloader } from "@/components/tiktokAudioDownloader";

export default function TikTokAudioDownloaderPage() {
  return (
    <main className="min-h-[calc(100vh-70px)] bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
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
    </main>
  );
}
