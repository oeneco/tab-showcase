"use client";

import React from "react";
import { useView } from "@/contexts/ViewContext";
import {
  SpreadsheetStep1,
  SpreadsheetStep2,
  SpreadsheetStep3,
  SpreadsheetStep4,
} from "./SpreadsheetStepViews";

export default function SpreadsheetView() {
  const { buildStep } = useView();

  // Render the appropriate step based on buildStep
  switch (buildStep) {
    case 1:
      return <SpreadsheetStep1 />;
    case 2:
      return <SpreadsheetStep2 />;
    case 3:
      return <SpreadsheetStep3 />;
    case 4:
      return <SpreadsheetStep4 />;
    default:
      return <SpreadsheetStep1 />;
  }
}
