"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import InvitationPage from "@/components/invitation/components/invitation-page";
import PosterCover from "@/components/invitation/components/poster-cover";
import Image from "next/image";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), {
    ssr: false,
});

interface InvitationBookProps {
    onReady: () => void;
}

interface FlipBookController {
    flipNext: () => void;
    flipPrev: () => void;
}

interface FlipBookHandle {
    pageFlip: () => FlipBookController | null;
}

export default function InvitationBook({ onReady }: InvitationBookProps) {
    const currentPageRef = useRef(0);
    const isReadyReportedRef = useRef(false);
    const flipBookRef = useRef<FlipBookHandle | null>(null);
    const bookContainerRef = useRef<HTMLDivElement>(null);
    const touchStartRef = useRef<{ x: number; y: number; side: "left" | "right" } | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isFlipBookReady, setIsFlipBookReady] = useState(false);
    const [isPosterLoaded, setIsPosterLoaded] = useState(false);
    const [orientation, setOrientation] = useState<"portrait" | "landscape">(() => {
        if (typeof window === "undefined") {
            return "landscape";
        }

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const bookWidth =
            viewportWidth <= 640
                ? Math.min(viewportWidth * 0.9, 620, viewportHeight * 0.696)
                : Math.min(viewportWidth * 0.92, 1312, viewportHeight * 1.408);

        return bookWidth < 560 ? "portrait" : "landscape";
    });
    useEffect(() => {
        if (isFlipBookReady && isPosterLoaded && !isReadyReportedRef.current) {
            isReadyReportedRef.current = true;
            onReady();
        }
    }, [isFlipBookReady, isPosterLoaded, onReady]);

    useEffect(() => {
        const container = bookContainerRef.current;
        if (!container) {
            return;
        }

        const mobileQuery = window.matchMedia("(max-width: 640px)");
        const isFlipBookTouch = (target: EventTarget | null): target is Element =>
            target instanceof Element && target.closest(".invitation-flipbook") !== null;

        const handleTouchStart = (event: TouchEvent) => {
            const target = event.target;
            if (!mobileQuery.matches || !isFlipBookTouch(target)) {
                return;
            }

            const touch = event.changedTouches[0];
            const rect = target.closest(".invitation-flipbook")?.getBoundingClientRect();
            if (!touch || !rect) {
                return;
            }

            touchStartRef.current = {
                x: touch.clientX,
                y: touch.clientY,
                side: touch.clientX >= rect.left + rect.width / 2 ? "right" : "left",
            };
            event.stopPropagation();
        };

        const handleTouchMove = (event: TouchEvent) => {
            if (!mobileQuery.matches || !touchStartRef.current) {
                return;
            }

            const touch = event.changedTouches[0];
            if (!touch) {
                return;
            }

            event.stopPropagation();
            if (Math.abs(touch.clientX - touchStartRef.current.x) > 8) {
                if (event.cancelable) {
                    event.preventDefault();
                }
            }
        };

        const handleTouchEnd = (event: TouchEvent) => {
            if (!mobileQuery.matches || !touchStartRef.current) {
                return;
            }

            event.stopPropagation();
            const touch = event.changedTouches[0];
            const start = touchStartRef.current;
            touchStartRef.current = null;
            if (!touch) {
                return;
            }

            const deltaX = touch.clientX - start.x;
            const deltaY = touch.clientY - start.y;
            if (Math.abs(deltaX) < 24 || Math.abs(deltaX) < Math.abs(deltaY)) {
                return;
            }

            const pageFlip = flipBookRef.current?.pageFlip();
            if (start.side === "right" && deltaX < 0) {
                pageFlip?.flipNext();
            } else if (start.side === "left" && deltaX > 0) {
                pageFlip?.flipPrev();
            }
        };

        const handleTouchCancel = (event: TouchEvent) => {
            if (touchStartRef.current) {
                touchStartRef.current = null;
                event.stopPropagation();
            }
        };

        container.addEventListener("touchstart", handleTouchStart, true);
        container.addEventListener("touchmove", handleTouchMove, {
            capture: true,
            passive: false,
        });
        container.addEventListener("touchend", handleTouchEnd, true);
        container.addEventListener("touchcancel", handleTouchCancel, true);

        return () => {
            container.removeEventListener("touchstart", handleTouchStart, true);
            container.removeEventListener("touchmove", handleTouchMove, true);
            container.removeEventListener("touchend", handleTouchEnd, true);
            container.removeEventListener("touchcancel", handleTouchCancel, true);
        };
    }, []);

    const isSinglePageCover = currentPage === 0 || currentPage === 3;
    const coverOffset =
        orientation === "landscape" && isSinglePageCover
            ? currentPage === 0
                ? "-25%"
                : "25%"
            : "0%";
    const hintPosition =
        orientation === "landscape" && currentPage === 0
            ? "left-3/4"
            : orientation === "landscape" && currentPage === 3
                ? "left-1/4"
                : "left-1/2";

    return (
        <motion.div
            ref={bookContainerRef}
            className="relative h-full w-full"
            initial={false}
            animate={{ x: coverOffset }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
            <HTMLFlipBook
                ref={flipBookRef}
                key="graduation-poster-cover"
                width={640}
                height={800}
                size="stretch"
                minWidth={280}
                maxWidth={700}
                minHeight={360}
                maxHeight={760}
                drawShadow={false}
                flippingTime={800}
                usePortrait
                startZIndex={10}
                autoSize={false}
                maxShadowOpacity={0}
                showCover
                mobileScrollSupport={false}
                clickEventForward={false}
                useMouseEvents
                swipeDistance={12}
                showPageCorners
                disableFlipByClick={false}
                className="invitation-flipbook relative z-10 drop-shadow-[0_24px_40px_rgba(54,37,24,0.22)]"
                style={{ height: "100%", width: "100%" }}
                startPage={0}
                onFlip={(event) => {
                    currentPageRef.current = Number(event.data);
                }}
                onInit={(event) => {
                    currentPageRef.current = Number(event.data.page);
                    setCurrentPage(Number(event.data.page));
                    setOrientation(
                        event.data.mode === "portrait"
                            ? "portrait"
                            : "landscape",
                    );
                    setIsFlipBookReady(true);
                }}
                onChangeState={(event) =>
                    event.data === "read" &&
                    setCurrentPage(currentPageRef.current)
                }
                onChangeOrientation={(event) =>
                    setOrientation(
                        event.data === "portrait" ? "portrait" : "landscape",
                    )
                }
            >
                <PosterCover onImageSettled={() => setIsPosterLoaded(true)} />
                <InvitationPage
                    eyebrow="Thân mời bạn"
                    title="Cùng chung vui"
                    pageNumber={1}
                >
                    <p
                        className="font-script mb-2 text-base sm:text-2xl 2xl:text-[clamp(2rem,4.5cqh,2.75rem)]"
                        style={{ color: "var(--poster-accent)" }}
                    >
                        Lễ tốt nghiệp · Niên khóa 2022 — 2026
                    </p>
                    <div className="text-center space-y-4">
                        <p>
                            Vậy là hành trình 4 năm đại học cũng đã đi đến một cột mốc thật đặc biệt. Bốn năm qua là những tháng ngày với thật nhiều kỷ niệm, trải nghiệm và cả những nỗ lực đáng nhớ. Tất cả đã góp phần tạo nên mình của ngày hôm nay.
                        </p>

                        <p>
                            Trong khoảnh khắc ý nghĩa này, mình mong có thể chia sẻ niềm vui cùng những người bạn, người thân đã luôn đồng hành và ủng hộ mình. Vì vậy, mình thân mời bạn đến tham dự buổi lễ tốt nghiệp và cùng lưu giữ thêm một kỷ niệm đẹp nhé!
                        </p>
                    </div>

                    {/* Graduation photo */}
                    <div className="mt-3 overflow-hidden rounded-lg sm:mt-4">
                        <Image
                            src="/images/dai-hoc-fpt-tp-hcm-1.jpeg"
                            alt="A memorable graduation moment"
                            width={1200}
                            height={675}
                            className="aspect-video max-h-28 w-full object-cover sm:max-h-32 2xl:max-h-[clamp(140px,24cqh,190px)]"
                            priority={false}
                        />
                    </div>
                </InvitationPage>
                <InvitationPage
                    eyebrow="Thông tin buổi lễ"
                    title="Hẹn gặp bạn"
                    pageNumber={2}
                >
                    <div className="space-y-3">
                        <div>
                            <p className="text-[8px] uppercase tracking-[0.16em] opacity-60 2xl:text-[11px]">
                                Thời gian
                            </p>
                            <p className="text-[9px] sm:text-[13px] 2xl:text-[15px]">
                                [07/11/2026] · [12h45-15h]
                            </p>
                        </div>

                        <div>
                            <p className="text-[8px] uppercase tracking-[0.16em] opacity-60 2xl:text-[11px]">
                                Địa điểm
                            </p>
                            <p className="text-[11px] text-poster-accent sm:text-[13px] 2xl:text-[15px]">
                                FPT University
                            </p>
                            <p>
                                [Đường D1, khu Công Nghệ Cao, phường Tăng Nhơn Phú, TP Hồ Chí Minh]
                            </p>
                        </div>

                        <div>
                            <p className="text-[8px] uppercase tracking-[0.16em] opacity-60 2xl:text-[11px]">
                                Liên hệ
                            </p>
                            <p>
                                Trường Huy
                            </p>
                            <p>
                                Số điện thoại:{" "}
                                <a
                                    href="tel:0346349968"
                                    className="underline underline-offset-4 hover:text-poster-accent transition-opacity"
                                >
                                    0346 349 968
                                </a>
                            </p>
                        </div>

                        <div className="space-y-2 pt-1">
                            <p className="text-[8px] uppercase tracking-[0.16em] opacity-60 2xl:text-[11px]">
                                Bản đồ địa điểm
                            </p>

                            <div className="overflow-hidden rounded-xl border border-black/10">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3918.610010397031!2d106.8073081!3d10.8411276!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1793361568760!5m2!1sen!2s"
                                    className="h-24 w-full sm:h-28 2xl:h-[clamp(140px,28cqh,220px)]"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    title="Bản đồ Trường Đại học FPT TP.HCM"
                                />
                            </div>

                            <a
                                href="https://www.google.com/maps/search/?api=1&query=FPT+University+HCMC"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[9px] sm:text-[11px] underline underline-offset-4 hover:text-poster-accent"
                            >
                                Xem đường đi trên Google Maps ↗
                            </a>
                        </div>
                    </div>
                </InvitationPage>
                <InvitationPage
                    eyebrow="Cảm ơn bạn"
                    title="Hẹn sớm gặp"
                    pageNumber={3}
                    cover
                >
                    <p className="font-script mb-3 text-2xl sm:mb-5 sm:text-3xl 2xl:text-[clamp(2rem,4.5cqh,2.75rem)]"
                        style={{ color: "var(--poster-accent)" }}>
                        Until We Meet Again
                    </p>
                    <p className="mx-10 sm:mx-0">
                        Sự hiện diện của bạn sẽ khiến ngày đặc biệt
                        này trở nên trọn vẹn và ý nghĩa hơn.
                    </p>

                    <p className="mt-4 font-script text-lg sm:mt-6 sm:text-xl">
                        See you there!
                    </p>
                </InvitationPage>
            </HTMLFlipBook>
            {currentPage < 3 && (
                <div
                    aria-hidden="true"
                    className={`mobile-page-hint absolute -bottom-8 ${hintPosition} flex -translate-x-1/2 items-center gap-1 text-poster-accent`}
                >
                    <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.18em]">
                        Vuốt sang trái để xem tiếp
                    </span>
                    <motion.div
                        animate={{ x: [-3, 5, -3] }}
                        transition={{
                            duration: 1.2,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                    >
                        <ArrowRight className="size-6" strokeWidth={1.5} />
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
}
