"use client";

import { Download, Music, Video, Smartphone, Globe, Zap } from "lucide-react";

export function Hero() {
  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-bold mt-[-25px] tracking-tight text-gray-900 sm:text-6xl mb-6">
          TikTok Video Downloader
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
          Download TikTok videos in HD quality without watermarks. Save your
          favorite TikTok content as MP4 or MP3 formats in just a few clicks.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-red-500">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <Video className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">No Watermark</h3>
            <p className="text-gray-600">
              Download TikTok videos without the watermark
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-red-500">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <Music className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">MP3 Download</h3>
            <p className="text-gray-600">
              Extract and download TikTok audio as MP3
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-red-500">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <Download className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">HD Quality</h3>
            <p className="text-gray-600">
              Download videos in original HD quality
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-red-500">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <Smartphone className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Mobile Friendly</h3>
            <p className="text-gray-600">
              Works perfectly on all devices and browsers
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-red-500">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <Globe className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">100% Free</h3>
            <p className="text-gray-600">
              No registration required, completely free to use
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-red-500">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <Zap className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Fast Download</h3>
            <p className="text-gray-600">
              Download your videos in less than 5 seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
