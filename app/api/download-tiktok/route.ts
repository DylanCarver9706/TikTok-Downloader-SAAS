import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "500mb",
    },
    responseLimit: false,
  },
};

// Helper function to sanitize filenames
function sanitizeFilename(filename: string): string {
  // Replace any characters that are not alphanumeric, dots, or underscores with an underscore
  return filename.replace(/[^a-zA-Z0-9.-]/g, "_");
}

interface DownloadResult {
  success: boolean;
  error?: Error;
  data?: {
    buffer: ArrayBuffer;
    filename: string;
  };
}

async function downloadWithRetry(
  url: string,
  maxRetries = 3
): Promise<DownloadResult> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const html = await response.text();
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

      const normalQuality = bitrateInfo.find((item: any) =>
        item.GearName.startsWith("normal")
      );
      if (!normalQuality) {
        throw new Error("Could not find normal quality video");
      }

      const playUrl = normalQuality.PlayAddr.UrlList.find((url: string) =>
        url.includes("is_play_url=1")
      );
      if (!playUrl) {
        throw new Error("Could not find play URL");
      }

      const videoResponse = await fetch(playUrl);
      const videoBuffer = await videoResponse.arrayBuffer();

      const originalFilename = `${url.split("/")[3].split("@")[1]}_${
        url.split("/")[5]
      }.mp4`;
      const sanitizedFilename = sanitizeFilename(originalFilename);

      return {
        success: true,
        data: {
          buffer: videoBuffer,
          filename: sanitizedFilename,
        },
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < maxRetries) {
        // Wait before retrying (exponential backoff)
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
      }
    }
  }

  return {
    success: false,
    error: lastError,
  };
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

    const result = await downloadWithRetry(url);

    if (!result.success || !result.data) {
      return NextResponse.json(
        {
          error: `Failed to download video after multiple attempts: ${
            result.error?.message || "Unknown error"
          }`,
        },
        { status: 500 }
      );
    }

    return new NextResponse(result.data.buffer, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": `attachment; filename="${result.data.filename}"`,
        "X-Filename": result.data.filename,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to download video" },
      { status: 500 }
    );
  }
}
