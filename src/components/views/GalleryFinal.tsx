"use client";

import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import {
  Text,
  OrbitControls,
  PerspectiveCamera,
  useVideoTexture,
  Environment,
  AccumulativeShadows,
  RandomizedLight,
  SoftShadows,
} from "@react-three/drei";
import { useView } from "@/contexts/ViewContext";

// Define font URLs - relative to the public directory
const FONT_BOLD = "/fonts/GT-America-Standard-Bold-Trial.otf";
const FONT_REGULAR = "/fonts/GT-America-Standard-Regular-Trial.otf";
const LETTER_SPACING = -0.05; // -5% letter spacing for tight and nice look

// Cursor content data
const content = {
  title: "Cursor",
  subtitle: "Make the thing you want to make, faster",
  tagline: "for noobs",
  sections: [
    {
      step: "01",
      title: "Type Your Idea, See It in Action",
      description:
        "Write a quick description of your vision and watch Cursor transform it into a functional demo in moments. No need to wrestle with coding syntax or complex frameworks—our AI handles the heavy lifting so you can focus on creativity and results.",
      video: "/Gallery/wall1.mp4",
    },
    {
      step: "02",
      title: "Refine Your Project with an AI Engineer",
      description:
        "Need to tweak layouts, add features, or optimize performance? Cursor's AI works alongside you like a seasoned developer, helping refine your software every step of the way. Iterate and improve easily, one prompt at a time.",
      video: "/Gallery/wall2.mp4",
    },
    {
      step: "03",
      title: "Move Fast Without Compromising Quality",
      description:
        "When you can build so quickly, you're free to explore new ideas for the fun of it. Test out different approaches, pivot on a whim, and keep every project polished. The speed and quality let you push creative boundaries without ever feeling stuck.",
      video: "/Gallery/wall3.mp4",
    },
    {
      step: "04",
      title: "Scale to Pro Anytime",
      description:
        "Cursor isn't just for quick demos—it's engineered for serious growth. When you're ready to level up, dive deeper into advanced features, robust integrations, and pro-level tools. In no time, you'll have a professional-grade product built on a strong foundation.",
      video: "/Gallery/wall4.mp4",
    },
  ],
  cta: "Download for MacOS",
};

// Gradient texture generator
const createGradientTexture = (colorA: string, colorB: string) => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;

  const context = canvas.getContext("2d");
  if (!context) return new THREE.Texture();

  const gradient = context.createLinearGradient(0, 0, 512, 512);
  gradient.addColorStop(0, colorA);
  gradient.addColorStop(1, colorB);

  context.fillStyle = gradient;
  context.fillRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

// Create a fallback texture when video loading fails
const createFallbackTexture = (color: string = "#3b82f6") => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 768; // 3:2 aspect ratio

  const context = canvas.getContext("2d");
  if (!context) return new THREE.Texture();

  // Fill background
  context.fillStyle = color;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Add some visual interest - diagonal stripes
  context.strokeStyle = "#ffffff20"; // semi-transparent white
  context.lineWidth = 40;
  for (let i = -canvas.width; i < canvas.width * 2; i += 60) {
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i + canvas.height, canvas.height);
    context.stroke();
  }

  // Add a "Video Unavailable" message
  context.fillStyle = "#ffffff";
  context.font = "bold 48px Arial";
  context.textAlign = "center";
  context.fillText("Video Loading...", canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

// Simplified TextWithFallback component
type TextWithFallbackProps = React.ComponentProps<typeof Text>;

const TextWithFallback: React.FC<TextWithFallbackProps> = (props) => {
  // Use GT America fonts with proper fallbacks and tight letter spacing
  return (
    <Text
      font={props.font || FONT_REGULAR}
      letterSpacing={LETTER_SPACING}
      {...props}
    />
  );
};

// Scene setup component with shadow configuration
function SceneSetup() {
  return (
    <>
      <SoftShadows size={25} samples={16} focus={0.5} />
    </>
  );
}

// Mouse-controlled light component that rotates directional light
function MouseLight({ intensity = 2, distance = 10 }) {
  const light = useRef<THREE.DirectionalLight>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (light.current) {
      // Map mouse position to light angle
      const angleX = (mouse.x * Math.PI) / 2; // -π/2 to π/2 based on mouse.x (-1 to 1)
      const angleY = (mouse.y * Math.PI) / 4; // -π/4 to π/4 based on mouse.y (-1 to 1)

      // Calculate new light position - maintaining fixed distance but changing angle
      const x = Math.sin(angleX) * distance;
      const y = Math.max(5, 8 + angleY * 3); // Keep light above scene with less vertical movement
      const z = Math.cos(angleX) * distance;

      // Update light position
      light.current.position.set(x, y, z);
      // Make light look at center
      light.current.lookAt(0, 0, 0);
    }
  });

  return (
    <directionalLight
      ref={light}
      color="#ffffff"
      intensity={intensity}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-camera-far={50}
      shadow-camera-left={-10}
      shadow-camera-right={10}
      shadow-camera-top={10}
      shadow-camera-bottom={-10}
    />
  );
}

// Simple animated poster component with video texture
interface AnimatedPosterProps {
  position: [number, number, number];
  color: string;
  title: string;
  description: string;
  stepNumber: string;
  videoUrl: string;
  wallDistance?: number;
  flipVideoX?: boolean;
  flipVideoY?: boolean;
}

function AnimatedPoster({
  position,
  color,
  title,
  description,
  stepNumber,
  videoUrl,
  wallDistance = 0,
  flipVideoX = false,
  flipVideoY = true,
}: AnimatedPosterProps) {
  const mesh = useRef<THREE.Group>(null);
  const [videoElement] = useState(() => {
    if (typeof window !== "undefined") {
      const video = document.createElement("video");

      // Set basic properties
      video.src = videoUrl;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = "anonymous";
      video.autoplay = true;

      // Force play on creation - this is important for Safari
      video.play().catch((e) => console.warn("Initial video play:", e));

      return video;
    }
    return null;
  });

  // Basic video playback with minimal error handling
  useEffect(() => {
    if (!videoElement) return;

    // Simple play function
    const playVideo = () => {
      if (videoElement.paused) {
        videoElement.play().catch((e) => console.debug("Video play error:", e));
      }
    };

    // Retry playback periodically
    const intervalId = setInterval(playVideo, 2000);

    // Initial play attempt
    playVideo();

    return () => {
      clearInterval(intervalId);
      videoElement.pause();
    };
  }, [videoElement]);

  const [videoTexture, setVideoTexture] = useState(() => {
    if (videoElement) {
      const texture = new THREE.VideoTexture(videoElement);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = false;
      texture.flipY = false;
      return texture;
    }
    return null;
  });

  // Update video texture flip orientation
  useEffect(() => {
    if (videoTexture) {
      if (flipVideoY !== undefined) {
        videoTexture.flipY = flipVideoY;
      }

      if (flipVideoX) {
        videoTexture.repeat.x = -1;
        videoTexture.offset.x = 1;
      } else {
        videoTexture.repeat.x = 1;
        videoTexture.offset.x = 0;
      }

      videoTexture.needsUpdate = true;
    }
  }, [videoTexture, flipVideoX, flipVideoY]);

  useFrame(({ clock }) => {
    if (mesh.current) {
      // Gentle floating movement - subtle
      mesh.current.position.y =
        position[1] + Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
      // Set Z position based on wallDistance
      mesh.current.position.z = wallDistance;
      // Subtle rotation
      mesh.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.01;
    }
  });

  return (
    <group ref={mesh} position={[position[0], position[1], wallDistance]}>
      {/* Black border frame */}
      <mesh position={[0, 0, -0.02]} castShadow receiveShadow>
        <boxGeometry args={[2.1, 3.1, 0.05]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Inset area for the poster (slightly recessed) */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[2, 3, 0.02]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* Video texture or fallback color (inset within the frame) */}
      <mesh position={[0, 0, 0.015]} castShadow>
        <boxGeometry args={[1.9, 2.9, 0.01]} />
        {videoTexture ? (
          <meshBasicMaterial
            map={videoTexture}
            toneMapped={false}
            color="#ffffff"
          />
        ) : (
          <meshStandardMaterial color={color} />
        )}
      </mesh>

      {/* Step number circle */}
      <mesh position={[-0.7, 1.2, 0.06]} castShadow>
        <circleGeometry args={[0.2, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Step number */}
      <Text
        position={[-0.7, 1.2, 0.1]}
        fontSize={0.15}
        color="black"
        anchorX="center"
        anchorY="middle"
        font={FONT_BOLD}
        letterSpacing={LETTER_SPACING}
      >
        {stepNumber}
      </Text>

      {/* Title */}
      <Text
        position={[0, -1.2, 0.06]}
        fontSize={0.15}
        color="white"
        maxWidth={1.8}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        font={FONT_BOLD}
        letterSpacing={LETTER_SPACING}
      >
        {title}
      </Text>
    </group>
  );
}

// Interactive poster component that wraps AnimatedPoster with interactivity
interface InteractivePosterProps extends AnimatedPosterProps {
  index: number;
  isHovered: boolean;
  setHoveredPoster: (index: number | null) => void;
  onPosterClick: (index: number) => void;
}

function InteractivePoster({
  index,
  isHovered,
  setHoveredPoster,
  onPosterClick,
  ...posterProps
}: InteractivePosterProps) {
  const group = useRef<THREE.Group>(null);

  // Z-movement on hover (toward camera) instead of scaling
  useFrame(() => {
    if (!group.current) return;

    // Default z position is 0, move forward when hovered
    const targetZ = isHovered ? 0.5 : 0;

    // Smoothly animate z position
    group.current.position.z = THREE.MathUtils.lerp(
      group.current.position.z,
      targetZ,
      0.1
    );
  });

  // Handle click with pointer event
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    // Log click for debugging
    console.log(`Poster ${index} clicked`);
    // Call the click handler with a slight delay to ensure it's processed
    setTimeout(() => onPosterClick(index), 10);
  };

  return (
    <group
      ref={group}
      onPointerOver={() => setHoveredPoster(index)}
      onPointerOut={() => setHoveredPoster(null)}
      onClick={handleClick}
    >
      <AnimatedPoster {...posterProps} />
    </group>
  );
}

// Control panel component
interface ControlPanelProps {
  settings: {
    ambientLight: number;
    directionalLight: number;
    mouseLight: number;
    mouseLightDistance: number;
    posterSpacing: number;
    posterWallDistance: number;
    wallColor: string;
    flipVideoX: boolean;
    flipVideoY: boolean;
  };
  onSettingsChange: (newSettings: any) => void;
}

function ControlPanel({ settings, onSettingsChange }: ControlPanelProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";

    onSettingsChange({
      ...settings,
      [name]: isCheckbox
        ? (e.target as HTMLInputElement).checked
        : type === "number" || type === "range"
        ? parseFloat(value)
        : value,
    });
  };

  return (
    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-4 rounded-lg shadow-lg z-50 w-64">
      <h3 className="font-semibold mb-4">Scene Controls</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Ambient Light ({settings.ambientLight.toFixed(1)})
          </label>
          <input
            type="range"
            name="ambientLight"
            min="0"
            max="1"
            step="0.1"
            value={settings.ambientLight}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Directional Light ({settings.directionalLight.toFixed(1)})
          </label>
          <input
            type="range"
            name="directionalLight"
            min="0"
            max="2"
            step="0.1"
            value={settings.directionalLight}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Mouse Light ({settings.mouseLight.toFixed(1)})
          </label>
          <input
            type="range"
            name="mouseLight"
            min="0"
            max="5"
            step="0.1"
            value={settings.mouseLight}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Mouse Light Distance ({settings.mouseLightDistance})
          </label>
          <input
            type="range"
            name="mouseLightDistance"
            min="5"
            max="20"
            step="1"
            value={settings.mouseLightDistance}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Poster Spacing ({settings.posterSpacing.toFixed(1)})
          </label>
          <input
            type="range"
            name="posterSpacing"
            min="2"
            max="8"
            step="0.1"
            value={settings.posterSpacing}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Wall Distance ({settings.posterWallDistance.toFixed(1)})
          </label>
          <input
            type="range"
            name="posterWallDistance"
            min="0"
            max="2"
            step="0.1"
            value={settings.posterWallDistance}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Wall Color</label>
          <input
            type="color"
            name="wallColor"
            value={settings.wallColor}
            onChange={handleChange}
            className="w-full h-8"
          />
        </div>

        <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-gray-200">
          <h4 className="font-medium text-sm">Video Orientation</h4>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="flipVideoX"
              name="flipVideoX"
              checked={settings.flipVideoX}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="flipVideoX" className="text-sm">
              Flip Horizontally
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="flipVideoY"
              name="flipVideoY"
              checked={settings.flipVideoY}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="flipVideoY" className="text-sm">
              Flip Vertically
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component
export default function GalleryFinal() {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredPoster, setHoveredPoster] = useState<number | null>(null);
  const [selectedPoster, setSelectedPoster] = useState<number | null>(null);
  const { showControls } = useView();

  // Scene settings
  const [settings, setSettings] = useState({
    ambientLight: 0.4,
    directionalLight: 2.0,
    mouseLight: 5.0,
    mouseLightDistance: 13,
    posterSpacing: 2.5,
    posterWallDistance: 0,
    wallColor: "#FFFFFF",
    flipVideoX: false,
    flipVideoY: true,
  });

  // Only render on client side
  useEffect(() => {
    setIsMounted(true);
    console.log("GalleryFinal mounted");
  }, []);

  // Add click listener to close popup when clicking outside
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (selectedPoster !== null) {
        const popupContent = document.querySelector(".popup-content");
        if (popupContent && !popupContent.contains(e.target as Node)) {
          handleClosePopup();
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [selectedPoster]);

  // Handle poster click to show popup
  const handlePosterClick = (index: number) => {
    console.log(`Opening popup for poster ${index}`);
    setSelectedPoster(index);
  };

  // Close popup when clicking outside
  const handleClosePopup = () => {
    console.log("Closing popup");
    setSelectedPoster(null);
  };

  if (!isMounted) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-yellow-400">
        <div className="text-xl">Loading 3D Gallery...</div>
      </div>
    );
  }

  // Calculate poster positions based on spacing
  const getPosition = (index: number): [number, number, number] => {
    const offset = (settings.posterSpacing * (content.sections.length - 1)) / 2;
    return [index * settings.posterSpacing - offset, 0, 0];
  };

  return (
    <div className="h-screen w-full bg-yellow-400">
      <div className="absolute top-8 left-8 z-10">
        <h1
          className="text-5xl font-bold text-black mb-2"
          style={{ letterSpacing: "-0.05em" }}
        >
          {content.title}
        </h1>
        <p
          className="text-xl text-gray-800"
          style={{ letterSpacing: "-0.05em" }}
        >
          {content.subtitle}
        </p>
        <p
          className="text-sm italic text-gray-700 mt-1"
          style={{ letterSpacing: "-0.05em" }}
        >
          {content.tagline}
        </p>
      </div>

      <div className="absolute top-8 right-8 z-10">
        <a
          href="https://www.cursor.com/downloads"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-900 transition-colors">
            {content.cta}
          </button>
        </a>
      </div>

      {/* Scene Controls - Only visible when toggled */}
      {showControls && (
        <ControlPanel settings={settings} onSettingsChange={setSettings} />
      )}

      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        camera={{ position: [0, 0, 10], fov: 50 }}
        onClick={(e: any) => {
          // If we didn't click directly on a poster, close any open popup
          if (e && !e.stopped) {
            handleClosePopup();
          }
        }}
      >
        {/* Scene setup with shadows */}
        <SceneSetup />

        {/* Lights */}
        <ambientLight intensity={settings.ambientLight} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={settings.directionalLight}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0001}
        />
        <directionalLight position={[-10, 10, 5]} intensity={0.3} />
        <directionalLight position={[0, -10, 0]} intensity={0.2} />

        {/* HDRI environment lighting */}
        <Environment preset="sunset" />

        {/* Wall with shadow catcher */}
        <mesh position={[0, 0, -0.05]} receiveShadow>
          <planeGeometry args={[30, 15]} />
          <meshStandardMaterial
            color={settings.wallColor}
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>

        {/* Posters arranged horizontally */}
        {content.sections.map((section, index) => (
          <InteractivePoster
            key={index}
            index={index}
            position={getPosition(index)}
            color={
              index === 0
                ? "#3b82f6"
                : index === 1
                ? "#10b981"
                : index === 2
                ? "#ef4444"
                : "#f97316"
            }
            title={section.title}
            description={section.description}
            stepNumber={section.step}
            videoUrl={section.video}
            wallDistance={settings.posterWallDistance}
            flipVideoX={settings.flipVideoX}
            flipVideoY={settings.flipVideoY}
            isHovered={hoveredPoster === index}
            setHoveredPoster={setHoveredPoster}
            onPosterClick={handlePosterClick}
          />
        ))}

        {/* Mouse-controlled lighting */}
        <MouseLight
          intensity={settings.mouseLight}
          distance={settings.mouseLightDistance}
        />

        {/* Camera controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
          maxDistance={15}
          minDistance={4}
          target={[0, 0, 0]}
        />
      </Canvas>

      {/* Content Popup */}
      {selectedPoster !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/60"
          style={{ backdropFilter: "blur(5px)" }}
          onClick={handleClosePopup}
        >
          <div
            className="popup-content bg-white relative rounded-lg shadow-2xl p-8 max-w-2xl max-h-[80vh] overflow-auto transform transition-all"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: "GT-America-Standard-Regular, sans-serif",
              letterSpacing: "-0.05em",
              animation: "popIn 0.3s ease-out forwards",
            }}
          >
            <button
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
              onClick={handleClosePopup}
            >
              ✕
            </button>

            <span className="inline-block px-3 py-1 mb-4 text-sm bg-black text-white rounded">
              {content.sections[selectedPoster].step}
            </span>

            <h2
              className="text-3xl font-bold mb-4"
              style={{
                fontFamily: "GT-America-Standard-Bold, sans-serif",
                letterSpacing: "-0.05em",
              }}
            >
              {content.sections[selectedPoster].title}
            </h2>

            <p className="text-lg leading-relaxed mb-6">
              {content.sections[selectedPoster].description}
            </p>

            <div className="border-t border-gray-200 pt-4 mt-8">
              <a
                href="https://www.cursor.com/downloads"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-black text-white inline-block rounded-md hover:bg-gray-900 transition-colors"
              >
                {content.cta}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Add popup animation styles */}
      <style jsx global>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
