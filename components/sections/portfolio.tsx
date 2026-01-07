"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CornerBorders } from "@/components/ui/corner-borders";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity/image";
import { Play, ExternalLink, Filter } from "lucide-react";

interface PortfolioProps {
    projects: any[];
    categories: any[];
    services: any[];
}

export function Portfolio({ projects, categories, services }: PortfolioProps) {
    const [activeService, setActiveService] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    // Filter categories based on selected service
    const filteredCategories = useMemo(() => {
        if (!activeService) return [];
        return categories.filter(cat => cat.serviceId === activeService);
    }, [categories, activeService]);

    // Filter projects based on service and category
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesService = activeService ? project.serviceId === activeService : true;
            const matchesCategory = activeCategory ? project.categoryIds?.includes(activeCategory) : true;
            return matchesService && matchesCategory;
        });
    }, [projects, activeService, activeCategory]);

    const handleServiceChange = (serviceId: string | null) => {
        setActiveService(serviceId);
        setActiveCategory(null); // Reset category when service changes
    };

    return (
        <section id="portfolio" className="py-24 bg-black overflow-hidden scroll-mt-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col items-center mb-16 text-center space-y-4">
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
                        Разгледайте нашите най-значими проекти и открийте как превръщаме визията в реалност.
                    </motion.p>
                </div>

                {/* Filters */}
                <div className="flex flex-col items-center gap-8 mb-16">
                    {/* Service Tabs */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => handleServiceChange(null)}
                            className={cn(
                                "relative px-6 py-2 text-sm font-bold tracking-widest uppercase transition-all duration-300",
                                !activeService ? "text-white" : "text-white/40 hover:text-white/60"
                            )}
                        >
                            <CornerBorders isActive={!activeService} />
                            <span className="relative z-10">Всички</span>
                        </button>
                        {services.map((service) => (
                            <button
                                key={service._id}
                                onClick={() => handleServiceChange(service._id)}
                                className={cn(
                                    "relative px-6 py-2 text-sm font-bold tracking-widest uppercase transition-all duration-300",
                                    activeService === service._id ? "text-white" : "text-white/40 hover:text-white/60"
                                )}
                            >
                                <CornerBorders isActive={activeService === service._id} />
                                <span className="relative z-10">{service.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* Category Tabs (Only if service is selected) */}
                    <AnimatePresence mode="wait">
                        {activeService && filteredCategories.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-wrap justify-center gap-3"
                            >
                                <Badge
                                    variant="outline"
                                    onClick={() => setActiveCategory(null)}
                                    className={cn(
                                        "cursor-pointer px-4 py-1 border-white/10 text-xs transition-all",
                                        !activeCategory ? "bg-white text-black border-white" : "text-white/60 hover:text-white hover:border-white/30"
                                    )}
                                >
                                    Всички категории
                                </Badge>
                                {filteredCategories.map((cat) => (
                                    <Badge
                                        key={cat._id}
                                        variant="outline"
                                        onClick={() => setActiveCategory(cat._id)}
                                        className={cn(
                                            "cursor-pointer px-4 py-1 border-white/10 text-xs transition-all",
                                            activeCategory === cat._id ? "bg-white text-black border-white" : "text-white/60 hover:text-white hover:border-white/30"
                                        )}
                                    >
                                        {cat.title}
                                    </Badge>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => {
                            const imageSrc = project.mainImage?.asset
                                ? urlFor(project.mainImage.asset).url()
                                : (project.mainImage?.externalUrl || "/placeholder.jpg");

                            return (
                                <motion.div
                                    key={project._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, ease: "circOut" }}
                                >
                                    <Link href={`/portfolio/${project.slug.current}`}>
                                        <Card className="group relative aspect-4/5 overflow-hidden border-white/5 bg-slate-900/50 hover:border-white/20 transition-all duration-700">
                                            {/* Image */}
                                            <Image
                                                src={imageSrc}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                            />

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent transition-opacity duration-500" />

                                            {/* Content */}
                                            <div className="absolute inset-0 flex flex-col justify-end p-8">
                                                <div className="space-y-4">
                                                    <div className="flex gap-2">
                                                        {project.projectType === 'video' && (
                                                            <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-[10px] text-white/80">
                                                                VIDEO
                                                            </Badge>
                                                        )}
                                                        {project.platform && (
                                                            <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-[10px] text-white/80 uppercase">
                                                                {project.platform}
                                                            </Badge>
                                                        )}
                                                    </div>

                                                    <h3 className="text-2xl font-black text-white leading-tight">
                                                        {project.title}
                                                    </h3>

                                                    {project.metrics && (
                                                        <p className="text-white/50 text-xs font-medium uppercase tracking-widest">
                                                            {project.metrics}
                                                        </p>
                                                    )}

                                                    <div className="pt-4 flex items-center justify-between">
                                                        {project.videoUrl ? (
                                                            <div className="inline-flex items-center gap-2 text-white text-sm font-bold group/btn">
                                                                <div className="w-10 h-10 bg-white flex items-center justify-center text-black group-hover/btn:scale-110 transition-transform">
                                                                    <Play size={16} fill="currentColor" />
                                                                </div>
                                                                <span>WATCH</span>
                                                            </div>
                                                        ) : (
                                                            <div className="inline-flex items-center gap-2 text-white text-sm font-bold group/btn">
                                                                <div className="w-10 h-10 border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white group-hover/btn:bg-white group-hover/btn:text-black transition-all">
                                                                    <ExternalLink size={16} />
                                                                </div>
                                                                <span>VIEW PROJECT</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                    >
                        <Filter className="w-12 h-12 text-white/10 mb-4" />
                        <h3 className="text-xl font-bold text-white/60">Няма открити проекти</h3>
                        <p className="text-white/40 text-sm">Моля, изберете друга категория или услуга.</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
