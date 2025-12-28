import {
    Video,
    Camera,
    Layers,
    Mic2,
    Share2,
    PenTool
} from "lucide-react";
import Image from "next/image";
import {
    Card,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const services = [
    {
        title: "Video",
        description: "High-end cinematography and commercial video production tailored for your brand.",
        icon: Video,
        image: "video.jpg",
    },
    {
        title: "Photography",
        description: "Professional photography capturing moments and products with precision.",
        icon: Camera,
        image: "photography.jpg",
    },
    {
        title: "Post-production",
        description: "Expert editing, color grading, and visual effects to bring your vision to life.",
        icon: Layers,
        image: "post-production.jpg",
    },
    {
        title: "Voice-over",
        description: "Professional voice talent providing clear and engaging narration for any project.",
        icon: Mic2,
        image: "voice-over.jpg",
    },
    {
        title: "Social Media Content",
        description: "Engaging, short-form content designed to trend across all digital platforms.",
        icon: Share2,
        image: "social-media.jpg",
    },
    {
        title: "Copy Writing",
        description: "Compelling storytelling and scriptwriting that resonates with your audience.",
        icon: PenTool,
        image: "copy-write.jpg",
    },
];

const ASSETS_BASE_URL = "https://cdn.jsdelivr.net/gh/Ethereumistic/db-prod-assets/services/";

export function Services() {
    return (
        <section id="services" className="py-12 bg-black scroll-mt-7">
            <div className="container max-w-5xl mx-auto px-4">
                <div className="flex flex-col items-center mb-10 text-center space-y-3">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white">
                        OUR <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/80 to-white/40">SERVICES</span>
                    </h2>
                    <div className="w-16 h-1 bg-white/10" />
                    <p className="text-white/50 max-w-xl text-base font-light">
                        Comprehensive creative solutions spanning from initial concept to the final deliverable.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((service) => (
                        <Card
                            key={service.title}
                            className="relative bg-white/5 border-white/10 hover:border-white/20 transition-all duration-500 group overflow-hidden aspect-square flex flex-col justify-end"
                        >
                            {/* Background Image - Persistent with hover state changes */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={`${ASSETS_BASE_URL}${service.image}`}
                                    alt={service.title}
                                    fill
                                    className="object-cover scale-100 group-hover:scale-110 transition-all duration-1000 ease-out opacity-40 group-hover:opacity-60"
                                />
                                {/* Persistent Overlay for readability */}
                                <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent transition-opacity duration-500" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 p-4">
                                <div className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/20 backdrop-blur-sm transition-all duration-500 group-hover:bg-white group-hover:border-white mb-3">
                                    <service.icon className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform duration-500">
                                    {service.title}
                                </h3>
                                <p className="text-white/60 group-hover:text-white/90 transition-colors duration-500 text-xs leading-relaxed line-clamp-2">
                                    {service.description}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
