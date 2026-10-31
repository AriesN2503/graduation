import { forwardRef } from "react";

interface InvitationPageProps {
    eyebrow: string;
    title: string;
    children: React.ReactNode;
    pageNumber: number;
    cover?: boolean;
}

const InvitationPage = forwardRef<HTMLDivElement, InvitationPageProps>(
    function InvitationPage(
        { eyebrow, title, children, pageNumber, cover = false },
        ref,
    ) {
        return (
            <div
                ref={ref}
                className={`invitation-page cursor-pointer relative flex h-full flex-col overflow-hidden border border-[#e7d9ca] p-5 text-center text-[#34302c] sm:p-7 lg:p-9 2xl:@container-size ${
                    cover ? "invitation-page--cover" : ""
                }`}
                data-density={cover ? "hard" : undefined}
            >
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-2.5 border border-[#eadfd3] sm:inset-3"
                />
                <div
                    className={
                        cover
                            ? "absolute inset-x-5 top-1/2 flex max-h-[calc(100%-7rem)] -translate-y-1/2 flex-col items-center overflow-y-auto sm:inset-x-7 sm:max-h-[calc(100%-8rem)] lg:inset-x-9 lg:max-h-[calc(100%-9rem)]"
                            : "relative flex min-h-0 flex-1 flex-col items-center pb-10 sm:pb-12 lg:pb-14 2xl:justify-evenly"
                    }
                >
                    <p className="font-display mb-3 shrink-0 text-[8px] font-medium uppercase tracking-[0.28em] text-[#83796e] sm:mb-4 sm:text-[9px] 2xl:mb-0 2xl:text-[10px]">
                        {eyebrow}
                    </p>
                    <h2
                        className="font-script max-w-full shrink-0 text-[clamp(1.5rem,5.4vw,4.5rem)] font-normal leading-[0.95] 2xl:text-[clamp(4rem,8cqh,5.5rem)]"
                        style={{ color: "var(--poster-accent)" }}
                    >
                        {title}
                    </h2>
                    <div className="my-4 flex w-full max-w-40 shrink-0 items-center gap-3 sm:my-5">
                        <span className="h-px flex-1 bg-[#d9c9b8]" />
                        <span className="size-1.5 rotate-45 border border-poster-accent" />
                        <span className="h-px flex-1 bg-[#d9c9b8]" />
                    </div>
                    <div className="w-full max-w-sm space-y-1.5 text-[9px] leading-normal text-[#6e655c] overscroll-y-contain scrollbar-thin max-[640px]:overflow-y-auto sm:text-xs sm:leading-relaxed 2xl:w-[94%] 2xl:max-w-none 2xl:text-[clamp(15px,2.35cqh,19px)] 2xl:leading-[1.65]">
                        {children}
                    </div>
                </div>
                <div className="font-display absolute inset-x-5 bottom-5 flex shrink-0 items-center justify-center gap-3 text-[8px] uppercase tracking-[0.24em] text-[#95897c] sm:inset-x-7 sm:bottom-7 lg:inset-x-9 lg:bottom-9">
                    <span className="h-px w-8 bg-[#d9c9b8]" />
                    <span>{String(pageNumber).padStart(2, "0")}</span>
                    <span className="h-px w-8 bg-[#d9c9b8]" />
                </div>
            </div>
        );
    },
);

InvitationPage.displayName = "InvitationPage";

export default InvitationPage;
