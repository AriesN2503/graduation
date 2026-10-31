"use client";

import { useEffect, useState } from "react";

import IntroScreen from "@/components/intro-screen/intro-screen";

interface InvitationExperienceProps {
  guestSlug?: string;
  guestName?: string;
}

const DEFAULT_GUEST_NAME = "Bạn thân mến";
const GUEST_SESSION_KEY = "graduation-guest-name";

export default function InvitationExperience({
  guestSlug,
  guestName: resolvedGuestName,
}: InvitationExperienceProps) {
  const [savedGuestName] = useState(() => {
    if (typeof window === "undefined") {
      return DEFAULT_GUEST_NAME;
    }

    try {
      return window.sessionStorage.getItem(GUEST_SESSION_KEY) || DEFAULT_GUEST_NAME;
    } catch (error) {
      console.error("Unable to restore the invitation guest for this session.", error);
      return DEFAULT_GUEST_NAME;
    }
  });
  const guestName = resolvedGuestName ?? savedGuestName;

  useEffect(() => {
    if (!guestSlug || !resolvedGuestName) {
      return;
    }

    try {
      window.sessionStorage.setItem(GUEST_SESSION_KEY, resolvedGuestName);
    } catch (error) {
      console.error("Unable to save the invitation guest for this session.", error);
      return;
    }

    window.history.replaceState(window.history.state, "", "/");
  }, [guestSlug, resolvedGuestName]);

  return (
    <div className="fixed inset-0 isolate overflow-hidden bg-[#211b17]">
      <IntroScreen guestName={guestName} />
    </div>
  );
}
