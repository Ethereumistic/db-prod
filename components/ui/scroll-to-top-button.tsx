"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CornerBorders } from "./corner-borders";

export function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 group/scroll flex items-center justify-center w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 transition-all hover:bg-white/10 hover:border-white/20"
                    aria-label="Scroll to top"
                >
                    <CornerBorders groupName="scroll" />
                    <ChevronUp size={24} className="text-white/40 group-hover:text-white transition-colors group-hover:-translate-y-1 duration-300" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
