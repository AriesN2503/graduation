import Image from "next/image";
import { forwardRef } from "react";

interface PosterCoverProps {
    onImageSettled?: () => void;
}

const PosterCover = forwardRef<HTMLDivElement, PosterCoverProps>(
    function PosterCover({ onImageSettled }, ref) {
        return (
            <div
                ref={ref}
                className="invitation-page relative border-0! bg-white!"
                data-density="hard"
            >
                <div
                    aria-label="Graduation invitation poster"
                    className="absolute cursor-pointer left-1/2 top-0 h-full w-[88.4%] -translate-x-1/2 overflow-hidden text-center font-sans text-[#414141] @container-size"
                >
                    <Image
                        src="/images/invitation.svg"
                        alt=""
                        fill
                        unoptimized
                        priority
                        fetchPriority="high"
                        sizes="(max-width: 640px) 84vw, 620px"
                        draggable={false}
                        className="pointer-events-none object-fill pb-5"
                        onLoad={onImageSettled}
                        onError={onImageSettled}
                    />
                    <p className="absolute left-0 top-[2.4%] z-10 w-full font-display text-[2.1cqw] font-bold tracking-[0.36em]">
                        A SPECIAL MILESTONE
                    </p>
                    <h1 className="absolute left-0 top-[5.8%] z-10 w-full text-[5.5cqw] font-normal leading-none tracking-[0.12em]">
                        HAPPY
                    </h1>
                    <p className="absolute left-0 top-[10.2%] z-10 w-full font-script text-[10cqw] leading-none text-poster-accent">
                        Graduation
                    </p>
                    <div className="absolute left-0 top-[18%] z-10 flex w-full items-center justify-center gap-[2cqw] whitespace-nowrap text-[2.75cqw] font-normal tracking-[0.38em] text-poster-accent">
                        <div className="flex w-[8%] shrink-0 flex-col gap-[0.8cqw]">
                            <span className="h-[1.5px] w-full shrink-0 bg-poster-accent" aria-hidden="true" />
                            <span className="h-[1.5px] w-full shrink-0 bg-poster-accent" aria-hidden="true" />
                        </div>

                        <p>LÊ PHẠM TRƯỜNG HUY</p>

                        <div className="flex w-[8%] shrink-0 flex-col gap-[0.8cqw]">
                            <span className="h-[1.5px] w-full shrink-0 bg-poster-accent" aria-hidden="true" />
                            <span className="h-[1.5px] w-full shrink-0 bg-poster-accent" aria-hidden="true" />
                        </div>
                    </div>
                    <p className="absolute left-[7%] top-[38.2%] z-10 w-auto rotate-180 text-[1.55cqw] font-medium leading-normal tracking-[0.3em] text-[#555] [writing-mode:vertical-rl]">
                        FOUR YEARS OF GROWTH &amp; DISCOVERY
                    </p>
                    <p className="absolute right-[7%] top-[38.2%] z-10 w-auto text-[1.55cqw] font-medium leading-normal tracking-[0.3em] text-[#555] [writing-mode:vertical-rl]">
                        THE CLASS OF 2022 — 2026
                    </p>
                    <div className="absolute left-0 top-[72.5%] z-10 grid w-full grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] items-center gap-[3cqw] text-[1.65cqw] font-bold leading-[1.55] tracking-[0.16em]">
                        <div>
                            <p className="text-[1.8cqw] font-medium tracking-[0.28em] text-poster-accent">
                                GRADUATION DAY
                            </p>
                            <p>07/11/2026</p>
                            <p>12H45-15H</p>
                        </div>
                        <span className="h-[8cqw] w-px bg-poster-accent" aria-hidden="true" />
                        <div>
                            <p className="text-[1.8cqw] font-medium tracking-[0.28em] text-poster-accent">
                                FPT UNIVERSITY
                            </p>
                            <p>7 Đ. D1, Tăng Nhơn Phú,</p>
                            <p>Hồ Chí Minh, Vietnam</p>
                        </div>
                    </div>
                    <p className="absolute left-0 top-[81%] z-10 w-full font-display text-[2.7cqw] font-semibold tracking-[0.38em]">
                        THÂN MỜI
                    </p>
                    <p className="absolute left-0 top-[83%] z-10 w-full font-script text-[12cqw] leading-none text-poster-accent">
                        Trường Huy
                    </p>
                    <p className="absolute left-0 top-[93%] z-10 w-full font-display text-[1.5cqw] font-semibold leading-normal tracking-[0.3em] text-poster-accent">
                        MỜI BẠN LẬT SANG TRANG TIẾP THEO
                        <br />
                        ĐỂ XEM THÔNG TIN CHI TIẾT NHA
                    </p>
                </div>
            </div>
        );
    }
);

PosterCover.displayName = "PosterCover";

export default PosterCover;
