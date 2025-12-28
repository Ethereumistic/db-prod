"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
    const [showreelMode, setShowreelMode] = useState(false);

    // Auto-exit showreel mode on scroll
    useEffect(() => {
        if (!showreelMode) return;

        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowreelMode(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [showreelMode]);

    return (
        <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-black">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={cn(
                        "h-full w-full object-cover transition-opacity duration-1000 ease-in-out",
                        showreelMode ? "opacity-100" : "opacity-60"
                    )}
                >
                    <source
                        src="https://cdn.jsdelivr.net/gh/Ethereumistic/db-prod-assets/hero/showreel.mp4"
                        type="video/mp4"
                    />
                </video>
                {/* Bottom Gradient Fade */}
                <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black to-transparent" />
            </div>

            {/* Hero Content */}
            <div
                className={cn(
                    "container relative z-10 mx-auto px-4 transition-all duration-1000 ease-in-out",
                    showreelMode ? "opacity-0 scale-95 pointer-events-none translate-y-10" : "opacity-100 scale-100"
                )}
            >
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-white/60 text-sm mb-4 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Now accepting bookings for 2026
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
                        CRAFTING <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/80 to-white/40">DIGITAL</span> EXPERIENCES
                    </h1>

                    <p className="text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
                        DB Productions is a premier creative studio specializing in photography, cinematography, and digital storytelling.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Button size="lg" className="bg-white text-black hover:bg-white/90 px-8 py-7 text-lg font-bold transition-all hover:scale-105 active:scale-95 group">
                            Start Your Project
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => setShowreelMode(true)}
                            className="border-white/10 hover:bg-white/5 px-8 py-7 text-lg font-medium transition-all hover:scale-105 active:scale-95"
                        >
                            <Play className="mr-2 h-4 w-4 fill-white" />
                            Watch Showreel
                        </Button>
                    </div>
                </div>
            </div>

            {/* Showreel Mode Toggle Button - Absolute to section now */}
            <div
                className={cn(
                    "absolute bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    showreelMode ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-50 translate-y-20 pointer-events-none"
                )}
            >
                <Button
                    variant="outline"
                    onClick={() => setShowreelMode(false)}
                    className="py-6 px-3 border border-white/10 backdrop-blur-xl hover:bg-white/20 text-white group overflow-hidden"
                >
                    <ArrowLeft className="size-6  group-hover:-translate-x-0.5 transition-transform duration-500" />
                    <span className="sr-only">Exit Showreel</span>
                </Button>
            </div>

            {/* Vignette for depth */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-1" />
        </section>
    );
}
