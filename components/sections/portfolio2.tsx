"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity/image";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

interface ProjectCategory {
    _id: string;
    title: string;
    description?: string;
    slug: { current: string };
    media?: {
        asset?: any;
        externalUrl?: string;
    };
    categoryType: 'solo' | 'multi';
}

interface Portfolio2Props {
    categories: ProjectCategory[];
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
                    {categories.map((category, index) => {
                        const imageSrc = category.media?.asset
                            ? urlFor(category.media.asset).url()
                            : (category.media?.externalUrl || "/placeholder.jpg");


                        return (
                            <motion.div
                                key={category._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <Link href={`/${category.slug.current}`}>
                                    <Card className="group relative aspect-video overflow-hidden border-white/5 bg-zinc-900 transition-all duration-700 rounded-none cursor-pointer">
                                        {/* Image */}
                                        <Image
                                            src={imageSrc}
                                            alt={category.title}
                                            fill
                                            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-60 group-hover:opacity-100"
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />

                                        {/* Content */}
                                        <div className="absolute inset-0 flex flex-col justify-end p-8">
                                            <div className="space-y-1">
                                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white px-0 py-0 transition-all duration-500 relative z-10 uppercase tracking-tighter leading-none mb-2">
                                                    {category.title}
                                                </h3>
                                                {category.description && (
                                                    <p className="text-white/60 text-sm md:text-base font-light max-w-sm">
                                                        {category.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
