"use client";

import Link from "next/link";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CornerBorders } from "@/components/ui/corner-borders";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/portfolio/project-card";
import { Filter } from "lucide-react";
import { Button } from "../ui/button";

import { ChevronUp } from "lucide-react";

interface PortfolioProps {
    projects: any[];
    categories: any[];
    services: any[];
}

function PortfolioContent({ projects, categories, services }: PortfolioProps) {
    const searchParams = useSearchParams();
    const serviceIdParam = searchParams.get("service");

    const [activeService, setActiveService] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(6);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const INCREMENT = 6;

    // Helper to find service by slug or ID
    const findServiceId = (slugOrId: string | null) => {
        if (!slugOrId) return null;

        const slug = slugOrId.toLowerCase();

        const service = services.find(s => {
            return (
                s._id === slugOrId ||
                s.slug?.current === slug
            );
        });
        return service?._id || null;
    };

    // Sync state with URL search param
    useEffect(() => {
        if (serviceIdParam) {
            const targetId = findServiceId(serviceIdParam);
            if (targetId) {
                setActiveService(targetId);
                setActiveCategory(null);

                // Automatically scroll to portfolio when filtering via URL
                const scrollTimeout = setTimeout(() => {
                    const element = document.getElementById("portfolio");
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                    }
                }, 400);
                return () => clearTimeout(scrollTimeout);
            }
        }
    }, [serviceIdParam, services]);

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

    // Visible projects
    const visibleProjects = useMemo(() => {
        return filteredProjects.slice(0, visibleCount);
    }, [filteredProjects, visibleCount]);

    const handleServiceChange = (serviceId: string | null) => {
        setActiveService(serviceId);
        setActiveCategory(null);
        setVisibleCount(INCREMENT);
    };

    const handleCategoryChange = (categoryId: string | null) => {
        setActiveCategory(categoryId);
        setVisibleCount(INCREMENT);
    };

    const handleShowMore = () => {
        setVisibleCount(prev => prev + INCREMENT);
    };

    // Handle scroll to top of section
    const scrollToPortfolio = () => {
        const element = document.getElementById("portfolio");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Show button when scrolled into portfolio grid
    useEffect(() => {
        const handleScroll = () => {
            const portfolio = document.getElementById("portfolio");
            if (portfolio) {
                const rect = portfolio.getBoundingClientRect();
                // Show if we are inside the section but have scrolled past the filters
                setShowScrollTop(rect.top < -200 && rect.bottom > 200);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section id="portfolio" className="relative py-24 bg-black -scroll-mt-3 max-w-7xl mx-auto">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col items-center mb-4 text-center space-y-4">
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

                {/* Simplified Filters (No longer sticky) */}
                <div className="flex flex-col items-center gap-8 mb-10">
                    <div className="flex items-stretch backdrop-blur-md border border-white/10 bg-white/5">
                        <Button
                            variant="corners"
                            isActive={!activeService}
                            onClick={() => handleServiceChange(null)}
                            className="relative px-2 md:px-10 py-4  text-[10px] md:text-xs font-black tracking-[0.3em] uppercase transition-all duration-500 rounded-none h-auto"
                        >
                            Всички
                        </Button>
                        {services.map((service) => (
                            <Button
                                variant="corners"
                                key={service._id}
                                isActive={activeService === service._id}
                                onClick={() => handleServiceChange(service._id)}
                                className={cn(
                                    "relative px-4 md:px-12 py-4 text-[10px] md:text-xs font-black tracking-[0.3em] uppercase transition-all duration-500 rounded-none h-auto border-l border-white/10",

                                )}
                            >
                                {service.title}
                            </Button>
                        ))}
                    </div>

                    {/* Category Tabs (Reserved space to prevent jumping) */}
                    <div className="h-[40px] flex items-center justify-center w-full">
                        <AnimatePresence mode="wait">
                            {activeService && filteredCategories.length > 0 ? (
                                <motion.div
                                    key={activeService}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    className="flex flex-wrap justify-center gap-2 md:gap-3 px-4 w-full"
                                >
                                    <Badge
                                        variant="outline"
                                        onClick={() => handleCategoryChange(null)}
                                        className={cn(
                                            "cursor-pointer px-4 py-1.5 border-white/10 text-[10px] font-bold uppercase tracking-widest transition-all rounded-none",
                                            !activeCategory ? "bg-white text-black border-white" : "bg-white/5 text-white/60 hover:text-white"
                                        )}
                                    >
                                        Всички категории
                                    </Badge>
                                    {filteredCategories.map((cat) => (
                                        <Badge
                                            key={cat._id}
                                            variant="outline"
                                            onClick={() => handleCategoryChange(cat._id)}
                                            className={cn(
                                                "cursor-pointer px-4 py-1.5 border-white/10 text-[10px] font-bold uppercase tracking-widest transition-all rounded-none",
                                                activeCategory === cat._id ? "bg-white text-black border-white" : "bg-white/5 text-white/60 hover:text-white"
                                            )}
                                        >
                                            {cat.title}
                                        </Badge>
                                    ))}
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="relative min-h-[400px]">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={`${activeService}-${activeCategory}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-wrap justify-center gap-6"
                        >
                            {visibleProjects.map((project) => (
                                <div
                                    key={project._id}
                                    className={cn(
                                        "w-full transition-all duration-500 md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]",
                                        visibleProjects.length === 1 && "max-w-xl"
                                    )}
                                >
                                    <ProjectCard
                                        project={project}
                                        categories={categories}
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Empty State */}
                    {filteredProjects.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <Filter className="w-12 h-12 text-white/10 mb-4" />
                            <h3 className="text-xl font-bold text-white/60">Няма открити проекти</h3>
                            <p className="text-white/40 text-sm">Моля, изберете друга категория или услуга.</p>
                        </div>
                    )}
                </div>

                {/* Show More Button */}
                {visibleCount < filteredProjects.length && (
                    <div className="flex justify-center mt-16">
                        <Button
                            variant="corners"
                            onClick={handleShowMore}
                            className="px-6 py-2 group relative font-bold tracking-widest uppercase transition-all duration-500 hover:text-white"
                        >
                            <span className="relative z-10">Виж още</span>
                        </Button>
                    </div>
                )}
            </div>

            {/* Sticky Scroll to Top Button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-8 right-8 z-100"
                    >
                        <button
                            onClick={scrollToPortfolio}
                            className="w-12 h-12 border border-white/10 bg-black/50 backdrop-blur-xl flex items-center justify-center hover:border-white/30 hover:bg-white/5 transition-all group"
                        >
                            <ChevronUp size={24} className="text-white/50 group-hover:text-white transition-colors" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export function Portfolio(props: PortfolioProps) {
    return (
        <Suspense fallback={<div className="min-h-[400px]" />}>
            <PortfolioContent {...props} />
        </Suspense>
    );
}

