"use client";

import { motion } from "motion/react";
import { ArrowRight, GraduationCap } from "lucide-react";

import { Button } from "@/components/ui/button";

interface OpeningScreenProps {
    isInvitationImageLoaded: boolean;
    hasInvitationImageError: boolean;
    onStart: () => void;
}

export default function OpeningScreen({
    isInvitationImageLoaded,
    hasInvitationImageError,
    onStart,
}: OpeningScreenProps) {
    return (
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
            <div className="pointer-events-none absolute inset-3 border border-[#d9c9b8] sm:inset-5" />
            <div className="pointer-events-none absolute inset-4.5 border border-[#eadfd3] sm:inset-6.5" />

            <div className="relative flex min-h-svh flex-col items-center justify-between px-8 py-12 sm:px-16 sm:py-14">
                <motion.header
                    initial={{ y: -12 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="flex w-full max-w-3xl items-center gap-4"
                >
                    <span className="h-px flex-1 bg-[#d9c9b8]" />

                    <div className="flex items-center gap-2 text-poster-accent">
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

                <main className="flex flex-col items-center py-10 text-center">
                    <div className="flex flex-col items-center">
                        <p className="mb-5 text-[9px] font-medium uppercase tracking-[0.42em] text-[#83796e] sm:text-[10px]">
                            Một cột mốc đáng nhớ
                        </p>

                        <h1 className="font-display text-[clamp(1.2rem,3.5vw,2.3rem)] font-normal leading-tight tracking-[0.16em] text-[#34302c]">
                            Thân Mời Bạn Tham Dự
                        </h1>

                        <p
                            className="mt-1 font-script text-[clamp(4rem,10vw,9rem)] leading-[0.95] max-[400px]:text-[clamp(3.25rem,14.5vw,3.75rem)]"
                            style={{ color: "var(--poster-accent)" }}
                        >
                            Lễ Tốt Nghiệp
                        </p>

                        <div className="my-7 flex w-full max-w-xs items-center gap-4 sm:my-9">
                            <span className="h-px flex-1 bg-[#d9c9b8]" />
                            <span className="size-1.5 rotate-45 border border-poster-accent" />
                            <span className="h-px flex-1 bg-[#d9c9b8]" />
                        </div>

                        <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#6e655c] sm:text-[10px] sm:tracking-[0.4em]">
                            Niên khóa 2022{" "}
                            <span className="px-1 text-poster-accent">—</span>
                            2026
                        </p>
                    </div>

                    <motion.div
                        initial={{ y: 18 }}
                        animate={{ y: 0 }}
                        transition={{
                            duration: 0.7,
                        }}
                        className="mt-10 flex flex-col items-center gap-4 sm:mt-12"
                    >
                        <Button
                            type="button"
                            disabled={!isInvitationImageLoaded}
                            onClick={onStart}
                            variant="outline"
                            size="lg"
                            className="h-11 cursor-pointer rounded-none border-poster-accent bg-transparent px-6 text-[10px] font-medium uppercase tracking-[0.18em] text-poster-accent shadow-none hover:bg-poster-accent hover:text-white focus-visible:ring-poster-accent/40 disabled:cursor-not-allowed"
                        >
                            Mở thiệp mời

                            <ArrowRight
                                aria-hidden="true"
                                className="size-3.5"
                            />
                        </Button>

                        <p
                            role={hasInvitationImageError ? "alert" : "status"}
                            className="text-[9px] uppercase tracking-[0.12em] text-[#95897c]"
                        >
                            {hasInvitationImageError
                                ? "Không tải được thiệp mời. Vui lòng tải lại trang để thử lại."
                                : !isInvitationImageLoaded
                                  ? "Đang tải hình thiệp mời..."
                                  : "Trân trọng kính mời"}
                        </p>
                    </motion.div>
                </main>

                <motion.footer
                    initial={{ y: 12 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8 }}
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
    );
}
