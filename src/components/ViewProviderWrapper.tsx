"use client";

import React from "react";
import { ViewProvider } from "@/contexts/ViewContext";

export default function ViewProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ViewProvider>{children}</ViewProvider>;
}
