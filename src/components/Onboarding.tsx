"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface OnboardingProps {
  showOnboarding: boolean;
  completeOnboarding: () => void;
}

export default function Onboarding({
  showOnboarding,
  completeOnboarding,
}: OnboardingProps) {
  const [showContentPopup, setShowContentPopup] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    if (!showOnboarding) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "Tab" ||
        e.key === "Escape" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight"
      ) {
        e.preventDefault();
        setActiveKey(e.key);
      }

      if (e.key === "Tab") {
        completeOnboarding();
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
  }, [showOnboarding, completeOnboarding]);

  if (!showOnboarding) return null;

  const toggleContentPopup = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContentPopup(!showContentPopup);
  };

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

  return (
    <AnimatePresence>
      {showOnboarding && (
        <motion.div
          className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="absolute top-4 w-full text-center text-[16vw] font-bold whitespace-nowrap leading-[0.8]"
            style={{
              letterSpacing: "-0.05em",
              fontFamily: "'GT America Regular', sans-serif",
            }}
          >
            Cursor Show
          </div>

          <div className="flex flex-col items-center justify-center text-center max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-32"
            >
              <h1
                className="text-2xl text-gray-500 mb-12 font-normal max-w-md mx-auto opacity-40"
                style={{
                  letterSpacing: "-0.01em",
                  fontFamily: "'GT America Regular', sans-serif",
                }}
              >
                What if you can feel the power of cursor,
                <br />
                without even downloading cursor?
              </h1>

              <div
                className="text-2xl text-gray-500 mb-4 opacity-40 max-w-md mx-auto"
                style={{
                  letterSpacing: "-0.01em",
                  fontFamily: "'GT America Regular', sans-serif",
                }}
              >
                The following experiences are ways to experience the{" "}
                <span
                  className="underline cursor-pointer hover:text-gray-700 transition-colors"
                  onClick={toggleContentPopup}
                >
                  same story
                </span>
                .
              </div>
            </motion.div>
          </div>

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
                <kbd className={getKeyClassName("tab")}>tab</kbd>
                <span>to start</span>
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

          {/* Content Popup */}
          <AnimatePresence>
            {showContentPopup && (
              <motion.div
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowContentPopup(false)}
              >
                <motion.div
                  className="bg-white text-black p-8 rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                  style={{
                    fontFamily:
                      "'GT America Regular', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                    letterSpacing: "-0.05em",
                  }}
                >
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
                    onClick={() => setShowContentPopup(false)}
                  >
                    ✕
                  </button>

                  <div className="text-3xl font-bold mb-4">Cursor</div>

                  <div className="text-xl font-bold mb-2">
                    Make the thing you want to make, faster
                  </div>

                  <div className="italic mb-6 text-gray-600">for noobs</div>

                  <div className="space-y-6">
                    <div>
                      <div className="text-lg font-bold">
                        Type Your Idea, See It in Action
                      </div>
                      <div className="mt-1">
                        <strong>01</strong> Write a quick description of your
                        vision and watch Cursor transform it into a functional
                        demo in moments. No need to wrestle with coding syntax
                        or complex frameworks—our AI handles the heavy lifting
                        so you can focus on creativity and results.
                      </div>
                    </div>

                    <div>
                      <div className="text-lg font-bold">
                        Refine Your Project with an AI Engineer
                      </div>
                      <div className="mt-1">
                        <strong>02</strong> Need to tweak layouts, add features,
                        or optimize performance? Cursor's AI works alongside you
                        like a seasoned developer, helping refine your software
                        every step of the way. Iterate and improve easily, one
                        prompt at a time.
                      </div>
                    </div>

                    <div>
                      <div className="text-lg font-bold">
                        Move Fast Without Compromising Quality
                      </div>
                      <div className="mt-1">
                        <strong>03</strong> When you can build so quickly,
                        you're free to explore new ideas for the fun of it. Test
                        out different approaches, pivot on a whim, and keep
                        every project polished. The speed and quality let you
                        push creative boundaries without ever feeling stuck.
                      </div>
                    </div>

                    <div>
                      <div className="text-lg font-bold">
                        Scale to Pro Anytime
                      </div>
                      <div className="mt-1">
                        <strong>04</strong> Cursor isn't just for quick
                        demos—it's engineered for serious growth. When you're
                        ready to level up, dive deeper into advanced features,
                        robust integrations, and pro-level tools. In no time,
                        you'll have a professional-grade product built on a
                        strong foundation.
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <a
                      href="#"
                      className="px-5 py-2.5 bg-black text-white rounded-md inline-block hover:bg-gray-800 transition-colors"
                    >
                      Download for MacOS
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
