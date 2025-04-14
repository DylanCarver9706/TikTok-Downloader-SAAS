import { NextResponse } from "next/server";
import { uploadToS3AndGetUrl } from "@/lib/s3";
import { downloadWithRetry } from "@/lib/tiktok";

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


export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

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

    // Upload to S3 and get pre-signed URL
    const { url: downloadUrl } = await uploadToS3AndGetUrl(
      result.data.buffer,
      result.data.filename
    );

    return NextResponse.json({
      downloadUrl,
      filename: result.data.filename,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
