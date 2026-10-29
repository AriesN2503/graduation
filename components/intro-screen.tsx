
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, GraduationCap } from "lucide-react";

import { TextEffect } from "@/components/motion-primitives/text-effect";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Button } from "@/components/ui/button";

interface IntroScreenProps {
    onContinue?: () => void;
}

export default function IntroScreen({
    onContinue,
}: IntroScreenProps) {
    const [introReady, setIntroReady] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setIntroReady(true);
        }, 300);

        return () => window.clearTimeout(timer);
    }, []);

    const handleStart = () => {
        setIsDismissed(true);
        onContinue?.();
    };

    return (
        <AnimatePresence>
            {!isDismissed && (
                <motion.div
                    key="graduation-intro"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.02,
                        filter: "blur(6px)",
                    }}
                    transition={{
                        duration: 0.7,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 z-10 overflow-y-auto bg-[#fffdf8] text-[#292521]"
                >
                    {/* Decorative borders */}
                    <div className="pointer-events-none absolute inset-3 border border-[#d9c9b8] sm:inset-5" />
                    <div className="pointer-events-none absolute inset-4.5 border border-[#eadfd3] sm:inset-6.5" />

                    <div className="relative flex min-h-svh flex-col items-center justify-between px-8 py-12 sm:px-16 sm:py-14">
                        {/* Header */}
                        <motion.header
                            initial={{ opacity: 0, y: -12 }}
                            animate={{
                                opacity: introReady ? 1 : 0,
                                y: introReady ? 0 : -12,
                            }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="flex w-full max-w-3xl items-center gap-4"
                        >
                            <span className="h-px flex-1 bg-[#d9c9b8]" />

                            <div className="flex items-center gap-2 text-[#a94824]">
                                <GraduationCap
                                    aria-hidden="true"
                                    className="size-4 stroke-[1.5]"
                                />
                                <p className="text-[9px] font-medium uppercase tracking-[0.3em] sm:text-[10px]">
                                    FPT University
                                </p>
                            </div>

                            <span className="h-px flex-1 bg-[#d9c9b8]" />
                        </motion.header>

                        {/* Main content */}
                        <main className="flex flex-col items-center py-10 text-center">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: introReady ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col items-center"
                            >
                                <AnimatedGroup
                                    preset="blur-slide"
                                    className="flex flex-col items-center"
                                >
                                    <p className="mb-5 text-[9px] font-medium uppercase tracking-[0.42em] text-[#83796e] sm:text-[10px]">
                                        Một cột mốc đáng nhớ
                                    </p>

                                    <h1
                                        className="text-[clamp(1.7rem,5vw,3.8rem)] font-normal leading-tight tracking-[0.04em] text-[#34302c]"
                                        style={{ fontFamily: "var(--font-poster-serif), Georgia, serif" }}
                                    >
                                        <TextEffect
                                            per="word"
                                            preset="fade"
                                            delay={0.2}
                                        >
                                            {"LỄ TỐT NGHIỆP".normalize("NFC")}
                                        </TextEffect>
                                    </h1>

                                    <div className="mt-1">
                                        <TextEffect
                                            per="word"
                                            preset="blur"
                                            delay={0.4}
                                            className="font-serif text-[clamp(2.9rem,8vw,6.6rem)] italic leading-[1.05] tracking-[-0.055em] text-[#c6532d]"
                                        >
                                            Thân Mời Bạn
                                        </TextEffect>
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, scaleX: 0.5 }}
                                        animate={{
                                            opacity: introReady ? 1 : 0,
                                            scaleX: introReady ? 1 : 0.5,
                                        }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.2,
                                        }}
                                        className="my-7 flex w-full max-w-xs items-center gap-4 sm:my-9"
                                    >
                                        <span className="h-px flex-1 bg-[#d9c9b8]" />
                                        <span className="size-1.5 rotate-45 border border-[#c6532d]" />
                                        <span className="h-px flex-1 bg-[#d9c9b8]" />
                                    </motion.div>

                                    <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#6e655c] sm:text-[10px] sm:tracking-[0.4em]">
                                        Niên khóa 2022{" "}
                                        <span className="px-1 text-[#c6532d]">—</span>
                                        2026
                                    </p>
                                </AnimatedGroup>
                            </motion.div>

                            {/* Invitation button */}
                            <motion.div
                                initial={{ opacity: 0, y: 18 }}
                                animate={{
                                    opacity: introReady ? 1 : 0,
                                    y: introReady ? 0 : 18,
                                }}
                                transition={{
                                    duration: 0.7,
                                    delay: 0.3,
                                }}
                                className="mt-10 flex flex-col items-center gap-4 sm:mt-12"
                            >
                                <Button
                                    type="button"
                                    onClick={handleStart}
                                    variant="outline"
                                    size="lg"
                                    className="h-11 rounded-none border-[#c6532d] bg-transparent px-6 text-[10px] font-medium uppercase tracking-[0.18em] text-[#a94824] shadow-none hover:bg-[#c6532d] hover:text-white focus-visible:ring-[#c6532d]/40"
                                >
                                    Mở thiệp mời

                                    <ArrowRight
                                        aria-hidden="true"
                                        className="size-3.5"
                                    />
                                </Button>

                                <p className="text-[9px] uppercase tracking-[0.22em] text-[#95897c]">
                                    Trân trọng kính mời
                                </p>
                            </motion.div>
                        </main>

                        {/* Footer */}
                        <motion.footer
                            initial={{ opacity: 0 }}
                            animate={{ opacity: introReady ? 1 : 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex w-full max-w-3xl items-center gap-3 text-[#83796e]"
                        >
                            <span className="h-px flex-1 bg-[#d9c9b8]" />

                            <p className="text-[8px] uppercase tracking-[0.28em] sm:text-[9px]">
                                Graduation · Class of 2026
                            </p>

                            <span className="h-px flex-1 bg-[#d9c9b8]" />
                        </motion.footer>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
