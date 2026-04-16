"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export function VideoHero({
  videoUrl,
  fallbackImageUrl,
  children,
}: {
  videoUrl: string;
  fallbackImageUrl?: string | null;
  children: React.ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video layer */}
      {!videoFailed && (
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setVideoFailed(true)}
        />
      )}

      {/* Fallback image */}
      {(videoFailed || !videoUrl) && fallbackImageUrl && (
        <Image
          src={fallbackImageUrl}
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
      )}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/60" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
