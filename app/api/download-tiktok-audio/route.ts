import { NextResponse } from "next/server";
import ffmpeg from "ffmpeg.js/ffmpeg-mp4.js";
import { uploadToS3AndGetUrl } from "@/lib/s3";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Get the video from our download-tiktok endpoint
    const baseUrl = new URL(request.url).origin;
    const videoResponse = await fetch(`${baseUrl}/api/download-tiktok`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!videoResponse.ok) {
      const errorData = await videoResponse.json();
      throw new Error(errorData.error || "Failed to download video");
    }

    const { downloadUrl: videoDownloadUrl, filename: videoFilename } =
      await videoResponse.json();

    // Download the video from S3
    const videoBlobResponse = await fetch(videoDownloadUrl);
    if (!videoBlobResponse.ok) {
      throw new Error("Failed to download video from S3");
    }

    const videoBlob = await videoBlobResponse.blob();
    const videoBuffer = await videoBlob.arrayBuffer();
    const videoData = new Uint8Array(videoBuffer);

    // Run ffmpeg to extract audio with suppressed output
    const result = ffmpeg({
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
    const outputFile = result.MEMFS[0];
    if (!outputFile) {
      throw new Error("Failed to extract audio");
    }

    // Generate a filename for the audio file
    const audioFilename = videoFilename.replace(".mp4", ".mp3");

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
