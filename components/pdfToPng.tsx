"use client";

import { useState } from "react";
import { Upload, FileUp, X } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Card } from "./ui/card";
import { toast } from "sonner";
import * as pdfjsLib from "pdfjs-dist";

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface ConvertedPage {
  url: string;
  pageNumber: number;
}

export default function PdfToPng() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedPages, setConvertedPages] = useState<ConvertedPage[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      toast.error("Invalid file type", {
        description: "Please select a PDF file",
      });
      return;
    }

    setFile(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;

    if (droppedFile.type !== "application/pdf") {
      toast.error("Invalid file type", {
        description: "Please drop a PDF file",
      });
      return;
    }

    setFile(droppedFile);
  };

  const removeFile = () => {
    setFile(null);
    setConvertedPages([]);
  };

  const convertToPng = async () => {
    if (!file) {
      toast.error("No file selected", {
        description: "Please select a PDF file to convert",
      });
      return;
    }

    try {
      setProcessing(true);
      setProgress(0);
      setConvertedPages([]);

      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdfDoc.numPages;
      const pages: ConvertedPage[] = [];

      for (let i = 0; i < numPages; i++) {
        const page = await pdfDoc.getPage(i + 1);
        const viewport = page.getViewport({ scale: 2.0 });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const context = canvas.getContext("2d", {
          alpha: false,
          willReadFrequently: true,
        })!;

        context.fillStyle = "white";
        context.fillRect(0, 0, viewport.width, viewport.height);

        await page.render({
          canvasContext: context,
          viewport: viewport,
          background: "white",
        }).promise;

        const imgData = canvas.toDataURL("image/png");
        pages.push({
          url: imgData,
          pageNumber: i + 1,
        });

        setProgress(((i + 1) / numPages) * 100);
      }

      setConvertedPages(pages);
      toast.success("Success!", {
        description: "Your PDF has been converted to PNG images",
      });
    } catch (error) {
      console.error("Error converting PDF:", error);
      toast.error("Error", {
        description: `Failed to convert PDF: ${error}`,
      });
    } finally {
      setProcessing(false);
      setProgress(0);
    }
  };

  const downloadAll = () => {
    if (convertedPages.length === 0) return;

    convertedPages.forEach((page) => {
      const link = document.createElement("a");
      link.href = page.url;
      link.download = `${file?.name.replace(".pdf", "")}_page_${
        page.pageNumber
      }.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <Card className="p-8 bg-white shadow-lg">
        <div className="space-y-8">
          {/* Upload Section */}
          <div className="flex flex-col items-center justify-center">
            <div
              className={`
                w-full 
                border-2 
                border-dashed 
                rounded-lg 
                p-12
                min-h-[200px]
                flex
                flex-col
                items-center
                justify-center
                transition-all
                duration-200
                ease-in-out
                ${file ? "border-theme-500 bg-theme-50" : "border-gray-300"}
                ${isDragging ? "border-theme-400 bg-theme-50 scale-[1.02]" : ""}
                ${
                  !file &&
                  !isDragging &&
                  "hover:border-theme-300 hover:bg-theme-50"
                }
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                id="pdf-upload"
                disabled={processing}
                className="hidden"
              />
              <label
                htmlFor="pdf-upload"
                className={`
                  flex 
                  flex-col 
                  items-center 
                  justify-center 
                  cursor-pointer 
                  space-y-4
                  transition-transform
                  duration-200
                  ${isDragging ? "scale-110" : ""}
                `}
              >
                <Upload
                  className={`
                    w-16 
                    h-16 
                    transition-colors 
                    duration-200
                    ${file ? "text-theme-500" : "text-gray-400"}
                    ${isDragging ? "text-theme-500" : ""}
                  `}
                />
                <span
                  className={`
                    text-lg
                    text-center
                    transition-colors
                    duration-200
                    ${isDragging ? "text-theme-500" : "text-gray-600"}
                  `}
                >
                  {file
                    ? file.name
                    : isDragging
                    ? "Drop your PDF file here"
                    : "Click to upload or drag and drop a PDF file"}
                </span>
              </label>
            </div>
          </div>

          {/* File List */}
          {file && (
            <div className="flex items-center justify-between p-3 bg-theme-50 rounded-lg">
              <span className="text-gray-700 break-all">{file.name}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={removeFile}
                className="text-theme-500 hover:text-theme-700 flex-shrink-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Convert Button and Progress */}
          <div className="space-y-4">
            <Button
              onClick={convertToPng}
              disabled={processing || !file}
              className="w-full bg-theme-600 hover:bg-theme-700 text-white h-12 text-lg"
            >
              <FileUp className="mr-2 h-5 w-5" />
              {processing ? "Processing..." : "Convert to PNG"}
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

          {/* Preview Section */}
          {convertedPages.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Preview ({convertedPages.length} pages)
                </h3>
                <Button
                  onClick={downloadAll}
                  className="bg-theme-600 hover:bg-theme-700 text-white"
                >
                  Download All
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {convertedPages.map((page) => (
                  <div
                    key={page.pageNumber}
                    className="relative group aspect-[3/4] rounded-lg overflow-hidden border border-gray-200"
                  >
                    <img
                      src={page.url}
                      alt={`Page ${page.pageNumber}`}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                      <Button
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = page.url;
                          link.download = `${file?.name.replace(
                            ".pdf",
                            ""
                          )}_page_${page.pageNumber}.png`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white text-gray-900 hover:bg-gray-100"
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
