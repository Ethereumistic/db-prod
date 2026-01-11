"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { urlFor } from "@/lib/sanity/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect } from "react";

interface WorkGalleryProps {
    images: any[];
    title?: string;
}

export function WorkGallery({ images, title }: WorkGalleryProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [api, setApi] = useState<CarouselApi>();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!api) return;

        api.on("select", () => {
            setCurrentIndex(api.selectedScrollSnap());
        });
    }, [api]);

    // Update currentIndex when dialog opens
    useEffect(() => {
        if (selectedImageIndex !== null && api) {
            api.scrollTo(selectedImageIndex, true);
            setCurrentIndex(selectedImageIndex);
        }
    }, [selectedImageIndex, api]);

    if (!images || images.length === 0) return null;

    // Show max 12 images in the grid
    const visibleImages = images.slice(0, 12);
    const remainingCount = images.length - 12;

    const getGridItemClass = (count: number, index: number) => {
        const base = "relative cursor-pointer overflow-hidden border border-white/5 group bg-white/5";

        // Extremely small counts
        if (count === 1) return cn(base, "col-span-12 aspect-video md:aspect-[21/9]");
        if (count === 2) return cn(base, "col-span-6 aspect-square");

        // Custom 3-image layout
        if (count === 3) {
            if (index === 0) return cn(base, "col-span-12 md:col-span-8 aspect-video md:aspect-auto");
            return cn(base, "col-span-6 md:col-span-4 aspect-square");
        }

        // Feature-first grid logic
        let mobileSpan = "col-span-6";
        let mdSpan = "md:col-span-4"; // Default 3 cols (4/12)
        let lgSpan = "lg:col-span-3"; // Default 4 cols (3/12)
        let aspect = "aspect-square";

        // 1. Desktop (4 columns) - Balance the grid from the start
        const remainderLG = count % 4;
        if (remainderLG !== 0) {
            if (remainderLG === 1 && index === 0) {
                lgSpan = "lg:col-span-12";
                aspect = "aspect-video md:aspect-[21/9]";
            } else if (remainderLG === 2 && index < 2) {
                lgSpan = "lg:col-span-6";
                // Keep aspect-square for 2 featured items as they look great side-by-side
            } else if (remainderLG === 3 && index < 3) {
                if (index === 0) {
                    lgSpan = "lg:col-span-6"; // One larger
                } else {
                    lgSpan = "lg:col-span-3"; // Two normal
                }
            }
        }

        // 2. Tablet (3 columns) - Balance the grid from the start
        const remainderMD = count % 3;
        if (remainderMD !== 0) {
            if (remainderMD === 1 && index === 0) {
                mdSpan = "md:col-span-12";
                if (lgSpan !== "lg:col-span-12") aspect = "aspect-video";
            } else if (remainderMD === 2 && index < 2) {
                mdSpan = "md:col-span-6";
                // If it was already lg:col-span-6, it's already square, which is fine
            }
        }

        // 3. Mobile (2 columns) - Balance the grid from the start
        if (count % 2 !== 0 && index === 0) {
            mobileSpan = "col-span-12";
            if (aspect === "aspect-square") aspect = "aspect-video md:aspect-square";
        }

        // Special fix for 10 images case (to match reference)
        if (count === 10 && index === 0) {
            return cn(base, "col-span-12 md:col-span-6 aspect-square");
        }

        return cn(base, mobileSpan, mdSpan, lgSpan, aspect);
    };

    return (
        <div className="space-y-6">
            <Card className="bg-slate-900/50 border-white/5 rounded-none overflow-hidden">
                <CardContent className="p-4 sm:p-6 md:p-8 space-y-8 md:space-y-12">
                    {title && (
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tight">{title}</h2>
                        </div>
                    )}

                    <div className="grid grid-cols-12 gap-3 md:gap-4">
                        {visibleImages.map((img: any, idx: number) => {
                            const src = img.asset ? urlFor(img.asset).url() : img.externalUrl;
                            const isLastVisible = idx === 11 && remainingCount > 0;

                            return (
                                <motion.div
                                    key={idx}
                                    layoutId={`img-${idx}-${src}`}
                                    onClick={() => setSelectedImageIndex(idx)}
                                    className={getGridItemClass(visibleImages.length, idx)}
                                    whileHover={{ scale: 1.01 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Image
                                        src={src}
                                        alt={img.alt || "Gallery Image"}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {isLastVisible && (
                                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                                            <span className="text-3xl font-black text-white">+{remainingCount}</span>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                </motion.div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            <Dialog open={selectedImageIndex !== null} onOpenChange={(open) => !open && setSelectedImageIndex(null)}>
                <DialogContent
                    showCloseButton={false}
                    className="max-w-none sm:max-w-none w-full h-screen bg-black/95 border-none p-0 overflow-hidden outline-none flex items-center justify-center z-[200]"
                >
                    <div className="relative w-full h-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-6">
                        {/* Upper Status Bar */}
                        <div className="flex items-center justify-end w-full max-w-7xl pt-8">
                            <button
                                onClick={() => setSelectedImageIndex(null)}
                                className="w-12 h-12 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all bg-black/40"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="relative w-full flex-1 max-h-[80vh] flex items-center justify-center group/carousel">
                            <Carousel
                                setApi={setApi}
                                opts={{
                                    loop: true,
                                    startIndex: selectedImageIndex ?? 0
                                }}
                                className="w-full h-full"
                            >
                                <CarouselContent className="h-full ml-0">
                                    {images.map((img: any, idx: number) => {
                                        const src = img.asset ? urlFor(img.asset).url() : img.externalUrl;
                                        return (
                                            <CarouselItem key={idx} className="relative w-full h-full pl-0 flex items-center justify-center">
                                                <div className="relative w-full h-[80vh]">
                                                    <Image
                                                        src={src}
                                                        alt={img.alt || "Full size"}
                                                        fill
                                                        className="object-contain"
                                                        priority={idx === selectedImageIndex}
                                                    />
                                                </div>
                                            </CarouselItem>
                                        );
                                    })}
                                </CarouselContent>

                                {/* Standardized Navigation Buttons - Relative to Container width */}
                                <div className="absolute inset-y-0 left-0 flex items-center -ml-4 md:-ml-20">
                                    <button
                                        onClick={() => api?.scrollPrev()}
                                        className="w-12 h-12 md:w-16 md:h-16 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all bg-black/40 pointer-events-auto"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft size={32} strokeWidth={1} />
                                    </button>
                                </div>

                                <div className="absolute inset-y-0 right-0 flex items-center -mr-4 md:-mr-20">
                                    <button
                                        onClick={() => api?.scrollNext()}
                                        className="w-12 h-12 md:w-16 md:h-16 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all bg-black/40 pointer-events-auto"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight size={32} strokeWidth={1} />
                                    </button>
                                </div>
                            </Carousel>
                        </div>

                        {/* Caption Space with Counter */}
                        <div className="pb-8">
                            <span className="text-xs font-black tracking-[0.4em] uppercase text-white/40">
                                {currentIndex + 1} / {images.length}
                            </span>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
