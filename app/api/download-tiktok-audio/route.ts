import { NextResponse } from "next/server";
import ffmpeg from "ffmpeg.js/ffmpeg-mp4.js";
import { uploadToS3AndGetUrl } from "@/lib/s3";
import { downloadWithRetry } from "@/lib/tiktok";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    if (
      !url.includes("tiktok.com") ||
      (!url.includes(".com/@") && !url.includes(".com/t/")) ||
      (url.includes(".com/@") && !url.includes("/video/"))
    ) {
      return NextResponse.json(
        { error: "Invalid TikTok URL" },
        { status: 400 }
      );
    }

    // Download the video directly using the shared function
    const result = await downloadWithRetry(url);

    if (!result.success || !result.data) {
      console.error("Video download failed:", result.error);
      return NextResponse.json(
        {
          error: `Failed to download video: ${
            result.error?.message || "Unknown error"
          }`,
        },
        { status: 500 }
      );
    }

    // Convert video buffer to Uint8Array for ffmpeg
    const videoData = new Uint8Array(result.data.buffer);

    // Run ffmpeg to extract audio with suppressed output
    const ffmpegResult = ffmpeg({
      MEMFS: [{ name: "input.mp4", data: videoData }],
      arguments: [
        "-i",
        "input.mp4", // Input file
        "-vn", // Disable video
        "-acodec",
        "libmp3lame", // Use MP3 codec
        "-ab",
        "192k", // Audio bitrate
        "-ar",
        "44100", // Audio sample rate
        "output.mp3", // Output file
      ],
      print: () => {}, // Suppress stdout
      printErr: () => {}, // Suppress stderr
    });

    // Get the output file
    const outputFile = ffmpegResult.MEMFS[0];
    if (!outputFile) {
      throw new Error("Failed to extract audio");
    }

    // Generate a filename for the audio file
    const audioFilename = result.data.filename.replace(".mp4", ".mp3");

    // Upload to S3 and get pre-signed URL
    const { url: downloadUrl } = await uploadToS3AndGetUrl(
      outputFile.data.slice().buffer,
      audioFilename
    );

    return NextResponse.json({
      downloadUrl,
      filename: audioFilename,
    });
  } catch (error) {
    console.error("Error processing audio:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to process audio",
      },
      { status: 500 }
    );
  }
}
