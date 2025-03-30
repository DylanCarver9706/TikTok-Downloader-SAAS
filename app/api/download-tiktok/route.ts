import { NextResponse } from "next/server";

// Helper function to sanitize filenames
function sanitizeFilename(filename: string): string {
  // Replace any characters that are not alphanumeric, dots, or underscores with an underscore
  return filename.replace(/[^a-zA-Z0-9.-]/g, "_");
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate TikTok URL
    if (
      !url.includes("tiktok.com") ||
      !url.includes(".com/@") ||
      !url.includes("/video/")
    ) {
      return NextResponse.json(
        { error: "Invalid TikTok URL" },
        { status: 400 }
      );
    }

    // Fetch the page HTML
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch TikTok page");
    }

    const html = await response.text();

    // Extract the JSON data from the script tag
    const scriptMatch = html.match(
      /<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__" type="application\/json">(.*?)<\/script>/
    );
    if (!scriptMatch) {
      throw new Error("Could not find video data");
    }

    const jsonData = JSON.parse(scriptMatch[1]);
    const videoData =
      jsonData["__DEFAULT_SCOPE__"]["webapp.video-detail"].itemInfo.itemStruct
        .video;
    const bitrateInfo = videoData.bitrateInfo;

    // Find the normal quality video
    const normalQuality = bitrateInfo.find((item: any) =>
      item.GearName.startsWith("normal")
    );
    if (!normalQuality) {
      throw new Error("Could not find normal quality video");
    }

    // Find the play URL with is_play_url=1
    const playUrl = normalQuality.PlayAddr.UrlList.find((url: string) =>
      url.includes("is_play_url=1")
    );
    if (!playUrl) {
      throw new Error("Could not find play URL");
    }

    // Download the video
    const videoResponse = await fetch(playUrl);
    const videoBuffer = await videoResponse.arrayBuffer();

    // Create sanitized filename
    const originalFilename = `${url.split("/")[3].split("@")[1]}_${
      url.split("/")[5]
    }.mp4`;
    const sanitizedFilename = sanitizeFilename(originalFilename);

    // Return the video as a blob with the sanitized filename
    return new NextResponse(videoBuffer, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": `attachment; filename="${sanitizedFilename}"`,
        "X-Filename": sanitizedFilename, // Add custom header for the filename
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to download video" },
      { status: 500 }
    );
  }
}
