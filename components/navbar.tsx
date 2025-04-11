"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handler to close mobile menu when an item is clicked
  const handleMobileItemClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 relative">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop navbar */}
        <div className="flex h-16">
          <div className="w-48 flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-3xl font-bold text-theme-600">TTok</span>
              <span className="text-3xl font-bold text-gray-900">Downloader</span>
            </Link>
          </div>

          {/* Desktop navigation links */}
          <div className="flex-1 flex justify-center items-center">
            <div className="hidden md:flex space-x-1">
              <Link href="/download-video">
                <Button variant="ghost" className="text-gray-700 text-md">
                  DOWNLOAD VIDEO
                </Button>
              </Link>
              <Link href="/download-bulk">
                <Button variant="ghost" className="text-gray-700 text-md">
                  BULK DOWNLOAD VIDEO
                </Button>
              </Link>
              <Link href="/download-audio">
                <Button variant="ghost" className="text-gray-700 text-md">
                  DOWNLOAD AUDIO
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-gray-700 text-md flex items-center"
                  >
                    LEGAL<ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="w-40 p-2 bg-white border border-gray-200 space-y-1"
                >
                  <DropdownMenuItem
                    asChild
                    className="px-4 py-3 cursor-pointer text-gray-700 hover:bg-gray-100 focus:bg-gray-100 rounded-md transition-colors flex items-center justify-center no-underline"
                  >
                    <Link href="/terms-of-use">Terms of Use</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="px-4 py-3 cursor-pointer text-gray-700 hover:bg-gray-100 focus:bg-gray-100 rounded-md transition-colors flex items-center justify-center no-underline"
                  >
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="px-4 py-3 cursor-pointer text-gray-700 hover:bg-gray-100 focus:bg-gray-100 rounded-md transition-colors flex items-center justify-center no-underline"
                  >
                    <Link href="/contact-us">Contact Us</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Right section - authentication buttons */}
          <div className="w-48 flex items-center justify-end">
            {/* Mobile menu button */}
            <button
              className="md:hidden mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu - Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed top-16 right-0 z-50 bg-white shadow-lg">
            <div className="flex flex-col space-y-2 p-4">
              <Link href="/download-video" onClick={handleMobileItemClick}>
                <Button
                  variant="ghost"
                  className="w-full justify-center text-center text-gray-700"
                >
                  DOWNLOAD VIDEO
                </Button>
              </Link>
              <Link href="/download-bulk" onClick={handleMobileItemClick}>
                <Button
                  variant="ghost"
                  className="w-full justify-center text-center text-gray-700"
                >
                  BULK DOWNLOAD VIDEO
                </Button>
              </Link>
              <Link href="/download-audio" onClick={handleMobileItemClick}>
                <Button
                  variant="ghost"
                  className="w-full justify-center text-center text-gray-700"
                >
                  DOWNLOAD AUDIO
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-center text-center text-gray-700 flex items-center"
                  >
                    LEGAL <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="w-40 p-2 bg-white border border-gray-200 space-y-1"
                >
                  <DropdownMenuItem
                    asChild
                    className="px-4 py-3 cursor-pointer text-gray-700 hover:bg-gray-100 focus:bg-gray-100 rounded-md transition-colors flex items-center justify-center no-underline"
                  >
                    <Link href="/terms-of-use" onClick={handleMobileItemClick}>
                      Terms of Use
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="px-4 py-3 cursor-pointer text-gray-700 hover:bg-gray-100 focus:bg-gray-100 rounded-md transition-colors flex items-center justify-center no-underline"
                  >
                    <Link href="/privacy-policy" onClick={handleMobileItemClick}>
                      Privacy Policy
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="px-4 py-3 cursor-pointer text-gray-700 hover:bg-gray-100 focus:bg-gray-100 rounded-md transition-colors flex items-center justify-center no-underline"
                  >
                    <Link href="/contact-us" onClick={handleMobileItemClick}>
                      Contact Us
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
