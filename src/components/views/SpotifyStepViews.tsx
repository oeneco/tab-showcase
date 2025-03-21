"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume2,
  Heart,
  ListMusic,
  Home,
  Search,
  Library,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Space_Mono } from "next/font/google";

// Configure the Space Mono font
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

// Playlist data
const playlists = [
  {
    id: 1,
    title: "Type Your Idea, See It in Action",
    artist: "Cursor",
    duration: "3:45",
    description:
      "Write a quick description of your vision and watch Cursor transform it into a functional demo in moments. No need to wrestle with coding syntax or complex frameworks—our AI handles the heavy lifting so you can focus on creativity and results.",
  },
  {
    id: 2,
    title: "Refine Your Project with an AI Engineer",
    artist: "Cursor",
    duration: "4:12",
    description:
      "Need to tweak layouts, add features, or optimize performance? Cursor's AI works alongside you like a seasoned developer, helping refine your software every step of the way. Iterate and improve easily, one prompt at a time.",
  },
  {
    id: 3,
    title: "Move Fast Without Compromising Quality",
    artist: "Cursor",
    duration: "3:30",
    description:
      "When you can build so quickly, you're free to explore new ideas for the fun of it. Test out different approaches, pivot on a whim, and keep every project polished. The speed and quality let you push creative boundaries without ever feeling stuck.",
  },
  {
    id: 4,
    title: "Scale to Pro Anytime",
    artist: "Cursor",
    duration: "2:55",
    description:
      "Cursor isn't just for quick demos—it's engineered for serious growth. When you're ready to level up, dive deeper into advanced features, robust integrations, and pro-level tools. In no time, you'll have a professional-grade product built on a strong foundation.",
  },
];

// STEP 1: Raw Text Content (Conceptual Stage)
export function SpotifyStep1() {
  return (
    <div
      className={`h-screen w-full bg-white p-8 overflow-auto ${spaceMono.className}`}
    >
      <h1 className="text-3xl font-bold mb-8">Spotify Interface</h1>

      <div className="space-y-6 max-w-2xl">
        <div className="border-l-4 border-gray-300 pl-4">
          <h2 className="font-bold">Content</h2>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Music player with album artwork display</li>
            <li>Artist: Cursor</li>
            <li>Track title and information display</li>
            <li>Progress bar with duration indicators</li>
          </ul>
        </div>

        <div className="border-l-4 border-gray-300 pl-4">
          <h2 className="font-bold">Playback Controls</h2>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Play/Pause button</li>
            <li>Skip forward/backward buttons</li>
            <li>Repeat and shuffle options</li>
            <li>Volume control</li>
          </ul>
        </div>

        <div className="border-l-4 border-gray-300 pl-4">
          <h2 className="font-bold">UI Elements</h2>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Dark theme with accent colors</li>
            <li>Bottom playback control bar</li>
            <li>Side navigation with playlists</li>
            <li>Phone frame similar to TikTok view</li>
          </ul>
        </div>

        <div className="mt-8 px-4 py-3 bg-gray-100 rounded-lg">
          <p className="text-gray-700">
            Spotify-like interface showcasing Cursor content as music tracks,
            with full playback controls and navigation.
          </p>
        </div>
      </div>
    </div>
  );
}

// STEP 2: Basic Wireframe Structure
export function SpotifyStep2() {
  return (
    <div className="h-screen w-full bg-[#F9F9F9] flex flex-col justify-center items-center p-4">
      <div className="relative aspect-[9/16] w-full max-w-sm bg-[#121212] border-2 border-gray-700 rounded-xl overflow-hidden shadow-md">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 h-14 bg-[#121212] border-b border-gray-800 flex items-center justify-between px-4">
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
          <div className="w-32 h-4 bg-gray-700 rounded"></div>
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
        </div>

        {/* Album Art Placeholder */}
        <div className="absolute top-16 left-4 right-4 aspect-square bg-gray-800 rounded-md"></div>

        {/* Track Info */}
        <div className="absolute top-[45%] left-4 right-4 space-y-2">
          <div className="w-56 h-6 bg-gray-700 rounded"></div>
          <div className="w-40 h-4 bg-gray-600 rounded"></div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-32 left-4 right-4 h-1 bg-gray-700 rounded">
          <div className="w-1/3 h-full bg-gray-500 rounded"></div>
        </div>
        <div className="absolute bottom-28 left-4 right-4 flex justify-between">
          <div className="w-8 h-3 bg-gray-600 rounded"></div>
          <div className="w-8 h-3 bg-gray-600 rounded"></div>
        </div>

        {/* Playback Controls */}
        <div className="absolute bottom-16 left-0 right-0 h-16 flex items-center justify-center space-x-8">
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
          <div className="w-12 h-12 bg-gray-500 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
        </div>

        {/* Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-[#282828] border-t border-gray-800 flex items-center justify-around px-4">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-gray-600 rounded"></div>
            <div className="w-10 h-2 bg-gray-500 rounded mt-1"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-gray-600 rounded"></div>
            <div className="w-10 h-2 bg-gray-500 rounded mt-1"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-gray-600 rounded"></div>
            <div className="w-10 h-2 bg-gray-500 rounded mt-1"></div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>Basic wireframe of Spotify-style interface</p>
        <p className="mt-1">
          Showing placeholder elements for music player components
        </p>
      </div>
    </div>
  );
}

// STEP 3: Interactive Prototype with Basic Functionality
export function SpotifyStep3() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(240); // 4 minutes
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [currentTrack, setCurrentTrack] = useState(0);

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Next track
  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlists.length);
    setCurrentTime(0);
  };

  // Previous track
  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlists.length) % playlists.length);
    setCurrentTime(0);
  };

  // Update progress bar
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= duration) {
            nextTrack();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration]);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="h-screen w-full bg-[#F9F9F9] flex flex-col justify-center items-center p-4">
      <div className="relative aspect-[9/16] w-full max-w-sm bg-gradient-to-b from-[#121212] to-[#181818] rounded-xl overflow-hidden shadow-lg">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-[#212121] to-transparent flex items-center justify-between px-4">
          <button className="p-2 text-white">
            <ChevronLeft size={20} />
          </button>
          <h3 className="text-white font-medium">Now Playing</h3>
          <button className="p-2 text-white">
            <ListMusic size={20} />
          </button>
        </div>

        {/* Album Art */}
        <div className="absolute top-16 left-4 right-4 aspect-square bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <img
            src="/Spotify/spotify_placeholder.png"
            alt="Album Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Track Info */}
        <div className="absolute top-[46%] left-4 right-4 mt-6">
          <h2 className="text-white text-xl font-bold truncate">
            {playlists[currentTrack].title}
          </h2>
          <p className="text-gray-400 text-sm">
            {playlists[currentTrack].artist}
          </p>
        </div>

        {/* Progress Bar */}
        <div
          ref={progressBarRef}
          className="absolute bottom-32 left-4 right-4 h-1 bg-gray-700 rounded cursor-pointer"
          onClick={(e) => {
            if (progressBarRef.current) {
              const rect = progressBarRef.current.getBoundingClientRect();
              const percent = (e.clientX - rect.left) / rect.width;
              setCurrentTime(percent * duration);
            }
          }}
        >
          <div
            className="h-full bg-[#1DB954] rounded"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>
        <div className="absolute bottom-28 left-4 right-4 flex justify-between text-xs text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Playback Controls */}
        <div className="absolute bottom-14 left-0 right-0 flex items-center justify-center space-x-8">
          <button className="text-gray-400 hover:text-white">
            <Shuffle size={20} />
          </button>
          <button className="text-white hover:text-white" onClick={prevTrack}>
            <SkipBack size={24} />
          </button>
          <button
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause size={24} color="#000" />
            ) : (
              <Play size={24} color="#000" />
            )}
          </button>
          <button className="text-white hover:text-white" onClick={nextTrack}>
            <SkipForward size={24} />
          </button>
          <button className="text-gray-400 hover:text-white">
            <Repeat size={20} />
          </button>
        </div>

        {/* Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-[#282828] flex items-center justify-around px-4">
          <button className="flex flex-col items-center text-gray-300 hover:text-white">
            <Home size={20} />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center text-gray-300 hover:text-white">
            <Search size={20} />
            <span className="text-xs mt-1">Search</span>
          </button>
          <button className="flex flex-col items-center text-gray-300 hover:text-white">
            <Library size={20} />
            <span className="text-xs mt-1">Library</span>
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>Interactive Spotify player prototype</p>
        <p className="mt-1">Click buttons to control playback</p>
      </div>
    </div>
  );
}
