"use client";

import { useState } from "react";
import { saveAs } from "file-saver";
import { Download, X } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Card } from "./ui/card";
import { toast } from "sonner";

export function TikTokDownloader() {
  const [videoUrl, setVideoUrl] = useState("");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
  };

  const clearUrl = () => {
    setVideoUrl("");
  };

  const downloadVideo = async () => {
    if (!videoUrl) {
      toast.error("No URL provided", {
        description: "Please enter a TikTok video URL",
      });
      return;
    }

    try {
      setProcessing(true);
      setProgress(0);

      // Call your API endpoint to get the pre-signed URL
      const response = await fetch("/api/download-tiktok", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: videoUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to download video");
      }

      const { downloadUrl, filename } = await response.json();

      // Download the video from S3
      const videoResponse = await fetch(downloadUrl);
      if (!videoResponse.ok) {
        throw new Error("Failed to download video from S3");
      }

      const blob = await videoResponse.blob();

      // Use the filename from the API response
      saveAs(blob, filename);

      toast.success("Success!", {
        description: "Your TikTok video has been downloaded successfully",
      });
    } catch (error) {
      console.error("Error downloading video:", error);
      toast.error("Error", {
        description: `Failed to download video: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    } finally {
      setProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <Card className="p-8 bg-white shadow-lg">
        <div className="space-y-8">
          {/* URL Input Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-full space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="https://www.tiktok.com/@username/video/1234567890"
                  value={videoUrl}
                  onChange={handleUrlChange}
                  disabled={processing}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-theme-500 transition-colors duration-200"
                />
                {videoUrl && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearUrl}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-theme-500"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Download Button and Progress */}
          <div className="space-y-4">
            <Button
              onClick={downloadVideo}
              disabled={processing || !videoUrl}
              className="w-full bg-theme-600 hover:bg-theme-700 text-white h-12 text-lg"
            >
              <Download className="mr-2 h-5 w-5" />
              {processing ? "Downloading..." : "Download Video"}
            </Button>

            {processing && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-center text-sm text-gray-600">
                  {Math.round(progress)}%
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
