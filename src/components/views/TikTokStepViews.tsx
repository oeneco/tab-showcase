"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, MessageCircle, Bookmark, Share, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { Space_Mono } from "next/font/google";

// Configure the Space Mono font
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

// Shared TikTok content for all steps
const screens = [
  {
    id: 1,
    title: "Make the thing you want to make, faster",
    subtitle: "Cursor",
    description: "The AI-powered IDE that helps you build software faster",
  },
  {
    id: 2,
    title: "Type Your Idea, See It in Action",
    subtitle: "01",
    description:
      "Write a quick description of your vision and watch Cursor transform it into a functional demo in moments. No need to wrestle with coding syntax or complex frameworks—our AI handles the heavy lifting.",
  },
  {
    id: 3,
    title: "Refine Your Project with an AI Engineer",
    subtitle: "02",
    description:
      "Need to tweak layouts, add features, or optimize performance? Cursor's AI works alongside you like a seasoned developer, helping refine your software every step of the way.",
  },
  {
    id: 4,
    title: "Move Fast Without Compromising Quality",
    subtitle: "03",
    description:
      "When you can build so quickly, you're free to explore new ideas for the fun of it. Test out different approaches, pivot on a whim, and keep every project polished.",
  },
  {
    id: 5,
    title: "Scale to Pro Anytime",
    subtitle: "04",
    description:
      "Cursor isn't just for quick demos—it's engineered for serious growth. When you're ready to level up, dive deeper into advanced features and pro-level tools.",
  },
];

// STEP 1: Raw Text Content (Conceptual Stage)
export function TikTokStep1() {
  return (
    <div
      className={`h-screen w-full bg-white p-8 overflow-auto ${spaceMono.className}`}
    >
      <h1 className="text-3xl font-bold mb-8">TikTok Interface</h1>

      <div className="space-y-6 max-w-2xl">
        <div className="border-l-4 border-gray-300 pl-4">
          <h2 className="font-bold">Content</h2>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Video feed that can be scrolled vertically</li>
            <li>Author: Cursor</li>
            <li>Description: This is done in a work trial</li>
            <li>Location: San Francisco</li>
          </ul>
        </div>

        <div className="border-l-4 border-gray-300 pl-4">
          <h2 className="font-bold">Interaction Elements</h2>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Likes counter (10)</li>
            <li>Comments counter (10)</li>
            <li>Bookmarks counter (10)</li>
            <li>Share button</li>
            <li>Video playback controls</li>
          </ul>
        </div>

        <div className="border-l-4 border-gray-300 pl-4">
          <h2 className="font-bold">UI Elements</h2>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Bottom navigation bar</li>
            <li>Video takes up full screen</li>
            <li>Interaction buttons positioned on right side</li>
            <li>User information positioned on bottom left</li>
          </ul>
        </div>

        <div className="mt-8 px-4 py-3 bg-gray-100 rounded-lg">
          <p className="text-gray-700">
            TikTok-like interface showing Cursor content, with video playback
            and standard social media interaction elements.
          </p>
        </div>
      </div>
    </div>
  );
}

// STEP 2: Basic Wireframe Structure
export function TikTokStep2() {
  return (
    <div className="h-screen w-full bg-[#F9F9F9] flex flex-col justify-center items-center p-4">
      <div className="relative aspect-[9/16] w-full max-w-sm bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-md">
        {/* Wireframe areas */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-4">
          <div className="w-16 h-4 bg-gray-300 rounded"></div>
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
        </div>

        {/* Content Placeholder */}
        <div className="absolute inset-0 mt-12 mb-16 bg-gray-50 flex flex-col items-center justify-end">
          <div className="absolute bottom-24 left-4 space-y-2">
            <div className="w-24 h-4 bg-gray-300 rounded"></div>
            <div className="w-48 h-3 bg-gray-200 rounded"></div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-1"></div>
              <div className="w-16 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>

          <div className="absolute bottom-24 right-4 flex flex-col items-center space-y-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <div className="w-4 h-2 bg-gray-200 rounded mt-1"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <div className="w-4 h-2 bg-gray-200 rounded mt-1"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <div className="w-4 h-2 bg-gray-200 rounded mt-1"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <div className="w-4 h-2 bg-gray-200 rounded mt-1"></div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-100 border-t border-gray-200 flex items-center justify-around px-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-10 h-10 bg-gray-300 rounded-full border-2 border-gray-400"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-gray-200 bg-opacity-50 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 ml-1 border-t-8 border-b-8 border-l-12 border-transparent border-l-gray-500"></div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>Basic wireframe of TikTok-style interface</p>
        <p className="mt-1">Showing placeholder elements for UI components</p>
      </div>
    </div>
  );
}

// STEP 3: Interactive Prototype
export function TikTokStep3() {
  return (
    <div className="h-screen w-full bg-[#F9F9F9] flex flex-col justify-center items-center p-4">
      <div className="relative aspect-[9/16] w-full max-w-sm bg-gradient-to-b from-blue-50 to-gray-100 rounded-xl overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-gray-900">
          {/* Main content */}
          <div className="absolute bottom-24 left-4 max-w-[70%]">
            <div className="font-bold text-white text-sm">Cursor</div>
            <div className="text-xs text-white/90 truncate">
              This is done in a work trial
            </div>
            <div className="text-xs text-white/80 mt-1 flex items-center">
              <MapPin size={12} className="mr-1" />
              <span>San Francisco</span>
            </div>
          </div>

          {/* TikTok UI Elements */}
          <div className="absolute right-3 bottom-24 flex flex-col items-center gap-3">
            <div className="mb-1">
              <div className="h-7 w-7 flex items-center justify-center rounded-full overflow-hidden bg-white">
                <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <button className="p-1 hover:scale-110 transition-transform">
                <Heart className="w-5 h-5 fill-white" />
              </button>
              <span className="text-xs mt-0.5 text-white">10</span>
            </div>
            <div className="flex flex-col items-center">
              <button className="p-1 hover:scale-110 transition-transform">
                <MessageCircle className="w-5 h-5 fill-white" />
              </button>
              <span className="text-xs mt-0.5 text-white">10</span>
            </div>
            <div className="flex flex-col items-center">
              <button className="p-1 hover:scale-110 transition-transform">
                <Bookmark className="w-5 h-5 fill-white" />
              </button>
              <span className="text-xs mt-0.5 text-white">10</span>
            </div>
            <div className="flex flex-col items-center">
              <button className="p-1 hover:scale-110 transition-transform">
                <Share className="w-5 h-5" />
              </button>
              <span className="text-xs mt-0.5 text-white">Share</span>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black h-16 flex items-center justify-around px-4">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-white rounded-sm"></div>
            <span className="text-xs text-white mt-1">Home</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-white rounded-sm"></div>
            <span className="text-xs text-white mt-1">Friends</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-8 bg-white rounded-xl border-2 border-blue-400"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-white rounded-sm"></div>
            <span className="text-xs text-white mt-1">Inbox</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-white rounded-sm"></div>
            <span className="text-xs text-white mt-1">Profile</span>
          </div>
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-12 h-12"
              style={{
                filter: "drop-shadow(0px 0px 3px rgba(0,0,0,0.5))",
              }}
            >
              <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 000-1.69L9.54 5.98A.998.998 0 008 6.82z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-gray-700">
        <p className="font-medium">
          Interactive prototype with visuals and components
        </p>
        <p className="mt-1 text-sm text-gray-500">Click elements to interact</p>
      </div>
    </div>
  );
}

// STEP 4: Final Polished Product (Original TikTok component)
export function TikTokStep4() {
  // We'll use a dynamic import here to avoid circular dependencies
  const DynamicTikTokFinal = dynamic(() => import("./TikTokFinal"), {
    ssr: false,
  });

  return <DynamicTikTokFinal />;
}
