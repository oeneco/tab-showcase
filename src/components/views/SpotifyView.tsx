"use client";

import React from "react";
import { useView } from "@/contexts/ViewContext";
import { SpotifyStep1, SpotifyStep2, SpotifyStep3 } from "./SpotifyStepViews";
// import SpotifyFinal from "./SpotifyFinal";
import SpotifyFinalFixed from "./SpotifyFinalFixed";

export default function SpotifyView() {
  const { buildStep } = useView();

  // Add some console logging to help with debugging
  console.log("Current Spotify build step:", buildStep);

  // Render the appropriate step based on buildStep
  switch (buildStep) {
    case 1:
      return <SpotifyStep1 />;
    case 2:
      return <SpotifyStep2 />;
    case 3:
      return <SpotifyStep3 />;
    case 4:
      return <SpotifyFinalFixed />;
    default:
      return <SpotifyStep1 />;
  }
}
