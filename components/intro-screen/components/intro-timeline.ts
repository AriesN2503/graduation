export const INTRO_TIMELINE = {
    totalDuration: 10,
    phraseStartOffset: 0.1,
    transitionDuration: 0.5,
    sparkDelayAfterGraduation: 0.4,
    phrases: [
        { type: "text", text: "MỘT HÀNH TRÌNH...", start: 1.2, duration: 0.9 },
        { type: "text", text: "ĐÁNG ĐỂ KHẮC GHI...", start: 2.5, duration: 1 },
        { type: "text", text: "2022 — 2026", start: 4.5, duration: 0.5 },
        { type: "text", text: "VÀ MỘT CHƯƠNG MỚI BẮT ĐẦU", start: 5.2, duration: 0.5 },
        {
            type: "graduation",
            parts: [
                { id: "happy", text: "Chúc Mừng" },
                { id: "graduation", text: "Tốt Nghiệp" },
            ],
            wordRevealDelay: 0.8,
            start: 6,
            duration: 4,
        },
    ],
} as const;

export type IntroPhrase = (typeof INTRO_TIMELINE.phrases)[number];
