"use client";

import React from "react";
import { motion } from "framer-motion";
import { Fira_Code } from "next/font/google";
import dynamic from "next/dynamic";

// Configure Fira Code for terminal font
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
export function TerminalStep1() {
  return (
    <div
      className={`h-screen w-full bg-gray-900 p-8 overflow-auto ${firaCode.className}`}
    >
      <h1 className="text-3xl font-bold mb-8 text-green-400">
        Terminal Interface
      </h1>

      <div className="space-y-6 max-w-2xl text-gray-300">
        <div className="border-l-4 border-green-500 pl-4">
          <h2 className="font-bold text-green-400">Content</h2>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Main Title: {content.title}</li>
            <li>Subtitle: {content.subtitle}</li>
            <li>Tag: {content.tagline}</li>
            <li>4 Feature Sections with step numbers</li>
            <li>Call to Action: {content.cta}</li>
          </ul>
        </div>

        <div className="border-l-4 border-green-500 pl-4">
          <h2 className="font-bold text-green-400">Command Structure</h2>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Commands to display different content sections</li>
            <li>Interactive input/output system</li>
            <li>Command history navigation</li>
            <li>Shell prompt with username and path</li>
            <li>Animated typing effects</li>
          </ul>
        </div>

        <div className="border-l-4 border-green-500 pl-4">
          <h2 className="font-bold text-green-400">UI Elements</h2>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Terminal window with dark background</li>
            <li>Command input field with blinking cursor</li>
            <li>Syntax highlighting for commands and output</li>
            <li>Scrollable command history</li>
            <li>Interactive command completion</li>
          </ul>
        </div>

        <div className="mt-8 px-4 py-3 bg-gray-800 rounded-lg">
          <p className="text-green-400">
            Terminal interface displaying Cursor product information, with
            interactive command line and realistic shell environment.
          </p>
        </div>
      </div>
    </div>
  );
}

// STEP 2: Basic Wireframe Structure
export function TerminalStep2() {
  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-3xl bg-gray-800 border border-gray-700 rounded-md shadow-md overflow-hidden">
        {/* Terminal Window Title Bar */}
        <div className="flex items-center h-8 bg-gray-900 px-4">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <div className="flex-1 flex justify-center">
            <div className="w-40 h-3 bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="h-96 p-4">
          {/* Welcome Message */}
          <div className="h-8 w-64 bg-gray-700 mb-4 rounded"></div>

          {/* Command Line History */}
          <div className="space-y-4">
            {/* Command 1 */}
            <div className="flex mb-1">
              <div className="w-24 h-5 bg-gray-700 mr-2 rounded"></div>
              <div className="w-40 h-5 bg-gray-700 rounded"></div>
            </div>
            <div className="w-full h-10 bg-gray-700 rounded"></div>

            {/* Command 2 */}
            <div className="flex mb-1">
              <div className="w-24 h-5 bg-gray-700 mr-2 rounded"></div>
              <div className="w-32 h-5 bg-gray-700 rounded"></div>
            </div>
            <div className="w-full h-24 bg-gray-700 rounded"></div>

            {/* Command 3 */}
            <div className="flex mb-1">
              <div className="w-24 h-5 bg-gray-700 mr-2 rounded"></div>
              <div className="w-48 h-5 bg-gray-700 rounded"></div>
            </div>
            <div className="w-full h-16 bg-gray-700 rounded"></div>
          </div>

          {/* Current Command Line */}
          <div className="flex mt-6">
            <div className="w-24 h-5 bg-gray-700 mr-2 rounded"></div>
            <div className="w-32 h-5 bg-gray-700 rounded"></div>
            <div className="w-2 h-5 bg-gray-400 ml-1 animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>Basic wireframe of terminal interface</p>
        <p className="mt-1">
          Showing layout structure and command line elements
        </p>
      </div>
    </div>
  );
}

// STEP 3: Interactive Prototype
export function TerminalStep3() {
  return (
    <div
      className={`h-screen w-full bg-gray-100 flex flex-col justify-center items-center p-4 ${firaCode.className}`}
    >
      <div className="w-full max-w-3xl bg-gray-900 border border-gray-700 rounded-md shadow-md overflow-hidden">
        {/* Terminal Window Title Bar */}
        <div className="flex items-center h-8 bg-gray-800 px-4">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <div className="flex-1 flex justify-center">
            <span className="text-gray-400 text-xs">
              cursor-terminal — -zsh
            </span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="h-96 p-4 overflow-auto">
          {/* Welcome Message */}
          <div className="text-green-400 mb-4">
            Welcome to Cursor Terminal v1.0.0
          </div>

          {/* Command Line History */}
          <div className="space-y-2">
            {/* Command 1 */}
            <div className="text-white">
              <span className="text-blue-400">user@cursor</span>:
              <span className="text-green-400">~</span>$ ls
            </div>
            <div className="text-gray-300 ml-4">
              README.md &nbsp; package.json &nbsp; features &nbsp; download
              &nbsp; about.txt
            </div>

            {/* Command 2 */}
            <div className="text-white">
              <span className="text-blue-400">user@cursor</span>:
              <span className="text-green-400">~</span>$ cat README.md
            </div>
            <div className="text-gray-300 ml-4 bg-gray-800 p-2 rounded">
              <p className="text-xl font-bold">{content.title}</p>
              <p className="text-lg">{content.subtitle}</p>
              <p className="text-sm italic">{content.tagline}</p>
            </div>

            {/* Command 3 */}
            <div className="text-white">
              <span className="text-blue-400">user@cursor</span>:
              <span className="text-green-400">~</span>$ cd features
            </div>

            {/* Command 4 */}
            <div className="text-white">
              <span className="text-blue-400">user@cursor</span>:
              <span className="text-green-400">~/features</span>$ ls
            </div>
            <div className="text-gray-300 ml-4">
              01_idea_to_action.md &nbsp; 02_ai_engineer.md &nbsp; 03_quality.md
              &nbsp; 04_scale.md
            </div>

            {/* Command 5 */}
            <div className="text-white">
              <span className="text-blue-400">user@cursor</span>:
              <span className="text-green-400">~/features</span>$ cat
              01_idea_to_action.md
            </div>
            <div className="text-gray-300 ml-4 bg-gray-800 p-2 rounded">
              <p className="font-bold">{content.sections[0].title}</p>
              <p>{content.sections[0].description}</p>
            </div>

            {/* Current Command Line */}
            <div className="text-white flex">
              <span className="text-blue-400">user@cursor</span>:
              <span className="text-green-400">~/features</span>$
              <span className="text-white ml-1">_</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-gray-700">
        <p className="font-medium">
          Interactive prototype with real terminal feel
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Displays command history and content output
        </p>
      </div>
    </div>
  );
}

// STEP 4: Final Polished Product (Dynamic Terminal)
export function TerminalStep4() {
  const DynamicTerminalFinal = dynamic(() => import("./TerminalFinal"), {
    ssr: false,
  });

  return <DynamicTerminalFinal />;
}
