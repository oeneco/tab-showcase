"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, MessageCircle, Bookmark, Share, MapPin } from "lucide-react";

interface TikTokScreen {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  likes?: string;
  comments?: string;
  bookmarks?: string;
}

const screens: TikTokScreen[] = [
  {
    id: 1,
    title: "Make the thing you want to make, faster",
    subtitle: "Cursor",
    description: "The AI-powered IDE that helps you build software faster",
    likes: "124K",
    comments: "8.4K",
    bookmarks: "32.6K",
  },
  {
    id: 2,
    title: "Type Your Idea, See It in Action",
    subtitle: "01",
    description:
      "Write a quick description of your vision and watch Cursor transform it into a functional demo in moments. No need to wrestle with coding syntax or complex frameworks—our AI handles the heavy lifting.",
    likes: "85K",
    comments: "6.2K",
    bookmarks: "17.1K",
  },
  {
    id: 3,
    title: "Refine Your Project with an AI Engineer",
    subtitle: "02",
    description:
      "Need to tweak layouts, add features, or optimize performance? Cursor's AI works alongside you like a seasoned developer, helping refine your software every step of the way.",
    likes: "92K",
    comments: "7.1K",
    bookmarks: "23.4K",
  },
  {
    id: 4,
    title: "Move Fast Without Compromising Quality",
    subtitle: "03",
    description:
      "When you can build so quickly, you're free to explore new ideas for the fun of it. Test out different approaches, pivot on a whim, and keep every project polished.",
    likes: "110K",
    comments: "9.3K",
    bookmarks: "41.2K",
  },
  {
    id: 5,
    title: "Scale to Pro Anytime",
    subtitle: "04",
    description:
      "Cursor isn't just for quick demos—it's engineered for serious growth. When you're ready to level up, dive deeper into advanced features and pro-level tools.",
    likes: "150K",
    comments: "12.8K",
    bookmarks: "54.7K",
  },
];

export default function TikTokFinal() {
  // Screen adjustment controls
  const [showControls, setShowControls] = useState(false);
  const [phoneHeight, setPhoneHeight] = useState(75); // Controls only the iPhone frame size

  // Independent screen size controls
  const [screenWidth, setScreenWidth] = useState(94); // Percentage of frame width
  const [screenHeight, setScreenHeight] = useState(94); // Percentage of frame height
  const [bottomSpacing, setBottomSpacing] = useState(88); // Distance from bottom in px

  const [snapEnabled, setSnapEnabled] = useState(true);
  const [cornerRadius, setCornerRadius] = useState(32);
  const [showContent, setShowContent] = useState(false); // Hide content text by default
  const containerRef = useRef<HTMLDivElement>(null);

  // Video playback controls - simplified
  const [isPlaying, setIsPlaying] = useState<{ [key: number]: boolean }>({});
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const [currentScreenView, setCurrentScreenView] = useState<number>(1);

  // Engagement counters
  const [engagementCounts, setEngagementCounts] = useState<{
    [key: number]: { likes: string; comments: string; bookmarks: string };
  }>(() => {
    const initialCounts: {
      [key: number]: { likes: string; comments: string; bookmarks: string };
    } = {};
    screens.forEach((screen) => {
      initialCounts[screen.id] = {
        likes: "10",
        comments: "10",
        bookmarks: "10",
      };
    });
    return initialCounts;
  });

  // Track which hearts are active (red)
  const [activeHearts, setActiveHearts] = useState<{ [key: number]: boolean }>(
    {}
  );

  // Create refs to store event handlers for cleanup
  const playHandlers = useRef<{ [key: number]: () => void }>({});
  const pauseHandlers = useRef<{ [key: number]: () => void }>({});

  // Get video source - verified that files exist
  const getVideoSource = (screenId: number) => {
    if (screenId === 1) {
      return "/TikTok/cursor_vid1.mp4";
    } else if (screenId === 2) {
      return "/TikTok/cursor_vid2.mp4";
    } else if (screenId === 3) {
      return "/TikTok/cursor_vid3.mp4";
    } else if (screenId === 4) {
      return "/TikTok/cursor_vid4.mp4";
    } else if (screenId === 5) {
      return "/TikTok/cursor_vid5.mp4";
    }
    return "";
  };

  const incrementCount = (
    screenId: number,
    type: "likes" | "comments" | "bookmarks"
  ) => {
    setEngagementCounts((prev) => {
      const currentCount = parseInt(prev[screenId][type]);
      return {
        ...prev,
        [screenId]: {
          ...prev[screenId],
          [type]: String(currentCount + 1),
        },
      };
    });

    // Set heart to active (red) when like button is clicked
    if (type === "likes") {
      setActiveHearts((prev) => ({
        ...prev,
        [screenId]: true,
      }));
    }
  };

  // Drastically simplified toggle play/pause function
  const togglePlayPause = (screenId: number) => {
    console.log(`Attempting to toggle play/pause for video ${screenId}`);
    const videoElement = videoRefs.current[screenId];

    if (!videoElement) {
      console.error(`No video element found for screen ${screenId}`);
      return;
    }

    try {
      if (videoElement.paused) {
        // Pause all other videos first
        Object.entries(videoRefs.current).forEach(([id, video]) => {
          const idNum = parseInt(id);
          if (video && idNum !== screenId && !video.paused) {
            video.pause();
            setIsPlaying((prev) => ({ ...prev, [idNum]: false }));
          }
        });

        // Play this video
        videoElement
          .play()
          .then(() => {
            console.log(`Successfully playing video ${screenId}`);
            setIsPlaying((prev) => ({ ...prev, [screenId]: true }));
          })
          .catch((error) => {
            console.error(`Error playing video ${screenId}:`, error);
            // Try with muted as fallback for autoplay policy
            videoElement.muted = true;
            videoElement.play().catch((e) => {
              console.error(`Failed to play even with muted:`, e);
            });
          });
      } else {
        // Pause this video
        videoElement.pause();
        setIsPlaying((prev) => ({ ...prev, [screenId]: false }));
      }
    } catch (error) {
      console.error(`Video playback error:`, error);
    }
  };

  // Auto-play the current video when it becomes visible
  useEffect(() => {
    if (currentScreenView && currentScreenView <= 5) {
      const videoElement = videoRefs.current[currentScreenView];
      if (videoElement) {
        togglePlayPause(currentScreenView);
      }
    }
  }, [currentScreenView]);

  // Add keyboard shortcut for controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Toggle controls on "C" key press
      if (e.key.toLowerCase() === "c") {
        setShowControls((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // Simple observer for screen visibility
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const screenId = parseInt(
            entry.target.getAttribute("data-screen-id") || "0"
          );
          if (!screenId) return;

          if (entry.isIntersecting) {
            setCurrentScreenView(screenId);
          }
        });
      },
      { threshold: 0.6 }
    );

    // Observe all screen elements
    const screenElements =
      containerRef.current.querySelectorAll("[data-screen-id]");
    screenElements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Simple setup without all the complexity
  const setupVideoRef = (el: HTMLVideoElement | null, screenId: number) => {
    if (!el) return;

    videoRefs.current[screenId] = el;

    // Set video source directly
    if (screenId >= 1 && screenId <= 5) {
      el.src = getVideoSource(screenId);

      // Set initial properties
      el.playsInline = true;
      el.preload = "auto";
      el.loop = true;
      el.muted = false; // Make sure audio is enabled by default

      // Add basic error handling
      el.onerror = () => {
        console.error(`Video ${screenId} error:`, el.error);
      };

      // Check if we can autoplay
      if (currentScreenView === screenId) {
        el.play().catch((error) => {
          console.warn(
            `Initial play failed, will try on user interaction: ${error}`
          );
        });
      }
    }
  };

  return (
    <div className="h-screen w-full bg-[#F9F9F9] flex flex-col justify-center items-center p-4 pb-24">
      <div className="relative flex-shrink-0 flex items-center justify-center">
        {/* iPhone Frame */}
        <div
          className="relative flex items-center justify-center"
          style={{ height: `${phoneHeight}vh` }}
        >
          {/* Content container positioned with screen dimensions */}
          <div
            ref={containerRef}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto hide-scrollbar bg-black font-['Inter'] ${
              snapEnabled ? "snap-y snap-mandatory scroll-pt-0" : ""
            }`}
            style={{
              height: `${phoneHeight * (screenHeight / 100)}vh`,
              width: `${phoneHeight * (screenWidth / 100) * 0.462}vh`, // iPhone aspect ratio (375/812)
              borderRadius: `${cornerRadius}px`,
              scrollPaddingTop: "0px",
              scrollPaddingBottom: "0px",
              scrollSnapType: snapEnabled ? "y mandatory" : "none",
              scrollMargin: "0px",
              scrollMarginTop: "0px",
            }}
          >
            {/* Continuous scroll feed */}
            <div className="flex flex-col">
              {screens.map((screen) => (
                <div
                  key={screen.id}
                  data-screen-id={screen.id}
                  className={`relative flex flex-col items-center justify-end text-white ${
                    snapEnabled ? "snap-start snap-always" : ""
                  }`}
                  style={{
                    height: snapEnabled
                      ? `${phoneHeight * (screenHeight / 100)}vh`
                      : `calc(${phoneHeight * (screenHeight / 100)}vh - 4rem)`,
                    minHeight: snapEnabled
                      ? `${phoneHeight * (screenHeight / 100)}vh`
                      : "auto",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {/* Video Background - With improved attributes */}
                  {screen.id >= 1 && screen.id <= 5 ? (
                    <video
                      ref={(el) => setupVideoRef(el, screen.id)}
                      className="absolute inset-0 w-full h-full object-cover z-0"
                      loop
                      playsInline
                      preload="auto"
                      muted={false}
                      controls={false}
                      src={getVideoSource(screen.id)}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-black z-0"></div>
                  )}

                  {/* Play/Pause Overlay Container - Only for videos */}
                  {screen.id >= 1 && screen.id <= 5 && (
                    <div
                      className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlayPause(screen.id);
                      }}
                    >
                      {/* Play button visual removed as requested */}
                    </div>
                  )}

                  {/* User info at bottom */}
                  <div
                    className="absolute left-4 max-w-[70%] z-10"
                    style={{ bottom: `${bottomSpacing}px` }}
                  >
                    <div className="font-bold text-white text-sm">Cursor</div>
                    <div className="text-xs text-white/90 truncate">
                      This is done in a work trial
                    </div>
                    <div className="text-xs text-white/80 mt-1 flex items-center">
                      <MapPin size={12} className="mr-1" />
                      <span>Palo Alto</span>
                    </div>
                  </div>

                  {/* TikTok UI Elements */}
                  <div
                    className="absolute right-3 flex flex-col items-center gap-3 z-10"
                    style={{ bottom: `${bottomSpacing}px` }}
                  >
                    {/* Cursor icon above the like button */}
                    <div className="mb-1">
                      <div className="h-7 w-7 flex items-center justify-center rounded-full overflow-hidden bg-white">
                        <Image
                          src="/Overall/corsor ICON.png"
                          alt="Cursor Logo"
                          width={18}
                          height={18}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <button
                        className="p-1 hover:scale-110 transition-transform"
                        onClick={(e) => {
                          e.stopPropagation();
                          incrementCount(screen.id, "likes");
                        }}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            activeHearts[screen.id]
                              ? "fill-red-500 text-red-500"
                              : "fill-white"
                          }`}
                        />
                      </button>
                      <span className="text-xs mt-0.5">
                        {engagementCounts[screen.id]?.likes}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <button
                        className="p-1 hover:scale-110 transition-transform"
                        onClick={(e) => {
                          e.stopPropagation();
                          incrementCount(screen.id, "comments");
                        }}
                      >
                        <MessageCircle className="w-5 h-5 fill-white" />
                      </button>
                      <span className="text-xs mt-0.5">
                        {engagementCounts[screen.id]?.comments}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <button
                        className="p-1 hover:scale-110 transition-transform"
                        onClick={(e) => {
                          e.stopPropagation();
                          incrementCount(screen.id, "bookmarks");
                        }}
                      >
                        <Bookmark className="w-5 h-5 fill-white" />
                      </button>
                      <span className="text-xs mt-0.5">
                        {engagementCounts[screen.id]?.bookmarks}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <button className="p-1 hover:scale-110 transition-transform">
                        <Share className="w-5 h-5" />
                      </button>
                      <span className="text-xs mt-0.5">Share</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Navigation Bar */}
            <div className="sticky bottom-0 left-0 right-0 bg-black pt-2 pb-4 z-30">
              <Image
                src="/TikTok/bottom.jpg"
                alt="Bottom Navigation"
                width={375}
                height={80}
                className="w-full"
              />
            </div>
          </div>

          {/* iPhone Frame overlaying content */}
          <Image
            src="/TikTok/iPhone 16 - Black - Portrait.png"
            alt="iPhone Frame"
            width={375}
            height={812}
            className="h-full w-auto z-20 pointer-events-none"
            priority
          />
        </div>
      </div>

      {/* Controls Panel */}
      {showControls && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-4 rounded-lg shadow-lg z-20 w-64">
          <h3 className="font-semibold mb-4">Screen Adjustment</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Phone Height ({phoneHeight}vh)
              </label>
              <input
                type="range"
                min="60"
                max="90"
                value={phoneHeight}
                onChange={(e) => setPhoneHeight(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Screen Width ({screenWidth}%)
              </label>
              <input
                type="range"
                min="50"
                max="100"
                value={screenWidth}
                onChange={(e) => setScreenWidth(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Screen Height ({screenHeight}%)
              </label>
              <input
                type="range"
                min="50"
                max="100"
                value={screenHeight}
                onChange={(e) => setScreenHeight(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Corner Radius ({cornerRadius}px)
              </label>
              <input
                type="range"
                min="0"
                max="60"
                step="1"
                value={cornerRadius}
                onChange={(e) => setCornerRadius(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Bottom Spacing ({bottomSpacing}px)
              </label>
              <input
                type="range"
                min="0"
                max="200"
                step="1"
                value={bottomSpacing}
                onChange={(e) => setBottomSpacing(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-600">Snap to Screens</label>
              <div
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                  snapEnabled ? "bg-blue-500" : "bg-gray-300"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSnapEnabled((prev) => !prev);
                }}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    snapEnabled ? "translate-x-6" : ""
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-600">Show Content Text</label>
              <div
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                  showContent ? "bg-blue-500" : "bg-gray-300"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowContent((prev) => !prev);
                }}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    showContent ? "translate-x-6" : ""
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
