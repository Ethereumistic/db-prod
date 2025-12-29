"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CornerBorders } from "@/components/ui/corner-borders";

const partners = [
    { name: "Nova", logo: "2.png", type: "rect", className: "scale-125 group-hover/partner:scale-150" },
    { name: "BNR", logo: "4.png", type: "rect", className: "scale-125 group-hover/partner:scale-150" },
    { name: "OnAir", logo: "3.png", type: "rect" },
    { name: "Euronews", logo: "5.png", type: "rect", className: "scale-115 group-hover/partner:scale-125" },
    { name: "Focus", logo: "7.png", type: "rect", className: "scale-125 group-hover/partner:scale-150" },
    { name: "Izbrah", logo: "6.png", type: "rect", className: "scale-100 group-hover/partner:scale-105" },
    { name: "BNT", logo: "1.png", type: "rect", className: "scale-125 group-hover/partner:scale-150" },
];

// Cache buster for the images
const VERSION = Date.now();
const CDN_BASE = "https://cdn.jsdelivr.net/gh/Ethereumistic/db-prod-assets/partners/";

export function Partners() {
    return (
        <section className="py-20 bg-black overflow-hidden border-b border-white/5">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center mb-12 text-center space-y-3">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase">
                        МЕДИЙНИ <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/80 to-white/40">ИЗЯВИ</span>
                    </h2>
                    <div className="w-16 h-1 bg-white/10" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 border-x border-t border-white/5">
                    {partners.map((partner, index) => (
                        <div
                            key={partner.name}
                            className={cn(
                                "group/partner relative flex items-center justify-center p-6 md:p-8 border-r border-b border-white/5 transition-all duration-500",
                                "hover:bg-white/10 active:scale-[0.98]",
                                // Subtle alternating background
                                index % 2 === 0 ? "bg-white/2" : "bg-transparent"
                            )}
                        >
                            <CornerBorders
                                groupName="partner"
                                cornerClassName="group-hover/partner:scale-125"
                            />

                            <div className="relative w-full h-12 md:h-16 flex items-center justify-center pointer-events-none">
                                <Image
                                    src={`${CDN_BASE}${partner.logo}?v=${VERSION}`}
                                    alt={partner.name}
                                    width={partner.type === "square" ? 64 : 120}
                                    height={partner.type === "square" ? 64 : 40}
                                    className={cn(
                                        "object-contain transition-all duration-700 ease-in-out",
                                        "opacity-80",
                                        "group-hover/partner:opacity-100",
                                        // Use custom className if provided, otherwise default hover scale
                                        partner.className ? partner.className : "group-hover/partner:scale-110"
                                    )}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
