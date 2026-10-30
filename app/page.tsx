"use client";

import IntroScreen from "@/components/intro-screen/intro-screen";

export default function BackgroundVideo() {
  return (
    <div className="fixed inset-0 isolate overflow-hidden bg-[#211b17]">
      <IntroScreen />
    </div>
  );
}