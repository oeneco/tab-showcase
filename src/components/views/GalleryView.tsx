"use client";

import React from "react";
import { useView } from "@/contexts/ViewContext";
import {
  GalleryStep1,
  GalleryStep2,
  GalleryStep3,
  GalleryStep4,
} from "./GalleryStepViews";

export default function GalleryView() {
  const { buildStep } = useView();

  // Render the appropriate step based on buildStep
  switch (buildStep) {
    case 1:
      return <GalleryStep1 />;
    case 2:
      return <GalleryStep2 />;
    case 3:
      return <GalleryStep3 />;
    case 4:
      return <GalleryStep4 />;
    default:
      return <GalleryStep1 />;
  }
}
