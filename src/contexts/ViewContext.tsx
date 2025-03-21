"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

export type ViewType = "tiktok" | "spreadsheet" | "3d" | "terminal" | "spotify";
export type BuildStep = 1 | 2 | 3 | 4;

interface ViewContextType {
  currentView: ViewType;
  buildStep: BuildStep;
  nextView: () => void;
  previousView: () => void;
  nextBuildStep: () => void;
  previousBuildStep: () => void;
  showOnboarding: boolean;
  completeOnboarding: () => void;
  showControls: boolean;
  toggleControls: () => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

const VIEWS: ViewType[] = [
  "tiktok",
  "spotify",
  "spreadsheet",
  "3d",
  "terminal",
];

export function ViewProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<ViewType>("tiktok");
  const [buildStep, setBuildStep] = useState<BuildStep>(1);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>(false);

  const completeOnboarding = useCallback(() => {
    setShowOnboarding(false);
  }, []);

  const toggleControls = useCallback(() => {
    setShowControls((prev) => !prev);
  }, []);

  const nextView = useCallback(() => {
    setCurrentView((currentView) => {
      const currentIndex = VIEWS.indexOf(currentView);
      const nextIndex = (currentIndex + 1) % VIEWS.length;
      return VIEWS[nextIndex];
    });
  }, []);

  const previousView = useCallback(() => {
    setCurrentView((currentView) => {
      const currentIndex = VIEWS.indexOf(currentView);
      const previousIndex = (currentIndex - 1 + VIEWS.length) % VIEWS.length;
      return VIEWS[previousIndex];
    });
  }, []);

  const nextBuildStep = useCallback(() => {
    setBuildStep((prev) => (prev < 4 ? ((prev + 1) as BuildStep) : prev));
  }, []);

  const previousBuildStep = useCallback(() => {
    setBuildStep((prev) => (prev > 1 ? ((prev - 1) as BuildStep) : prev));
  }, []);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      // Handle c key for controls, but not in terminal view
      if (
        (event.key === "c" || event.key === "C") &&
        currentView !== "terminal"
      ) {
        event.preventDefault();
        toggleControls();
        return;
      }

      // Handle tab key for onboarding
      if (showOnboarding && event.key === "Tab") {
        event.preventDefault();
        completeOnboarding();
        return;
      }

      // Only process other keys if not in onboarding
      if (!showOnboarding) {
        if (event.key === "Tab") {
          event.preventDefault();
          nextBuildStep();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          nextView();
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          previousView();
        } else if (event.key === "Escape") {
          event.preventDefault();
          previousBuildStep();
        }
      }
    },
    [
      showOnboarding,
      currentView,
      completeOnboarding,
      nextBuildStep,
      nextView,
      previousView,
      previousBuildStep,
      toggleControls,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return (
    <ViewContext.Provider
      value={{
        currentView,
        buildStep,
        nextView,
        previousView,
        nextBuildStep,
        previousBuildStep,
        showOnboarding,
        completeOnboarding,
        showControls,
        toggleControls,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error("useView must be used within a ViewProvider");
  }
  return context;
}
