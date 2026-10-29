"use client";

import { motion } from "motion/react";

import InvitationBook from "@/components/invitation/components/invitation-book";

export default function Invitation() {
    return (
        <main className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
            <motion.div
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="absolute inset-0 bg-[#211b17]/25 backdrop-blur-[3px]"
            />
            <motion.div
                initial={{ opacity: 0, y: "75vh", scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                    duration: 0.95,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="invitation-book-container relative z-10"
            >
                <InvitationBook />
            </motion.div>
        </main>
    );
}
