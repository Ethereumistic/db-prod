"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CornerBorders } from "@/components/ui/corner-borders";
import { urlFor } from "@/lib/sanity/image";

interface Partner {
    name: string;
    logo: {
        asset?: any;
        externalUrl?: string;
    };
    alt?: string;
    logoType: "square" | "horizontal";
    zoomLevel?: string;
}

interface PartnersProps {
    data?: {
        title: string;
        logos: Partner[];
    } | null;
}

export function Partners({ data }: PartnersProps) {
    if (!data || !data.logos || data.logos.length === 0) return null;

    const logos = data.logos;
    // Duplicate logos to ensure seamless looping. 
    // We double it and use x: ["0%", "-50%"] for a perfect loop.
    const marqueeLogos = [...logos, ...logos];

    // Split title to apply gradient to the last word if it matches "Вашият" or just use the last word
    const titleWords = data.title.split(" ");
    const lastWord = titleWords[titleWords.length - 1];
    const mainTitle = titleWords.slice(0, -1).join(" ");

    return (
        <section className="py-20 bg-black overflow-hidden ">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center mb-12 text-center space-y-3">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase">
                        {mainTitle}{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/80 to-white/40">
                            {lastWord}
                        </span>
                    </h2>
                    <div className="w-16 h-1 bg-white/10" />
                </div>

                <div className="relative flex overflow-hidden border-y border-white/5">
                    <motion.div
                        className="flex"
                        animate={{
                            x: ["0%", "-50%"],
                        }}
                        transition={{
                            duration: logos.length * 8, // Speed depends on item count
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    >
                        {marqueeLogos.map((partner, index) => {
                            const logoSrc = partner.logo.externalUrl || (partner.logo.asset ? urlFor(partner.logo.asset).url() : "");

                            if (!logoSrc) return null;

                            return (
                                <div
                                    key={`${partner.name}-${index}`}
                                    className={cn(
                                        "group/partner relative flex items-center justify-center p-8 md:p-12 border-r border-white/5 transition-all duration-500",
                                        "hover:bg-white/10 active:scale-[0.98]",
                                        "w-[200px] md:w-[280px] shrink-0"
                                    )}
                                >
                                    <CornerBorders
                                        groupName="partner"
                                        cornerClassName=""
                                    />

                                    <div className="relative w-full h-12 md:h-16 flex items-center justify-center pointer-events-none">
                                        <Image
                                            src={logoSrc}
                                            alt={partner.alt || partner.name}
                                            width={partner.logoType === "square" ? 120 : 240}
                                            height={partner.logoType === "square" ? 100 : 100}
                                            className={cn(
                                                "object-contain transition-all duration-700 ease-in-out",
                                                "opacity-80",
                                                "group-hover/partner:opacity-100",
                                                // Conditional zoom based on logo type and custom zoomLevel
                                                partner.logoType === "horizontal" ? "scale-110 group-hover/partner:scale-125" : "scale-100 group-hover/partner:scale-110",
                                                partner.zoomLevel && partner.zoomLevel !== "scale-100" ? partner.zoomLevel : ""
                                            )}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
