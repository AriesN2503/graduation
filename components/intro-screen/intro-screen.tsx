"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";

import Invitation from "@/components/invitation/invitation";
import AudioIntroScreen from "@/components/intro-screen/components/audio-intro-screen";
import OpeningScreen from "@/components/intro-screen/components/opening-screen";
import { INTRO_TIMELINE } from "@/components/intro-screen/components/intro-timeline";

interface IntroScreenProps {
    onContinue?: () => void;
}

const VIDEO_READY_TIMEOUT_MS = 2500;

type ExperienceStage = "opening" | "starting" | "intro" | "transitioning" | "invitation";

export default function IntroScreen({
    onContinue,
}: IntroScreenProps) {
    const [stage, setStage] = useState<ExperienceStage>("opening");
    const [introReady, setIntroReady] = useState(false);
    const [isInvitationImageLoaded, setIsInvitationImageLoaded] = useState(false);
    const [hasInvitationImageError, setHasInvitationImageError] = useState(false);
    const [activePhraseIndex, setActivePhraseIndex] = useState(-1);
    const [isVideoReady, setIsVideoReady] = useState(false);
    const [hasVideoError, setHasVideoError] = useState(false);
    const [hasAudioError, setHasAudioError] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const isVideoReadyRef = useRef(false);
    const hasVideoErrorRef = useRef(false);
    const hasStartedRef = useRef(false);
    const introCompletedRef = useRef(false);
    const introHighWaterRef = useRef(0);
    const activePhraseIndexRef = useRef(-1);
    const shouldReduceMotion = useReducedMotion() ?? false;

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setIntroReady(true);
        }, 300);

        return () => window.clearTimeout(timer);
    }, []);

    const beginVideoTransition = useCallback(() => {
        if (introCompletedRef.current) {
            return;
        }

        introCompletedRef.current = true;
        setActivePhraseIndex(-1);
        activePhraseIndexRef.current = -1;
        setStage("transitioning");

        const video = videoRef.current;
        if (!video) {
            hasVideoErrorRef.current = true;
            setHasVideoError(true);
            setStage("invitation");
            return;
        }

        void video.play().catch(() => {
            hasVideoErrorRef.current = true;
            setHasVideoError(true);
            setStage("invitation");
        });
        if (isVideoReadyRef.current || hasVideoErrorRef.current) {
            setStage("invitation");
        }
    }, []);

    useEffect(() => {
        if (stage !== "intro") {
            return;
        }

        const audio = audioRef.current;
        if (!audio) {
            return;
        }

        let animationFrame = 0;
        let isBuffering = false;
        const updateTimeline = (scheduleNextFrame = true) => {
            introHighWaterRef.current = Math.max(
                introHighWaterRef.current,
                audio.currentTime
            );
            const playbackTime = introHighWaterRef.current;

            if (playbackTime >= INTRO_TIMELINE.totalDuration) {
                beginVideoTransition();
                return;
            }

            const nextPhraseIndex = INTRO_TIMELINE.phrases.findIndex(
                ({ start, duration }) =>
                    playbackTime >= start + INTRO_TIMELINE.phraseStartOffset &&
                    playbackTime < start + INTRO_TIMELINE.phraseStartOffset + duration
            );
            if (nextPhraseIndex !== activePhraseIndexRef.current) {
                activePhraseIndexRef.current = nextPhraseIndex;
                setActivePhraseIndex(nextPhraseIndex);
            }

            if (scheduleNextFrame && !audio.paused && !isBuffering) {
                animationFrame = window.requestAnimationFrame(() => updateTimeline());
            }
        };
        const resumeTimeline = () => {
            isBuffering = false;
            window.cancelAnimationFrame(animationFrame);
            updateTimeline();
        };
        const syncTimeline = () => {
            if (!isBuffering) {
                window.cancelAnimationFrame(animationFrame);
                updateTimeline();
            }
        };
        const stopTimeline = () => {
            isBuffering = true;
            window.cancelAnimationFrame(animationFrame);
            updateTimeline(false);
        };
        const pauseTimeline = () => {
            isBuffering = false;
            window.cancelAnimationFrame(animationFrame);
            updateTimeline(false);
        };

        audio.addEventListener("playing", resumeTimeline);
        audio.addEventListener("timeupdate", syncTimeline);
        audio.addEventListener("seeked", syncTimeline);
        audio.addEventListener("waiting", stopTimeline);
        audio.addEventListener("pause", pauseTimeline);
        if (!audio.paused) {
            resumeTimeline();
        }

        return () => {
            window.cancelAnimationFrame(animationFrame);
            audio.removeEventListener("playing", resumeTimeline);
            audio.removeEventListener("timeupdate", syncTimeline);
            audio.removeEventListener("seeked", syncTimeline);
            audio.removeEventListener("waiting", stopTimeline);
            audio.removeEventListener("pause", pauseTimeline);
        };
    }, [beginVideoTransition, stage]);

    useEffect(() => {
        if (stage !== "transitioning") {
            return;
        }

        const timeout = window.setTimeout(() => {
            setStage("invitation");
        }, VIDEO_READY_TIMEOUT_MS);

        return () => window.clearTimeout(timeout);
    }, [stage]);

    useEffect(() => {
        let isActive = true;
        const image = new window.Image();
        image.src = "/images/invitation.svg";

        image.decode().then(
            () => {
                if (!isActive) {
                    return;
                }

                if (image.naturalWidth === 0) {
                    setHasInvitationImageError(true);
                    return;
                }

                setIsInvitationImageLoaded(true);
            },
            () => {
                if (isActive) {
                    setHasInvitationImageError(true);
                }
            }
        );

        return () => {
            isActive = false;
        };
    }, []);

    const handleStart = () => {
        if (!isInvitationImageLoaded || hasStartedRef.current) {
            return;
        }

        hasStartedRef.current = true;
        setStage("starting");
        const audio = audioRef.current;
        if (!audio) {
            setHasAudioError(true);
            beginVideoTransition();
            onContinue?.();
            return;
        }

        void audio.play().then(
            () => {
                if (!introCompletedRef.current) {
                    setStage("intro");
                }
            },
            () => {
                setHasAudioError(true);
                beginVideoTransition();
            }
        );
        onContinue?.();
    };

    const activePhrase =
        activePhraseIndex >= 0
            ? INTRO_TIMELINE.phrases[activePhraseIndex]
            : undefined;
    const sparkRevealDelay =
        activePhrase?.type === "graduation"
            ? activePhrase.wordRevealDelay +
              INTRO_TIMELINE.transitionDuration +
              INTRO_TIMELINE.sparkDelayAfterGraduation
            : 0;

    return (
        <>
            <div className="absolute inset-0 bg-linear-to-br from-[#4b3b31] via-[#211b17] to-[#171310]" />
            <video
                ref={videoRef}
                autoPlay={stage === "transitioning" || stage === "invitation"}
                muted
                loop
                playsInline
                preload="auto"
                poster="/images/IMG_0690.jpg"
                onLoadedData={() => {
                    isVideoReadyRef.current = true;
                    setIsVideoReady(true);
                    if (introCompletedRef.current) {
                        setStage("invitation");
                    }
                }}
                onCanPlay={() => {
                    isVideoReadyRef.current = true;
                    setIsVideoReady(true);
                    if (introCompletedRef.current) {
                        setStage("invitation");
                    }
                }}
                onError={() => {
                    hasVideoErrorRef.current = true;
                    setHasVideoError(true);
                    if (introCompletedRef.current) {
                        setStage("invitation");
                    }
                }}
                aria-hidden="true"
                className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${
                    stage === "invitation" && isVideoReady && !hasVideoError
                        ? "opacity-100"
                        : "opacity-0"
                }`}
            >
                <source src="/vid/bg.mp4" type="video/mp4" />
            </video>
            <audio
                ref={audioRef}
                src="/audio/Ng%E1%BB%8Dt%20-%20Th%E1%BA%A5y%20Ch%C6%B0a.mp3"
                loop
                preload="auto"
                onError={() => {
                    if (hasStartedRef.current) {
                        setHasAudioError(true);
                        if (!introCompletedRef.current) {
                            beginVideoTransition();
                        }
                    }
                }}
            />
            <p className="sr-only" role="status">
                {hasAudioError && hasVideoError
                    ? "Không thể phát âm thanh và video nền. Thiệp mời vẫn có thể sử dụng."
                    : hasAudioError
                      ? "Không thể phát âm thanh. Thiệp mời vẫn có thể sử dụng."
                      : hasVideoError
                        ? "Không thể phát video nền. Thiệp mời vẫn có thể sử dụng."
                        : ""}
            </p>
            <AnimatePresence mode="sync">
                {stage === "invitation" ? (
                    <Invitation key="graduation-invitation" />
                ) : stage === "opening" ? (
                    <OpeningScreen
                        key="graduation-intro"
                        introReady={introReady}
                        isInvitationImageLoaded={isInvitationImageLoaded}
                        hasInvitationImageError={hasInvitationImageError}
                        onStart={handleStart}
                    />
                ) : (
                    <AudioIntroScreen
                        key="audio-intro"
                        phrase={stage === "intro" ? activePhrase : undefined}
                        phraseIndex={activePhraseIndex}
                        sparkRevealDelay={sparkRevealDelay}
                        shouldReduceMotion={shouldReduceMotion}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
