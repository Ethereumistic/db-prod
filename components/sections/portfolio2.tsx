"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { urlFor } from "@/lib/sanity/image";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CornerBorders } from "@/components/ui/corner-borders";

interface ProjectCategory {
    _id: string;
    title: string;
    description?: string;
    slug: { current: string };
    media?: {
        asset?: {
            _id: string;
            metadata?: {
                palette?: {
                    dominant?: {
                        background?: string;
                    };
                };
            };
        };
        externalUrl?: string;
    };
    categoryType: 'solo' | 'multi';
}

interface Portfolio2Props {
    categories: ProjectCategory[];
}

function CategoryCard({ category, index }: { category: ProjectCategory; index: number }) {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, {
        once: false,
        margin: "-48% 0px -48% 0px" // Extremely tight window to ensure only one triggers at a time
    });

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const imageSrc = category.media?.asset
        ? urlFor(category.media.asset).url()
        : (category.media?.externalUrl || "/placeholder.jpg");

    const dominantColor = category.media?.asset?.metadata?.palette?.dominant?.background || "#ffffff";
    const isActiveOnMobile = isMobile && isInView;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="group/portfolio"
        >
            <Link href={`/${category.slug.current}`}>
                <Card className={cn(
                    "relative aspect-video overflow-hidden border-white/5 bg-zinc-900 transition-all duration-700 rounded-none cursor-pointer",
                    "group-hover/portfolio:border-white/10 group-hover/portfolio:bg-white/2",
                    isActiveOnMobile && "border-white/10 bg-white/2"
                )}>
                    {/* Main Card Corner Borders */}
                    <CornerBorders
                        groupName="portfolio"
                        className="z-20"
                        cornerClassName="w-8 h-8"
                        isActive={isActiveOnMobile}
                        color={dominantColor}
                    />

                    {/* Image */}
                    <Image
                        src={imageSrc}
                        alt={category.title}
                        fill
                        className={cn(
                            "object-cover transition-transform duration-1000 ease-out opacity-60",
                            "group-hover/portfolio:scale-105 group-hover/portfolio:opacity-100",
                            isActiveOnMobile && "scale-105 opacity-100"
                        )}
                    />

                    {/* Gradient Overlay */}
                    <div className={cn(
                        "absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500",
                        "group-hover/portfolio:opacity-70",
                        isActiveOnMobile && "opacity-70"
                    )} />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-2">
                        <div className="relative p-4 transition-all duration-500 w-fit self-start">
                            {/* Inner Text Corner Borders */}
                            <CornerBorders
                                groupName="portfolio"
                                cornerClassName="w-4 h-4"
                                isActive={isActiveOnMobile}
                                color={dominantColor}
                            />

                            <div className="space-y-1 relative z-10">
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white px-0 py-0 transition-all duration-500 uppercase tracking-tighter leading-none mb-1">
                                    {category.title}
                                </h3>
                                {category.description && (
                                    <p className={cn(
                                        "text-white/60 text-xs md:text-base font-light max-w-sm transition-colors duration-500",
                                        "group-hover/portfolio:text-white/90",
                                        isActiveOnMobile && "text-white/90"
                                    )}>
                                        {category.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            </Link>
        </motion.div>
    );
}

export function Portfolio2({ categories }: Portfolio2Props) {
    return (
        <section id="work" className="relative py-24 bg-black max-w-6xl mx-auto scroll-mt-0">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col items-center mb-6 text-center space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase"
                    >
                        ПОРТФОЛИО <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/50 to-white/20">& ПРОЕКТИ</span>
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="w-24 h-1 bg-white/20 origin-center"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-white/40 max-w-2xl text-lg font-light"
                    >
                        Разгледайте нашите проекти и открийте как превръщаме визията в реалност.
                    </motion.p>
                </div>

                {/* Categories Grid - 2 Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">
                    {categories.map((category, index) => (
                        <CategoryCard key={category._id} category={category} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
