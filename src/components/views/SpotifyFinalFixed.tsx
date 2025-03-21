"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Heart,
  ListMusic,
  ChevronDown,
} from "lucide-react";

// Simplified version of SpotifyFinal to identify render issues

export default function SpotifyFinalFixed() {
  // Minimal state for testing
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="h-screen w-full bg-gradient-to-b from-gray-900 to-black flex flex-col justify-center items-center p-4">
      <h1 className="text-white text-4xl font-bold mb-8">Spotify Player</h1>

      {/* Simple player UI */}
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="aspect-square bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
          <p className="text-white">Album Art Placeholder</p>
        </div>

        <h2 className="text-white text-2xl font-bold">Yellow</h2>
        <p className="text-gray-400 mb-4">Coldplay</p>

        <div className="flex justify-center space-x-4 mt-6">
          <button className="text-white">
            <SkipBack size={24} />
          </button>
          <button
            className="bg-white rounded-full p-3"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause size={24} color="#000" />
            ) : (
              <Play size={24} color="#000" className="ml-0.5" />
            )}
          </button>
          <button className="text-white">
            <SkipForward size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
