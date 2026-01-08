"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogOverlay,
    DialogPortal,
} from "@/components/ui/dialog";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity/image";

// Grid style configuration
export type GridStyle = "3x3" | "3x2" | "2x2" | "3x1" | "2x1";

interface GalleryImage {
    asset?: any;
    externalUrl?: string;
    alt?: string;
}

interface ProjectGalleryProps {
    images: GalleryImage[];
    gridStyle: GridStyle;
    className?: string;
}

// Grid layout configurations
const GRID_CONFIGS: Record<GridStyle, { cols: string; maxImages: number; aspect: string }> = {
    "3x3": { cols: "grid-cols-3", maxImages: 9, aspect: "aspect-square" },
    "3x2": { cols: "grid-cols-3", maxImages: 6, aspect: "aspect-[3/2]" },
    "2x2": { cols: "grid-cols-2", maxImages: 4, aspect: "aspect-square" },
    "3x1": { cols: "grid-cols-3", maxImages: 3, aspect: "aspect-video" },
    "2x1": { cols: "grid-cols-2", maxImages: 2, aspect: "aspect-video" },
};

function getImageUrl(img: GalleryImage): string | null {
    if (!img) return null;
    if (img.asset) return urlFor(img.asset).url();
    return img.externalUrl || null;
}

export function ProjectGallery({ images, gridStyle, className }: ProjectGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const config = GRID_CONFIGS[gridStyle] || GRID_CONFIGS["3x2"];

    // Limit images based on grid style
    const displayImages = images?.slice(0, config.maxImages) || [];

    const handleClose = useCallback(() => {
        setSelectedIndex(null);
    }, []);

    const handlePrevious = useCallback(() => {
        if (selectedIndex === null) return;
        setSelectedIndex(prev =>
            prev === null ? null : prev === 0 ? displayImages.length - 1 : prev - 1
        );
    }, [selectedIndex, displayImages.length]);

    const handleNext = useCallback(() => {
        if (selectedIndex === null) return;
        setSelectedIndex(prev =>
            prev === null ? null : prev === displayImages.length - 1 ? 0 : prev + 1
        );
    }, [selectedIndex, displayImages.length]);

    // Keyboard navigation
    useEffect(() => {
        if (selectedIndex === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                handlePrevious();
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                handleNext();
            } else if (e.key === "Escape") {
                e.preventDefault();
                handleClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, handlePrevious, handleNext, handleClose]);

    // Touch/swipe handling
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            handleNext();
        } else if (isRightSwipe) {
            handlePrevious();
        }
    };

    if (!displayImages.length) return null;

    return (
        <>
            {/* Grid Display */}
            <div className={cn("w-full", className)}>
                <div className={cn("grid gap-2 md:gap-4", config.cols)}>
                    {displayImages.map((img, idx) => {
                        const src = getImageUrl(img);
                        if (!src) return null;

                        return (
                            <motion.button
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => setSelectedIndex(idx)}
                                className={cn(
                                    "relative overflow-hidden border border-white/10 bg-slate-900/50",
                                    "group cursor-pointer",
                                    config.aspect
                                )}
                            >
                                <Image
                                    src={src}
                                    alt={img.alt || `Gallery image ${idx + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">{idx + 1}/{displayImages.length}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Fullscreen Gallery Dialog */}
            <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && handleClose()}>
                <DialogPortal>
                    <DialogPrimitive.Backdrop
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0"
                    />
                    <DialogPrimitive.Popup
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 outline-none"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        {/* Close button */}
                        <DialogPrimitive.Close
                            className="absolute top-4 right-4 md:top-8 md:right-8 z-60 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <X size={24} />
                            <span className="sr-only">Затвори</span>
                        </DialogPrimitive.Close>

                        {/* Navigation arrows */}
                        {displayImages.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrevious}
                                    className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-60 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
                                    aria-label="Предишна снимка"
                                >
                                    <ChevronLeft size={28} />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-60 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
                                    aria-label="Следваща снимка"
                                >
                                    <ChevronRight size={28} />
                                </button>
                            </>
                        )}

                        {/* Image counter */}
                        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-60 px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-bold tracking-widest">
                            {selectedIndex !== null && (
                                <span>{selectedIndex + 1} / {displayImages.length}</span>
                            )}
                        </div>

                        {/* Main image */}
                        <AnimatePresence mode="wait">
                            {selectedIndex !== null && displayImages[selectedIndex] && (
                                <motion.div
                                    key={selectedIndex}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="relative w-full h-full max-w-5xl max-h-[80vh] flex items-center justify-center"
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={getImageUrl(displayImages[selectedIndex]) || ""}
                                            alt={displayImages[selectedIndex].alt || `Gallery image ${selectedIndex + 1}`}
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Dots indicator for mobile */}
                        {displayImages.length > 1 && displayImages.length <= 9 && (
                            <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-60 flex items-center gap-2">
                                {displayImages.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedIndex(idx)}
                                        className={cn(
                                            "w-2 h-2 rounded-full transition-all duration-300",
                                            idx === selectedIndex
                                                ? "bg-white w-6"
                                                : "bg-white/40 hover:bg-white/60"
                                        )}
                                        aria-label={`Снимка ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </DialogPrimitive.Popup>
                </DialogPortal>
            </Dialog>
        </>
    );
}
