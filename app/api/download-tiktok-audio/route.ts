import { NextResponse } from "next/server";
import ffmpeg from "ffmpeg.js/ffmpeg-mp4.js";

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
      throw new Error("Failed to download video");
    }

    const videoBlob = await videoResponse.blob();
    const filename =
      videoResponse.headers.get("X-Filename") || "tiktok-video.mp4";
    const audioFilename = filename.replace(".mp4", ".mp3");

    // Convert blob to Uint8Array for ffmpeg
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

    // Create response with the audio file
    return new NextResponse(outputFile.data, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": `attachment; filename="${audioFilename}"`,
      },
    });
  } catch (error) {
    console.error("Error processing audio:", error);
    return NextResponse.json(
      { error: "Failed to process audio" },
      { status: 500 }
    );
  }
}
