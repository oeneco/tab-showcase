"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ViewType } from "@/contexts/ViewContext";

interface ControlsOverlayProps {
  showControls: boolean;
  currentView: ViewType;
}

export default function ControlsOverlay({
  showControls,
  currentView,
}: ControlsOverlayProps) {
  // Each view will now just show basic navigation controls
  // For the 3D view, the scene will display its own controls
  const viewControls = {
    tiktok: [
      { key: "Tab", description: "Next step" },
      { key: "Esc", description: "Previous step" },
      { key: "←", description: "Previous view" },
      { key: "→", description: "Next view" },
    ],
    spotify: [
      { key: "Tab", description: "Next step" },
      { key: "Esc", description: "Previous step" },
      { key: "←", description: "Previous view" },
      { key: "→", description: "Next view" },
      { key: "Space", description: "Play/Pause" },
      { key: "N", description: "Next track" },
      { key: "P", description: "Previous track" },
    ],
    spreadsheet: [
      { key: "Tab", description: "Next step" },
      { key: "Esc", description: "Previous step" },
      { key: "←", description: "Previous view" },
      { key: "→", description: "Next view" },
      { key: "Enter", description: "Edit cell" },
      { key: "Arrow keys", description: "Navigate cells" },
    ],
    "3d": [
      { key: "Tab", description: "Next step" },
      { key: "Esc", description: "Previous step" },
      { key: "←", description: "Previous view" },
      { key: "→", description: "Next view" },
      // The actual 3D controls will be shown in the scene itself
    ],
    terminal: [
      { key: "Tab", description: "Next step" },
      { key: "Esc", description: "Previous step" },
      { key: "←", description: "Previous view" },
      { key: "→", description: "Next view" },
      { key: "Enter", description: "Execute command" },
      { key: "Ctrl+C", description: "Cancel command" },
    ],
  };

  const currentControls = viewControls[currentView];

  return (
    <AnimatePresence>
      {showControls && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-20 right-4 bg-black/80 text-white p-4 rounded-lg shadow-lg z-40"
          style={{ backdropFilter: "blur(5px)" }}
        >
          <h3
            className="text-lg font-medium mb-2 border-b pb-1"
            style={{ letterSpacing: "-0.05em" }}
          >
            Navigation Controls
          </h3>
          <ul className="space-y-2">
            {currentControls.map((control) => (
              <li key={control.key} className="flex items-center gap-3">
                <span className="bg-white/20 px-2 py-1 rounded text-sm font-mono">
                  {control.key}
                </span>
                <span style={{ letterSpacing: "-0.05em" }}>
                  {control.description}
                </span>
              </li>
            ))}
            {currentView !== "terminal" && (
              <li className="flex items-center gap-3 mt-4 pt-2 border-t">
                <span className="bg-white/20 px-2 py-1 rounded text-sm font-mono">
                  C
                </span>
                <span style={{ letterSpacing: "-0.05em" }}>
                  Toggle controls
                </span>
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
