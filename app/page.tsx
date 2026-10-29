"use client";

import IntroScreen from "@/components/intro-screen";

export default function BackgroundVideo() {
  return (
    <div className="fixed inset-0 isolate overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/IMG_0690.jpg"
        className="absolute inset-0 h-full w-full object-cover object-center"
      >
        <source src="/vid/bg.mp4" type="video/mp4" />
      </video>

      <IntroScreen />
    </div>
  );
}