"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Fira_Code } from "next/font/google";
import dynamic from "next/dynamic";

// Configure the Fira Code monospace font
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
export function SpreadsheetStep1() {
  return (
    <div
      className={`h-screen w-full bg-white p-8 overflow-auto ${firaCode.className}`}
    >
      <h1 className="text-3xl font-bold mb-8">Spreadsheet Interface</h1>

      <div className="space-y-6 max-w-2xl">
        <div className="border-l-4 border-gray-300 pl-4">
          <h2 className="font-bold">Content</h2>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Main Title: {content.title}</li>
            <li>Subtitle: {content.subtitle}</li>
            <li>Tag: {content.tagline}</li>
            <li>4 Feature Sections with step numbers</li>
            <li>Call to Action: {content.cta}</li>
          </ul>
        </div>

        <div className="border-l-4 border-gray-300 pl-4">
          <h2 className="font-bold">Data Structure</h2>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Column A: Step numbers (01, 02, 03, 04)</li>
            <li>Column B: Feature titles</li>
            <li>Column C: Feature descriptions</li>
            <li>Header row with title and subtitle</li>
            <li>Footer row with CTA button</li>
          </ul>
        </div>

        <div className="border-l-4 border-gray-300 pl-4">
          <h2 className="font-bold">UI Elements</h2>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Cell grid with headers and data</li>
            <li>Column resizing controls</li>
            <li>Cell selection and editing</li>
            <li>Formatting controls (bold, italic, etc.)</li>
            <li>Custom styling for headers and CTA</li>
          </ul>
        </div>

        <div className="mt-8 px-4 py-3 bg-gray-100 rounded-lg">
          <p className="text-gray-700">
            Spreadsheet interface displaying Cursor product information, with
            editable cells and standard spreadsheet functionality.
          </p>
        </div>
      </div>
    </div>
  );
}

// STEP 2: Basic Wireframe Structure
export function SpreadsheetStep2() {
  return (
    <div className="h-screen w-full bg-[#F9F9F9] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-md shadow-md overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center h-10 bg-gray-100 border-b border-gray-200 px-2">
          <div className="w-5 h-5 bg-gray-300 rounded mr-2"></div>
          <div className="w-5 h-5 bg-gray-300 rounded mr-2"></div>
          <div className="w-5 h-5 bg-gray-300 rounded mr-2"></div>
          <div className="w-20 h-5 bg-gray-300 rounded mr-2"></div>
          <div className="h-5 bg-gray-300 rounded flex-1 max-w-[200px]"></div>
        </div>

        {/* Column Headers */}
        <div className="flex border-b border-gray-200">
          <div className="w-12 h-8 bg-gray-100 border-r border-gray-200 flex items-center justify-center">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="w-20 h-8 bg-gray-100 border-r border-gray-200 flex items-center justify-center">
            <div className="w-8 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="w-40 h-8 bg-gray-100 border-r border-gray-200 flex items-center justify-center">
            <div className="w-20 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="flex-1 h-8 bg-gray-100 flex items-center justify-center">
            <div className="w-32 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Header Row */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <div className="w-12 h-16 border-r border-gray-200"></div>
          <div className="flex-1 h-16 p-2">
            <div className="w-32 h-5 bg-gray-300 rounded mb-2"></div>
            <div className="w-48 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Data Rows */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex border-b border-gray-200">
            <div className="w-12 h-12 bg-gray-50 border-r border-gray-200 flex items-center justify-center">
              <div className="w-6 h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="w-20 h-12 border-r border-gray-200 flex items-center p-2">
              <div className="w-10 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="w-40 h-12 border-r border-gray-200 flex items-center p-2">
              <div className="w-32 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="flex-1 h-12 flex items-center p-2">
              <div className="w-full h-6 bg-gray-100 rounded"></div>
            </div>
          </div>
        ))}

        {/* Footer Row */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <div className="w-12 h-12 border-r border-gray-200"></div>
          <div className="flex-1 h-12 p-2 flex items-center justify-center">
            <div className="w-32 h-8 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>Basic wireframe of spreadsheet interface</p>
        <p className="mt-1">Showing layout structure and grid system</p>
      </div>
    </div>
  );
}

// STEP 3: Interactive Prototype
export function SpreadsheetStep3() {
  return (
    <div className="h-screen w-full bg-[#F9F9F9] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-md shadow-lg overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center h-10 bg-gray-100 border-b border-gray-200 px-2">
          <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded mr-1">
            <span className="font-bold">B</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded mr-1">
            <span className="italic">I</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded mr-1">
            <span className="underline">U</span>
          </button>
          <div className="h-6 border-r border-gray-300 mx-2"></div>
          <select className="h-8 bg-white border border-gray-300 rounded px-2 text-sm">
            <option>Arial</option>
            <option>Verdana</option>
            <option>Times New Roman</option>
          </select>
        </div>

        {/* Column Headers */}
        <div className="flex border-b border-gray-200">
          <div className="w-12 h-8 bg-gray-100 border-r border-gray-200 flex items-center justify-center"></div>
          <div className="w-20 h-8 bg-gray-100 border-r border-gray-200 flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-600">A</span>
          </div>
          <div className="w-60 h-8 bg-gray-100 border-r border-gray-200 flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-600">B</span>
          </div>
          <div className="flex-1 h-8 bg-gray-100 flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-600">C</span>
          </div>
        </div>

        {/* Header Row with merged cells */}
        <div className="flex border-b border-gray-200 bg-blue-50">
          <div className="w-12 h-16 border-r border-gray-200 flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-600">1</span>
          </div>
          <div className="flex-1 h-16 p-2 flex flex-col justify-center">
            <h2 className="text-xl font-bold text-gray-800">{content.title}</h2>
            <p className="text-sm text-gray-600">{content.subtitle}</p>
          </div>
        </div>

        {/* Subtitle Row */}
        <div className="flex border-b border-gray-200 bg-blue-50">
          <div className="w-12 h-10 border-r border-gray-200 flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-600">2</span>
          </div>
          <div className="flex-1 h-10 p-2 flex items-center">
            <p className="text-sm italic text-gray-600">{content.tagline}</p>
          </div>
        </div>

        {/* Data Rows */}
        {content.sections.map((section, i) => (
          <div
            key={i}
            className="flex border-b border-gray-200 hover:bg-gray-50"
          >
            <div className="w-12 h-16 bg-gray-50 border-r border-gray-200 flex items-center justify-center">
              <span className="text-xs font-semibold text-gray-600">
                {i + 3}
              </span>
            </div>
            <div className="w-20 h-16 border-r border-gray-200 flex items-center p-2">
              <span className="font-bold text-gray-800">{section.step}</span>
            </div>
            <div className="w-60 h-16 border-r border-gray-200 flex items-center p-2">
              <p className="font-semibold text-gray-800">{section.title}</p>
            </div>
            <div className="flex-1 min-h-16 flex items-center p-2">
              <p className="text-sm text-gray-700">{section.description}</p>
            </div>
          </div>
        ))}

        {/* Footer Row */}
        <div className="flex border-b border-gray-200 bg-blue-50">
          <div className="w-12 h-12 border-r border-gray-200 flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-600">
              {content.sections.length + 3}
            </span>
          </div>
          <div className="flex-1 h-12 p-2 flex items-center justify-center">
            <a
              href="https://www.cursor.com/downloads"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                {content.cta}
              </button>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-gray-700">
        <p className="font-medium">Interactive prototype with real content</p>
        <p className="mt-1 text-sm text-gray-500">
          Hover over rows for highlight effect
        </p>
      </div>
    </div>
  );
}

// STEP 4: Final Polished Product (Dynamic Spreadsheet)
export function SpreadsheetStep4() {
  const DynamicSpreadsheetFinal = dynamic(() => import("./SpreadsheetFinal"), {
    ssr: false,
  });

  return <DynamicSpreadsheetFinal />;
}
