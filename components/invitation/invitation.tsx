"use client";

import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "motion/react";

import InvitationBook from "@/components/invitation/components/invitation-book";

interface InvitationProps {
    guestName: string;
}

export default function Invitation({ guestName }: InvitationProps) {
    const [isBookReady, setIsBookReady] = useState(false);
    const bookAnimation = useAnimationControls();

    useEffect(() => {
        if (!isBookReady) {
            return;
        }

        bookAnimation.set({ opacity: 0, y: "75vh" });
        const animationFrame = window.requestAnimationFrame(() => {
            void bookAnimation.start({
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.95,
                    ease: [0.22, 1, 0.36, 1],
                },
            });
        });

        return () => window.cancelAnimationFrame(animationFrame);
    }, [bookAnimation, isBookReady]);

    return (
        <main className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
            <motion.div
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="absolute inset-0 bg-[#211b17]/80 backdrop-blur-[3px]"
            />
            <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={bookAnimation}
                className="invitation-book-container relative z-10"
            >
                <InvitationBook
                    guestName={guestName}
                    onReady={() => setIsBookReady(true)}
                />
            </motion.div>
        </main>
    );
}
