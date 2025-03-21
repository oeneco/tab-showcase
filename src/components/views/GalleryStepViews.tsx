"use client";

import React from "react";
import { motion } from "framer-motion";
import { Fira_Code } from "next/font/google";
import Image from "next/image";
import dynamic from "next/dynamic";

// Configure Fira Code for code font
const firaCode = Fira_Code({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

// Shared content from notepad
const content = {
  title: "Cursor",
  subtitle: "Make the thing you want to make, faster",
  tagline: "for noobs",
  sections: [
    {
      step: "01",
      title: "Type Your Idea, See It in Action",
      description:
        "Write a quick description of your vision and watch Cursor transform it into a functional demo in moments. No need to wrestle with coding syntax or complex frameworks—our AI handles the heavy lifting so you can focus on creativity and results.",
    },
    {
      step: "02",
      title: "Refine Your Project with an AI Engineer",
      description:
        "Need to tweak layouts, add features, or optimize performance? Cursor's AI works alongside you like a seasoned developer, helping refine your software every step of the way. Iterate and improve easily, one prompt at a time.",
    },
    {
      step: "03",
      title: "Move Fast Without Compromising Quality",
      description:
        "When you can build so quickly, you're free to explore new ideas for the fun of it. Test out different approaches, pivot on a whim, and keep every project polished. The speed and quality let you push creative boundaries without ever feeling stuck.",
    },
    {
      step: "04",
      title: "Scale to Pro Anytime",
      description:
        "Cursor isn't just for quick demos—it's engineered for serious growth. When you're ready to level up, dive deeper into advanced features, robust integrations, and pro-level tools. In no time, you'll have a professional-grade product built on a strong foundation.",
    },
  ],
  cta: "Download for MacOS",
};

// STEP 1: Raw Text Content (Conceptual Stage)
export function GalleryStep1() {
  return (
    <div
      className={`h-screen w-full bg-white p-8 overflow-auto ${firaCode.className}`}
    >
      <h1 className="text-3xl font-bold mb-8">3D Poster Gallery</h1>

      <div className="space-y-6 max-w-2xl">
        <div className="border-l-4 border-yellow-500 pl-4">
          <h2 className="font-bold">Content</h2>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Main Title: {content.title}</li>
            <li>Subtitle: {content.subtitle}</li>
            <li>Tag: {content.tagline}</li>
            <li>4 Feature Posters with step numbers</li>
            <li>Call to Action: {content.cta}</li>
          </ul>
        </div>

        <div className="border-l-4 border-yellow-500 pl-4">
          <h2 className="font-bold">3D Elements</h2>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Wall-mounted posters in 3D space</li>
            <li>Dynamic shadows responding to mouse movement</li>
            <li>Mouse pointer acts as light source</li>
            <li>Interactive camera controls</li>
            <li>Depth and perspective effects</li>
          </ul>
        </div>

        <div className="border-l-4 border-yellow-500 pl-4">
          <h2 className="font-bold">Visual Elements</h2>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Bright yellow background (brand color)</li>
            <li>Modern, minimalist poster designs</li>
            <li>Feature images with abstract visualizations</li>
            <li>Consistent typography hierarchy</li>
            <li>3D environment with proper lighting</li>
          </ul>
        </div>

        <div className="mt-8 px-4 py-3 bg-gray-100 rounded-lg">
          <p className="text-gray-700">
            3D gallery showcasing Cursor product features with interactive
            lighting and shadows that respond to mouse movement.
          </p>
        </div>
      </div>
    </div>
  );
}

// STEP 2: Basic Wireframe Structure
export function GalleryStep2() {
  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-4xl aspect-video bg-yellow-300 border border-gray-200 rounded-md shadow-md overflow-hidden relative">
        {/* Header section */}
        <div className="absolute top-8 left-8 z-10">
          <div className="w-40 h-10 bg-gray-800 rounded-md mb-2"></div>
          <div className="w-64 h-5 bg-gray-700 rounded-md"></div>
        </div>

        {/* CTA Button */}
        <div className="absolute top-8 right-8 z-10">
          <div className="w-40 h-10 bg-black rounded-md"></div>
        </div>

        {/* Poster Wall Layout - 2x2 Grid */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-4 transform perspective-800 rotateX-5">
            {/* Poster 1 */}
            <div className="w-48 h-64 bg-white shadow-md transform -rotate-1 relative">
              <div className="absolute top-4 left-4 w-8 h-8 bg-gray-800 rounded-full"></div>
              <div className="absolute top-16 left-4 w-40 h-6 bg-gray-800 rounded-md"></div>
              <div className="absolute top-24 left-4 right-4 h-32 bg-gray-200 rounded-md"></div>
            </div>

            {/* Poster 2 */}
            <div className="w-48 h-64 bg-white shadow-md transform rotate-1 relative">
              <div className="absolute top-4 left-4 w-8 h-8 bg-gray-800 rounded-full"></div>
              <div className="absolute top-16 left-4 w-40 h-6 bg-gray-800 rounded-md"></div>
              <div className="absolute top-24 left-4 right-4 h-32 bg-gray-200 rounded-md"></div>
            </div>

            {/* Poster 3 */}
            <div className="w-48 h-64 bg-white shadow-md transform -rotate-2 relative">
              <div className="absolute top-4 left-4 w-8 h-8 bg-gray-800 rounded-full"></div>
              <div className="absolute top-16 left-4 w-40 h-6 bg-gray-800 rounded-md"></div>
              <div className="absolute top-24 left-4 right-4 h-32 bg-gray-200 rounded-md"></div>
            </div>

            {/* Poster 4 */}
            <div className="w-48 h-64 bg-white shadow-md transform rotate-2 relative">
              <div className="absolute top-4 left-4 w-8 h-8 bg-gray-800 rounded-full"></div>
              <div className="absolute top-16 left-4 w-40 h-6 bg-gray-800 rounded-md"></div>
              <div className="absolute top-24 left-4 right-4 h-32 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>

        {/* Mouse indicator */}
        <div className="absolute bottom-10 right-10 flex items-center">
          <div className="w-6 h-10 border-2 border-gray-800 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-gray-800 rounded-full animate-bounce"></div>
          </div>
          <div className="ml-2 w-20 h-4 bg-gray-800 rounded-md"></div>
        </div>
      </div>

      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>Basic wireframe of 3D poster gallery</p>
        <p className="mt-1">Showing poster layout and interactive elements</p>
      </div>
    </div>
  );
}

// STEP 3: Interactive Prototype
export function GalleryStep3() {
  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-4xl aspect-video bg-yellow-300 border border-gray-200 rounded-md shadow-md overflow-hidden relative">
        {/* Header section */}
        <div className="absolute top-8 left-8 z-10">
          <h1 className="text-5xl font-bold text-black mb-2">
            {content.title}
          </h1>
          <p className="text-xl text-gray-800">{content.subtitle}</p>
          <p className="text-sm italic text-gray-700 mt-1">{content.tagline}</p>
        </div>

        {/* CTA Button */}
        <div className="absolute top-8 right-8 z-10">
          <a
            href="https://www.cursor.com/downloads"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-900 transition-colors">
              {content.cta}
            </button>
          </a>
        </div>

        {/* Poster Wall Layout - 2x2 Grid */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-8 transform perspective-1000 rotateX-5 scale-90">
            {content.sections.map((section, index) => (
              <div
                key={index}
                className={`w-64 h-80 bg-white rounded-md shadow-lg transform ${
                  index % 2 === 0 ? "-rotate-2" : "rotate-2"
                } ${
                  index < 2 ? "-translate-y-4" : "translate-y-4"
                } hover:scale-105 transition-transform duration-300`}
              >
                <div className="p-4 h-full flex flex-col">
                  <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center font-bold text-gray-800 mb-3">
                    {section.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                  <div className="flex-1 mb-4 rounded-md overflow-hidden relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-purple-500 to-orange-500 opacity-50 mix-blend-multiply ${
                        index === 0
                          ? "from-blue-500 to-purple-500"
                          : index === 1
                          ? "from-green-500 to-blue-500"
                          : index === 2
                          ? "from-orange-500 to-red-500"
                          : "from-red-500 to-yellow-500"
                      }`}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {section.description.substring(0, 100)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mouse movement indicator */}
        <div className="absolute bottom-8 right-8 flex items-center">
          <div className="w-8 h-8 border-2 border-black rounded-full relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1 h-1 bg-black rounded-full"></div>
            </div>
            <div className="absolute w-6 h-4 border-t-2 border-l-2 border-black transform -translate-x-1 -translate-y-1"></div>
          </div>
          <div className="ml-2 text-sm font-medium">
            Move to change lighting
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-gray-700">
        <p className="font-medium">Interactive prototype with visual styling</p>
        <p className="mt-1 text-sm text-gray-500">
          Design demonstrates hover effects and layout
        </p>
      </div>
    </div>
  );
}

// STEP 4: Final Polished Product (3D Gallery)
export function GalleryStep4() {
  const DynamicGalleryFinal = dynamic(() => import("./GalleryFinal"), {
    ssr: false,
  });

  return <DynamicGalleryFinal />;
}
