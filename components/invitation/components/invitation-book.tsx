"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import InvitationPage from "@/components/invitation/components/invitation-page";
import PosterCover from "@/components/invitation/components/poster-cover";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), {
    ssr: false,
});

export default function InvitationBook() {
    const currentPageRef = useRef(0);
    const [currentPage, setCurrentPage] = useState(0);
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
            className="relative h-full w-full"
            initial={false}
            animate={{ x: coverOffset }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
            <HTMLFlipBook
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
                swipeDistance={30}
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
                <PosterCover />
                <InvitationPage
                    eyebrow="Trân trọng kính mời"
                    title="Cùng chung vui"
                    pageNumber={1}
                >
                    <p
                        className="font-script mb-4 text-4xl"
                        style={{ color: "var(--poster-accent)" }}
                    >
                        Lễ tốt nghiệp · Niên khóa 2022 — 2026
                    </p>
                    <p>
                        Đến tham dự buổi lễ tốt nghiệp và chia sẻ niềm vui
                        trong ngày đặc biệt này.
                    </p>
                </InvitationPage>
                <InvitationPage
                    eyebrow="Thông tin buổi lễ"
                    title="Hẹn gặp bạn"
                    pageNumber={2}
                >
                    <p>Thời gian và địa điểm sẽ được cập nhật.</p>
                </InvitationPage>
                <InvitationPage
                    eyebrow="Cảm ơn bạn"
                    title="Hẹn sớm gặp"
                    pageNumber={3}
                    cover
                >
                    <p>Sự hiện diện của bạn là niềm vui của chúng mình.</p>
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
