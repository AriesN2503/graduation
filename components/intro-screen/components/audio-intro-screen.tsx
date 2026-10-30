"use client";

import { AnimatePresence, motion } from "motion/react";

import { INTRO_TIMELINE, type IntroPhrase } from "./intro-timeline";

interface AudioIntroScreenProps {
    phrase?: IntroPhrase;
    phraseIndex: number;
    sparkRevealDelay: number;
    isVideoFadingIn: boolean;
    shouldReduceMotion: boolean;
}

export default function AudioIntroScreen({
    phrase,
    phraseIndex,
    sparkRevealDelay,
    isVideoFadingIn,
    shouldReduceMotion,
}: AudioIntroScreenProps) {
    return (
        <motion.section
            key="audio-intro"
            aria-label="Giới thiệu lễ tốt nghiệp"
            className="absolute inset-0 z-10 flex items-center justify-center bg-white px-5 text-[#292521]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: {
                    duration: shouldReduceMotion ? 0 : 0.8,
                    ease: "easeInOut",
                },
            }}
        >
            <AnimatePresence mode="sync">
                {phrase ? (
                    <motion.div
                        key={phraseIndex}
                        aria-live="polite"
                        className="absolute inset-0 flex items-center justify-center px-5 text-center"
                        initial={{
                            opacity: 0,
                            y: shouldReduceMotion ? 0 : 18,
                            filter: shouldReduceMotion ? "blur(0px)" : "blur(12px)",
                        }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{
                            opacity: 0,
                            y: shouldReduceMotion ? 0 : -12,
                            filter: shouldReduceMotion ? "blur(0px)" : "blur(8px)",
                        }}
                        transition={{
                            duration: shouldReduceMotion ? 0 : INTRO_TIMELINE.transitionDuration,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        {phrase.type === "graduation" && (
                            <>
                                <motion.div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-3 z-0 border border-[#d9c9b8] sm:inset-5"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        duration: shouldReduceMotion ? 0 : INTRO_TIMELINE.transitionDuration,
                                        delay: shouldReduceMotion ? 0 : sparkRevealDelay,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                />
                                <motion.div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-4.5 z-0 border border-[#eadfd3] sm:inset-6.5"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        duration: shouldReduceMotion ? 0 : INTRO_TIMELINE.transitionDuration,
                                        delay: shouldReduceMotion ? 0 : sparkRevealDelay,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                />
                            </>
                        )}
                        <div
                            className={`w-full max-w-[min(92vw,72rem)] px-2 font-display leading-tight text-balance ${phraseIndex === INTRO_TIMELINE.phrases.length - 1
                                    ? "text-[clamp(2rem,7vw,5.5rem)] font-medium tracking-[0.14em]"
                                    : "text-[clamp(1.5rem,5vw,4rem)] font-normal tracking-[0.12em]"
                                }`}
                        >
                            {phrase.type === "graduation" ? (
                                <div className="intro-graduation relative mx-auto h-[min(58vw,24rem)] min-h-56 w-full max-w-208">
                                    {phrase.parts.map((part) => (
                                        <motion.span
                                            key={part.id}
                                            className={`intro-graduation__word intro-graduation__word--${part.id} ${part.id === "graduation"
                                                    ? "absolute bottom-[34%] right-[10%] z-10 font-script text-[clamp(4.8rem,17vw,12rem)] leading-none normal-case text-poster-accent sm:bottom-[20%]"
                                                    : "absolute left-[13%] top-[22%] z-10 font-display text-[clamp(2.5rem,7vw,4.5rem)] font-medium leading-none"
                                                }`}
                                            initial={{
                                                opacity: 0,
                                                y: shouldReduceMotion
                                                    ? 0
                                                    : part.id === "happy"
                                                        ? -14
                                                        : 14,
                                                filter: shouldReduceMotion ? "blur(0px)" : "blur(8px)",
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                filter: "blur(0px)",
                                            }}
                                            transition={{
                                                duration: shouldReduceMotion ? 0 : INTRO_TIMELINE.transitionDuration,
                                                delay: shouldReduceMotion
                                                    ? 0
                                                    : part.id === "happy"
                                                        ? 0
                                                        : phrase.wordRevealDelay,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                        >
                                            {part.text}
                                        </motion.span>
                                    ))}
                                    <motion.span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute right-[8%] top-[4%] z-0 size-[clamp(4rem,11vw,7.5rem)] bg-center"
                                        style={{
                                            backgroundImage: "url('/images/spark-1.svg')",
                                            backgroundSize: "900% auto",
                                        }}
                                        initial={{
                                            opacity: 0,
                                            scale: shouldReduceMotion ? 1 : 0.75,
                                        }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: shouldReduceMotion ? 0 : INTRO_TIMELINE.transitionDuration,
                                            delay: shouldReduceMotion ? 0 : sparkRevealDelay,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                    />
                                    <motion.span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute bottom-[2%] left-[5%] z-0 size-[clamp(4rem,11vw,7.5rem)] bg-center"
                                        style={{
                                            backgroundImage: "url('/images/spark-2.svg')",
                                            backgroundSize: "900% auto",
                                        }}
                                        initial={{
                                            opacity: 0,
                                            scale: shouldReduceMotion ? 1 : 0.75,
                                        }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: shouldReduceMotion ? 0 : INTRO_TIMELINE.transitionDuration,
                                            delay: shouldReduceMotion ? 0 : sparkRevealDelay,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                    />
                                </div>
                            ) : (
                                phrase.text
                            )}
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </motion.section>
    );
}
