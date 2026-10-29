"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "motion/react";

import InvitationPage from "@/components/invitation/components/invitation-page";
import PosterCover from "@/components/invitation/components/poster-cover";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), {
    ssr: false,
});

export default function InvitationBook() {
    const [currentPage, setCurrentPage] = useState(0);
    const [orientation, setOrientation] = useState<"portrait" | "landscape">(
        "landscape",
    );
    const isSinglePageCover = currentPage === 0 || currentPage === 3;
    const coverOffset =
        orientation === "landscape" && isSinglePageCover
            ? currentPage === 0
                ? "-25%"
                : "25%"
            : "0%";

    return (
        <motion.div
            className="h-full w-full"
            initial={{ x: "-25%" }}
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
                onFlip={(event) => setCurrentPage(Number(event.data))}
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
                    <p className="mb-4 font-serif text-xl italic text-[#34302c]">
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
        </motion.div>
    );
}
