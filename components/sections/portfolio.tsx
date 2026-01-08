"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CornerBorders } from "@/components/ui/corner-borders";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/portfolio/project-card";
import { Filter } from "lucide-react";

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
        <section id="portfolio" className="py-24 bg-black overflow-hidden scroll-mt-20 max-w-7xl mx-auto">
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
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project._id}
                                project={project}
                                categories={categories}
                            />
                        ))}
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
