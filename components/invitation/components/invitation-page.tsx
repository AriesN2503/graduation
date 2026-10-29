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
                className={`invitation-page relative flex h-full flex-col overflow-hidden border border-[#e7d9ca] p-8 text-center text-[#34302c] sm:p-12 ${
                    cover ? "invitation-page--cover" : ""
                }`}
            >
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-3 border border-[#eadfd3] sm:inset-4"
                />
                <div className="relative flex flex-1 flex-col items-center justify-center">
                    <p className="font-display mb-7 text-[9px] font-medium uppercase tracking-[0.32em] text-[#83796e] sm:text-[10px]">
                        {eyebrow}
                    </p>
                    <h2
                        className="font-script max-w-full text-[clamp(3.25rem,7vw,5.75rem)] font-normal leading-[0.95]"
                        style={{ color: "var(--poster-accent)" }}
                    >
                        {title}
                    </h2>
                    <div className="my-7 flex w-full max-w-48 items-center gap-4">
                        <span className="h-px flex-1 bg-[#d9c9b8]" />
                        <span className="size-1.5 rotate-45 border border-poster-accent" />
                        <span className="h-px flex-1 bg-[#d9c9b8]" />
                    </div>
                    <div className="max-w-sm text-sm leading-7 text-[#6e655c] sm:text-base">
                        {children}
                    </div>
                </div>
                <div className="font-display relative flex items-center justify-center gap-3 text-[9px] uppercase tracking-[0.24em] text-[#95897c]">
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
