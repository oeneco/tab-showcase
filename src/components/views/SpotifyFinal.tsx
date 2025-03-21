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

// Playlist data
const playlists = [
  {
    id: 1,
    title: "Yellow",
    artist: "Coldplay",
    duration: "4:27",
    description: "From the album Parachutes",
  },
  {
    id: 2,
    title: "The Scientist",
    artist: "Coldplay",
    duration: "5:09",
    description: "From the album A Rush of Blood to the Head",
  },
  {
    id: 3,
    title: "Fix You",
    artist: "Coldplay",
    duration: "4:54",
    description: "From the album X&Y",
  },
  {
    id: 4,
    title: "Viva la Vida",
    artist: "Coldplay",
    duration: "4:01",
    description: "From the album Viva la Vida or Death and All His Friends",
  },
];

export default function SpotifyFinal() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(267); // 4:27 for "Yellow"
  const [volume, setVolume] = useState(80);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Screen adjustment controls - sync with TikTok view
  const [phoneHeight, setPhoneHeight] = useState(75); // Controls iPhone frame size
  const [screenWidth, setScreenWidth] = useState(94); // Percentage of frame width
  const [screenHeight, setScreenHeight] = useState(94); // Percentage of frame height
  const [cornerRadius, setCornerRadius] = useState(32);

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Next track
  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlists.length);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  // Previous track
  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlists.length) % playlists.length);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  // Update progress bar when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= duration) {
            if (isRepeat) {
              return 0;
            } else {
              nextTrack();
              return 0;
            }
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration, isRepeat]);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Format remaining time with minus sign
  const formatRemainingTime = (seconds: number, totalDuration: number) => {
    const remaining = totalDuration - seconds;
    const mins = Math.floor(remaining / 60);
    const secs = Math.floor(remaining % 60);
    return `-${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Add keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only process if not typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === " " || e.code === "Space") {
        e.preventDefault(); // Prevent page scroll
        togglePlayPause();
      } else if (e.key.toLowerCase() === "n") {
        nextTrack();
      } else if (e.key.toLowerCase() === "p") {
        prevTrack();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [togglePlayPause, nextTrack, prevTrack]); // Include all functions used in the effect

  return (
    <div className="h-screen w-full bg-[#F9F9F9] flex flex-col justify-center items-center p-4">
      {/* Main Container with iPhone Frame */}
      <div className="relative" style={{ height: `${phoneHeight}vh` }}>
        {/* Content container */}
        <div className="relative h-full flex items-center justify-center">
          {/* Screen container */}
          <div
            className="relative overflow-hidden bg-black"
            style={{
              width: `${screenWidth}%`,
              height: `${screenHeight}%`,
              borderRadius: `${cornerRadius}px`,
              zIndex: 10,
            }}
          >
            {/* Spotify App Content */}
            <div className="relative w-full h-full overflow-hidden bg-black">
              {/* Status Bar */}
              <div className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-5 pt-3 text-white text-sm">
                <div className="font-semibold">9:41</div>
                <div className="flex space-x-1 items-center">
                  <div className="h-3 w-4">
                    <svg viewBox="0 0 20 12" fill="currentColor">
                      <path d="M10 0C5.6 0 2 2.2 0 6c2 3.8 5.6 6 10 6s8-2.2 10-6c-2-3.8-5.6-6-10-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
                    </svg>
                  </div>
                  <div className="h-3 w-4">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v1.18C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                    </svg>
                  </div>
                  <div className="h-3 w-6">
                    <svg viewBox="0 0 25 12" fill="currentColor">
                      <path d="M1 12h3c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1H1c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1zm7 0h3c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1zm7 0h3c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1zm7 0h3c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="absolute inset-0 bg-black">
                {/* Header */}
                <div className="absolute top-10 left-0 right-0 z-10 flex items-center justify-between px-4">
                  <button className="p-2 text-white hover:bg-[#ffffff22] rounded-full">
                    <ChevronDown size={24} />
                  </button>
                  <div>
                    <h3 className="text-white text-xs tracking-wide text-center uppercase">
                      PLAYING FROM ALBUM
                    </h3>
                    <h4 className="text-white font-medium text-sm text-center">
                      Parachutes
                    </h4>
                  </div>
                  <button className="p-2 text-white hover:bg-[#ffffff22] rounded-full">
                    <ListMusic size={24} />
                  </button>
                </div>

                {/* Album Title Banner */}
                <div className="absolute top-24 left-0 right-0 px-4 text-center">
                  <h1 className="text-white text-2xl font-bold tracking-wider uppercase">
                    COLDPLAY•PARACHUTES
                  </h1>
                </div>

                {/* Album Art */}
                <div className="absolute top-36 left-0 right-0 px-6">
                  <div className="aspect-square bg-black rounded-none overflow-hidden mx-auto">
                    {/* Use the placeholder image */}
                    <div className="w-full h-full relative">
                      <img
                        src="/Spotify/spotify_placeholder.png"
                        alt="Album Cover - Yellow by Coldplay"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Album Title - Positioned below album art */}
                  <div className="mt-8 px-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h2 className="text-white text-3xl font-bold">
                          Yellow
                        </h2>
                        <p className="text-white text-base opacity-80 mt-1">
                          Coldplay
                        </p>
                      </div>
                      <button
                        className="p-2 hover:scale-110 transition-transform mt-2"
                        onClick={() => setIsLiked(!isLiked)}
                      >
                        <Heart
                          size={24}
                          className={
                            isLiked
                              ? "fill-white text-white"
                              : "text-white stroke-[1.5]"
                          }
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-36 left-0 right-0 px-6">
                  <div
                    ref={progressBarRef}
                    className="h-1 bg-white/20 rounded-full cursor-pointer"
                    onClick={(e) => {
                      if (progressBarRef.current) {
                        const rect =
                          progressBarRef.current.getBoundingClientRect();
                        const percent = (e.clientX - rect.left) / rect.width;
                        setCurrentTime(percent * duration);
                      }
                    }}
                  >
                    <div
                      className="h-full bg-white rounded-full"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-white/60 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatRemainingTime(currentTime, duration)}</span>
                  </div>
                </div>

                {/* Playback Controls */}
                <div className="absolute bottom-20 left-0 right-0 flex items-center justify-evenly px-4">
                  <button
                    className={`text-white opacity-70 hover:opacity-100 p-2 ${
                      isShuffle ? "opacity-100" : ""
                    }`}
                    onClick={() => setIsShuffle(!isShuffle)}
                  >
                    <Shuffle size={22} />
                  </button>
                  <button className="text-white p-2" onClick={prevTrack}>
                    <SkipBack size={30} />
                  </button>
                  <button
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center transition-transform shadow-md"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? (
                      <Pause size={30} color="#000" />
                    ) : (
                      <Play size={30} color="#000" className="ml-1" />
                    )}
                  </button>
                  <button className="text-white p-2" onClick={nextTrack}>
                    <SkipForward size={30} />
                  </button>
                  <button
                    className={`text-white opacity-70 hover:opacity-100 p-2 ${
                      isRepeat ? "opacity-100" : ""
                    }`}
                    onClick={() => setIsRepeat(!isRepeat)}
                  >
                    <Repeat size={22} />
                  </button>
                </div>

                {/* Bottom Action Bar */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-6 py-3">
                  <button className="text-white opacity-60 hover:opacity-100">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 8C10.9 8 10 7.1 10 6C10 4.9 10.9 4 12 4C13.1 4 14 4.9 14 6C14 7.1 13.1 8 12 8ZM12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10ZM12 16C13.1 16 14 16.9 14 18C14 19.1 13.1 20 12 20C10.9 20 10 19.1 10 18C10 16.9 10.9 16 12 16Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>

                  <div className="bg-[#c97d10] rounded-full py-2 px-5 flex items-center justify-between w-56">
                    <span className="text-white font-semibold text-sm">
                      Lyrics
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-white opacity-80 hover:opacity-100 p-1">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                      <button className="text-white opacity-80 hover:opacity-100 p-1">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <button className="text-white opacity-60 hover:opacity-100">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 13H5V11H3V13ZM3 17H5V15H3V17ZM3 9H5V7H3V9ZM7 13H21V11H7V13ZM7 17H21V15H7V17ZM7 7V9H21V7H7Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>

                {/* Additional Buttons/Overlays */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-1/3 h-[30px] bg-black rounded-b-2xl"></div>
              </div>
            </div>
          </div>

          {/* iPhone Frame overlaying content */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{ zIndex: 20 }}
          >
            <img
              src="/TikTok/iPhone 16 - Black - Portrait.png"
              alt="iPhone Frame"
              className="h-full w-auto mx-auto pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
