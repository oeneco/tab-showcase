"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useView } from "@/contexts/ViewContext";
import dynamic from "next/dynamic";
import Image from "next/image";
import Onboarding from "@/components/Onboarding";
import ControlsOverlay from "@/components/ControlsOverlay";

// Dynamically import views with no SSR to avoid hydration issues
const TikTokView = dynamic(() => import("@/components/views/TikTokView"), {
  ssr: false,
});
const SpotifyView = dynamic(() => import("@/components/views/SpotifyView"), {
  ssr: false,
  // Force refresh the component
});
const SpreadsheetView = dynamic(
  () => import("@/components/views/SpreadsheetView"),
  { ssr: false }
);
const GalleryView = dynamic(() => import("@/components/views/GalleryView"), {
  ssr: false,
});
const TerminalView = dynamic(() => import("@/components/views/TerminalView"), {
  ssr: false,
});

function LoadingView() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}

export default function Home() {
  const {
    currentView,
    buildStep,
    showOnboarding,
    completeOnboarding,
    showControls,
  } = useView();
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "Tab" ||
        e.key === "Escape" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight"
      ) {
        setActiveKey(e.key);
      }
    };

    const handleKeyUp = () => {
      setActiveKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const getKeyClassName = (keyName: string) => {
    const baseClass =
      "px-2 py-1 bg-gray-100 rounded border border-gray-300 text-gray-600 transition-all duration-100";
    const isActive =
      (keyName === "esc" && activeKey === "Escape") ||
      (keyName === "tab" && activeKey === "Tab") ||
      (keyName === "←" && activeKey === "ArrowLeft") ||
      (keyName === "→" && activeKey === "ArrowRight");
    return `${baseClass} ${
      isActive ? "scale-95 bg-gray-200 border-gray-400" : "hover:bg-gray-150"
    }`;
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "tiktok":
        return <TikTokView />;
      case "spotify":
        return <SpotifyView />;
      case "spreadsheet":
        return <SpreadsheetView />;
      case "3d":
        return <GalleryView />;
      case "terminal":
        return <TerminalView />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen relative">
      {/* Onboarding overlay */}
      <Onboarding
        showOnboarding={showOnboarding}
        completeOnboarding={completeOnboarding}
      />

      {/* Main content */}
      <Suspense fallback={<LoadingView />}>{renderCurrentView()}</Suspense>

      {/* Controls overlay */}
      <ControlsOverlay showControls={showControls} currentView={currentView} />

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/Overall/corsor ICON.png"
            alt="Cursor Icon"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
            priority
          />
        </div>
        <div className="flex items-center gap-8 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <kbd className={getKeyClassName("esc")}>esc</kbd>
            <span>Previous Step</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className={getKeyClassName("tab")}>tab</kbd>
            <span>Next Step</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <kbd className={getKeyClassName("←")}>←</kbd>
              <kbd className={getKeyClassName("→")}>→</kbd>
            </div>
            <span>Switch Apps</span>
          </div>
        </div>
        <div className="flex items-center">
          <Image
            src="/Overall/corsor type.svg"
            alt="Cursor Type"
            width={64}
            height={16}
            className="h-4 w-auto"
            priority
          />
        </div>
      </div>
    </main>
  );
}
