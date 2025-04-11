"use client";

import { useState, useEffect } from "react";
import { X, FileDown } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Card } from "./ui/card";
import { toast } from "sonner";
import { saveAs } from "file-saver";
import JSZip from "jszip";

export function TikTokBulkDownloader() {
  const [urls, setUrls] = useState("");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [totalVideos, setTotalVideos] = useState(0);
  const [failedDownloads, setFailedDownloads] = useState<string[]>([]);

  const handleUrlsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUrls(e.target.value);
  };

  const clearUrls = () => {
    setUrls("");
    setFailedDownloads([]);
  };

  // Update progress based on current video
  useEffect(() => {
    if (totalVideos > 0) {
      setProgress((currentVideo / totalVideos) * 100);
    }
  }, [currentVideo, totalVideos]);

  const downloadVideos = async () => {
    if (!urls.trim()) {
      toast.error("No URLs provided", {
        description: "Please enter at least one TikTok video URL",
      });
      return;
    }

    try {
      setProcessing(true);
      setProgress(0);
      setFailedDownloads([]);
      let currentFailedDownloads = [];
      const urlList = urls.split(",").map((url) => url.trim());
      setTotalVideos(urlList.length);
      setCurrentVideo(0);

      // Create a new ZIP file
      const zip = new JSZip();

      // Download each video and add it to the ZIP
      for (let i = 0; i < urlList.length; i++) {
        try {
          const response = await fetch("/api/download-tiktok", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: urlList[i] }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to download video");
          }

          const videoBlob = await response.blob();
          const filename =
            response.headers.get("X-Filename") ||
            `tiktok-video-${Date.now()}.mp4`;

          // Add the video to the ZIP
          zip.file(filename, videoBlob);

          // Update progress
          setCurrentVideo(i + 1);
        } catch (error) {
          console.error(`Error processing video from ${urlList[i]}:`, error);
          currentFailedDownloads.push(urlList[i]);
          setFailedDownloads((prev) => [...prev, urlList[i]]);
        }
      }

      // Check if any videos were successfully downloaded
      if (Object.keys(zip.files).length === 0) {
        toast.error("No videos downloaded", {
          description:
            "All videos failed to download. Please check your URLs and try again.",
          duration: 5000,
        });
        return;
      }

      // Generate the ZIP file
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, "tiktok-videos.zip");

      // Show success message with failed downloads if any
      if (currentFailedDownloads.length > 0) {
        toast.success("Download completed with some failures", {
          description: `Successfully downloaded ${Object.keys(zip.files).length} videos. Failed to download ${currentFailedDownloads.length} videos.`,
          duration: 5000,
        });
      } else {
        toast.success("Success!", {
          description: "All TikTok videos have been downloaded successfully",
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: `Failed to process videos: ${error}`,
      });
    } finally {
      setProcessing(false);
      setProgress(0);
      setCurrentVideo(0);
      setTotalVideos(0);
    }
  };

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <Card className="p-8 bg-white shadow-lg">
        <div className="space-y-8">
          {/* URLs Input Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-full space-y-4">
              <div className="relative">
                <textarea
                  placeholder="Paste TikTok video URLs here, separated by commas. Example: https://www.tiktok.com/@user1/video/1234567890, https://www.tiktok.com/@user2/video/9876543210"
                  value={urls}
                  onChange={handleUrlsChange}
                  disabled={processing}
                  className="w-full h-48 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-theme-500 transition-colors duration-200 resize-none"
                />
                {urls && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearUrls}
                    className="absolute right-2 top-2 text-gray-500 hover:text-theme-500"
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
              onClick={downloadVideos}
              disabled={processing || !urls.trim()}
              className="w-full bg-theme-600 hover:bg-theme-700 text-white h-12 text-lg"
            >
              <FileDown className="mr-2 h-5 w-5" />
              {processing ? "Downloading Videos..." : "Download Videos"}
            </Button>

            {processing && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-center text-sm text-gray-600">
                  {Math.round(progress)}% ({currentVideo} of {totalVideos}{" "}
                  videos)
                </p>
              </div>
            )}

            {/* Failed Downloads List */}
            {failedDownloads.length > 0 && (
              <div className="mt-4 p-4 bg-theme-50 rounded-lg">
                <h3 className="text-sm font-medium text-theme-800 mb-2">
                  Failed Downloads ({failedDownloads.length}):
                </h3>
                <ul className="text-sm text-theme-600 space-y-1">
                  {failedDownloads.map((url, index) => (
                    <li key={index} className="truncate">
                      {url}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
