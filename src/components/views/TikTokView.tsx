"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share,
  Search,
  PlusCircle,
  User,
  MapPin,
} from "lucide-react";
import { useView } from "@/contexts/ViewContext";
import {
  TikTokStep1,
  TikTokStep2,
  TikTokStep3,
  TikTokStep4,
} from "./TikTokStepViews";

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

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

const parseNumber = (str: string): number => {
  if (str.endsWith("M")) {
    return parseFloat(str.replace("M", "")) * 1000000;
  } else if (str.endsWith("K")) {
    return parseFloat(str.replace("K", "")) * 1000;
  }
  return parseInt(str);
};

export default function TikTokView() {
  const { buildStep } = useView();

  // Render the appropriate step based on buildStep
  switch (buildStep) {
    case 1:
      return <TikTokStep1 />;
    case 2:
      return <TikTokStep2 />;
    case 3:
      return <TikTokStep3 />;
    case 4:
      return <TikTokStep4 />;
    default:
      return <TikTokStep1 />;
  }
}
