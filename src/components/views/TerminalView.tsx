"use client";

import React from "react";
import { useView } from "@/contexts/ViewContext";
import {
  TerminalStep1,
  TerminalStep2,
  TerminalStep3,
  TerminalStep4,
} from "./TerminalStepViews";

export default function TerminalView() {
  const { buildStep } = useView();

  // Render the appropriate step based on buildStep
  switch (buildStep) {
    case 1:
      return <TerminalStep1 />;
    case 2:
      return <TerminalStep2 />;
    case 3:
      return <TerminalStep3 />;
    case 4:
      return <TerminalStep4 />;
    default:
      return <TerminalStep1 />;
  }
}
