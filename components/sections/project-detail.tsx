"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CornerBorders } from "@/components/ui/corner-borders";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/lib/sanity/image";
import * as LucideIcons from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    ChevronLeft,
    Share2,
    Calendar,
    User,
    ArrowRight,
    Play,
    BarChart3,
    FileText,
    Info,
    Wrench
} from "lucide-react";
import { ProjectCard } from "@/components/portfolio/project-card";
import { ProjectGallery, GridStyle } from "@/components/portfolio/project-gallery";

// Smooth height transition component for sidebar summary
function SmoothSummarySection({
    activeVideoIndex,
    activeTitle,
    activeSummary
}: {
    activeVideoIndex: number;
    activeTitle: string;
    activeSummary: string | null;
}) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | 'auto'>('auto');

    // Measure content height whenever it changes
    useEffect(() => {
        if (contentRef.current) {
            const resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    setHeight(entry.contentRect.height);
                }
            });
            resizeObserver.observe(contentRef.current);
            return () => resizeObserver.disconnect();
        }
    }, [activeVideoIndex, activeSummary]);

    return (
        <motion.div
            className="relative overflow-hidden"
            animate={{ height }}
            transition={{
                duration: 0.4,
                ease: [0.23, 1, 0.32, 1] // Custom smooth easing
            }}
        >
            <div ref={contentRef} className="space-y-8">
                <AnimatePresence mode="wait" initial={false}>
                    {activeSummary?.trim() && (
                        <motion.div
                            key={activeVideoIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="space-y-8"
                        >
                            <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-white/30 border-b border-white/5 pb-4 pr-20">
                                {activeTitle}
                            </h4>

                            <div className="relative group/nav p-6 bg-white/2 hover:bg-white/5 transition-all">
                                <CornerBorders isActive={false} groupName="nav" />
                                <div className="relative overflow-hidden">
                                    <div className="float-left mr-4 mt-1 w-10 h-10 bg-white/5 flex items-center justify-center text-white/30 group-hover/nav:text-white transition-colors">
                                        <Info size={18} />
                                    </div>
                                    <p className="text-base text-white/70 leading-relaxed font-light">
                                        {activeSummary}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

// Vertically centered sticky sidebar component
function CenteredStickySidebar({ children }: { children: React.ReactNode }) {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [stickyTop, setStickyTop] = useState(0);

    useEffect(() => {
        const calculateStickyTop = () => {
            if (!sidebarRef.current) return;

            const sidebarHeight = sidebarRef.current.offsetHeight;
            const viewportHeight = window.innerHeight;

            // ========================================
            // NAVBAR OFFSET - Adjust this value to fine-tune
            // the vertical positioning accounting for your navbar
            // ========================================
            const navbarOffset = 60; // px - tweak this value!

            // ========================================
            // ADDITIONAL TOP OFFSET - Extra breathing room
            // above the sidebar if needed
            // ========================================
            const additionalTopOffset = 0; // px - tweak this value!

            // Calculate center position
            // Formula: (viewport - navbar - sidebarHeight) / 2 + navbar + additionalOffset
            const availableSpace = viewportHeight - navbarOffset;
            const topPosition = navbarOffset + (availableSpace - sidebarHeight) / 2 + additionalTopOffset;

            // Ensure minimum top position (never go above navbar)
            const minTop = navbarOffset + 16; // 16px minimum gap from navbar
            const finalTop = Math.max(minTop, topPosition);

            setStickyTop(finalTop);
        };

        // Initial calculation
        calculateStickyTop();

        // Recalculate on window resize
        window.addEventListener('resize', calculateStickyTop);

        // Use ResizeObserver to detect sidebar height changes
        const resizeObserver = new ResizeObserver(() => {
            calculateStickyTop();
        });

        if (sidebarRef.current) {
            resizeObserver.observe(sidebarRef.current);
        }

        return () => {
            window.removeEventListener('resize', calculateStickyTop);
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <motion.div
            ref={sidebarRef}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="sticky -mt-4 transition-[top] duration-300 ease-out"
            style={{ top: stickyTop }}
        >
            {children}
        </motion.div>
    );
}

interface ProjectDetailProps {
    project: any;
    relatedProjects?: any[];
    categories?: any[];
}

export function ProjectDetail({ project, relatedProjects, categories }: ProjectDetailProps) {
    const getImageUrl = (img: any) => {
        if (!img) return null;
        if (img.asset) return urlFor(img.asset).url();
        return img.externalUrl;
    };

    const imageSrc = getImageUrl(project.featuredImage) || getImageUrl(project.mainImage) || "/placeholder.jpg";

    const getVideoData = (url: string) => {
        if (!url) return null;

        // YouTube
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const isShort = url.includes('/shorts/');
            const id = isShort
                ? url.split('/shorts/')[1]?.split('?')[0]
                : (url.split('v=')[1]?.split('&')[0] || url.split('/').pop());

            return {
                embedUrl: `https://www.youtube.com/embed/${id}${isShort ? '' : '?vq=hd1080'}`,
                isVertical: isShort
            };
        }

        // Vimeo
        if (url.includes('vimeo.com')) {
            const id = url.split('/').pop();
            return {
                embedUrl: `https://player.vimeo.com/video/${id}`,
                isVertical: false
            };
        }

        // TikTok
        if (url.includes('tiktok.com')) {
            const id = url.match(/\/video\/(\d+)/)?.[1];
            if (id) {
                return {
                    embedUrl: `https://www.tiktok.com/embed/v2/${id}`,
                    isVertical: true
                };
            }
        }

        // Instagram
        if (url.includes('instagram.com')) {
            const id = url.match(/\/(?:p|reels|reel)\/([A-Za-z0-9_-]+)/)?.[1];
            if (id) {
                return {
                    embedUrl: `https://www.instagram.com/p/${id}/embed`,
                    isVertical: url.includes('/reels/') || url.includes('/reel/')
                };
            }
        }

        return null;
    };

    const mainVideoData = getVideoData(project.videoUrl);

    const [activeVideoIndex, setActiveVideoIndex] = useState<number>(-1); // -1 for main video
    const containerRef = useRef<HTMLDivElement>(null);

    // Force scroll to top on mount
    useLayoutEffect(() => {
        // Handle scroll restoration
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        // Scroll to top instantly
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant' as any
        });

        // Fallback for some browsers / edge cases
        const timeoutId = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);

        return () => {
            clearTimeout(timeoutId);
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'auto';
            }
        };
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.getAttribute('data-video-index') || '-1');
                    setActiveVideoIndex(index);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        // Observe main video within this container
        const mainVideo = containerRef.current.querySelector('[data-video-index="-1"]');
        if (mainVideo) observer.observe(mainVideo);

        // Observe additional videos within this container
        const addVideos = containerRef.current.querySelectorAll('.additional-video-container');
        addVideos.forEach(vid => observer.observe(vid));

        return () => observer.disconnect();
    }, [project.additionalVideos]);

    const activeSummary = activeVideoIndex === -1
        ? project.summary
        : project.additionalVideos?.[activeVideoIndex]?.summary;

    const activeTitle = activeVideoIndex === -1
        ? "Основни Детайли"
        : project.additionalVideos?.[activeVideoIndex]?.title || `Видео ${activeVideoIndex + 2}`;

    return (
        <section ref={containerRef} className="min-h-screen bg-black py-24">
            <div className="container mx-auto px-4">
                {/* Navigation Back */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link
                        href="/#portfolio"
                        className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
                    >
                        <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all">
                            <ChevronLeft size={20} />
                        </div>
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative mb-24">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Title Section */}
                        <div className="space-y-6">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl sm:text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9]"
                            >
                                {project.title}
                            </motion.h1>
                        </div>

                        {/* Visuals / Multi-Video */}
                        <div className="md:space-y-32 space-y-8">
                            {/* Primary Visual */}
                            <motion.div
                                id="main-video-container"
                                data-video-index="-1"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className={`relative overflow-hidden border border-white/10 bg-slate-900 group ${mainVideoData?.isVertical ? "aspect-9/16 max-w-[400px] mx-auto" : "aspect-video"
                                    }`}
                            >
                                {mainVideoData ? (
                                    <div className="absolute inset-0 z-20">
                                        <iframe
                                            src={mainVideoData.embedUrl}
                                            title={project.title}
                                            className="w-full h-full border-0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                ) : (
                                    <>
                                        <Image
                                            src={imageSrc}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black via-transparent to-transparent opacity-60" />
                                    </>
                                )}
                            </motion.div>

                            {/* Mobile Project Summary Card - Visible only on mobile, below first video */}
                            {project.summary?.trim() && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="relative group/summ p-6 sm:p-8 border border-white/5 bg-white/2 backdrop-blur-sm lg:hidden"
                                >
                                    <CornerBorders isActive={false} groupName="summ" />

                                    {/* Project Year - bottom left */}
                                    <div className="top-2 right-2 absolute">
                                        <p className="text-white/40 font-black text-xs">
                                            {project.projectDate
                                                ? new Date(project.projectDate).getFullYear()
                                                : new Date(project._createdAt).getFullYear()}
                                        </p>
                                    </div>

                                    {/* Badges */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-[8px] text-white px-3 py-0.5 font-black tracking-widest uppercase">
                                            {project.service?.title}
                                        </Badge>
                                        {project.categories?.slice(0, 2).map((cat: any) => (
                                            <Badge key={cat.slug.current} variant="outline" className="border-white/10 text-[8px] text-white/40 px-3 py-0.5 font-black tracking-widest uppercase whitespace-nowrap">
                                                {cat.title}
                                            </Badge>
                                        ))}

                                    </div>

                                    {/* Summary */}
                                    <h4 className="text-[9px] sm:text-[10px] font-black tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/20 mb-3">Основни Детайли</h4>
                                    <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
                                        {project.summary}
                                    </p>

                                    {/* Skills for mobile */}
                                    {project.skills && project.skills.length > 0 && (
                                        <div className="mt-5 pt-4 border-t border-white/5">
                                            <p className="text-[8px] text-white/20 uppercase font-black tracking-[0.2em] mb-2">Умения</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.skills.map((skill: string, sIdx: number) => (
                                                    <span key={sIdx} className="text-[9px] bg-white/5 text-white/60 px-2 py-0.5 uppercase font-bold tracking-wider">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}



                                    {/* External Links for mobile */}
                                    {project.externalLinks?.length > 0 && (
                                        <div className="mt-5 pt-4 border-t border-white/5 space-y-3">
                                            <h4 className="text-[9px] font-black tracking-[0.4em] uppercase text-white/20">Директни връзки</h4>
                                            <div className="grid grid-cols-1 gap-3">
                                                {project.externalLinks.map((link: any, lIdx: number) => {
                                                    const LinkIcon = (LucideIcons as any)[link.icon] || LucideIcons.ArrowRight;
                                                    return (
                                                        <div key={lIdx} className="relative group/nav flex items-center gap-4 bg-white/2 hover:bg-white/5 p-3 transition-all w-full border border-white/5 hover:border-white/10">
                                                            <CornerBorders isActive={false} groupName="nav" />
                                                            <div className="w-8 h-8 bg-white/5 flex items-center justify-center text-white/30 group-hover/nav:text-white transition-colors shrink-0">
                                                                <LinkIcon size={16} />
                                                            </div>
                                                            <a
                                                                href={link.url}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 group-hover/nav:text-white transition-colors"
                                                            >
                                                                {link.label}
                                                            </a>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* Additional Videos */}
                            {project.additionalVideos?.map((vid: any, idx: number) => (
                                <motion.div
                                    key={idx}
                                    data-video-index={idx}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="additional-video-container  space-y-8"
                                >
                                    <div className="space-y-6">
                                        <h3 className="text-2xl sm:text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9] text-left">
                                            {vid.title || `Видео ${idx + 2}`}
                                        </h3>
                                    </div>
                                    <div className={`relative overflow-hidden border border-white/5 bg-slate-900/50 ${getVideoData(vid.url)?.isVertical ? "aspect-9/16 max-w-[400px] mx-auto" : "aspect-video"
                                        }`}>
                                        {getVideoData(vid.url) ? (
                                            <iframe
                                                src={getVideoData(vid.url)?.embedUrl}
                                                title={vid.title}
                                                className="w-full h-full border-0"
                                                allowFullScreen
                                            ></iframe>
                                        ) : (
                                            <div className="flex items-center justify-center h-full aspect-video">
                                                <a href={vid.url} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white underline underline-offset-4 font-black tracking-widest uppercase text-[10px]">
                                                    ВРЪЗКА КЪМ ВИДЕО
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    {/* Video Summary Card (Visible only on Mobile, hidden on Desktop as requested) */}
                                    {vid.summary?.trim() && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            className="relative group/summ p-5 sm:p-6 border border-white/5 bg-white/2 backdrop-blur-sm lg:hidden"
                                        >
                                            <CornerBorders isActive={false} groupName="summ" />
                                            <div className="space-y-3">
                                                <h4 className="text-[9px] sm:text-[10px] font-black tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/20">Резюме на видео</h4>
                                                <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed font-light italic">
                                                    "{vid.summary}"
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Gallery Section */}
                        {project.gallery?.images?.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="space-y-8 mt-24"
                            >
                                <div className="space-y-4">
                                    <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                                        Галерия
                                    </h3>
                                    <div className="w-12 sm:w-16 h-1 bg-white/20" />
                                </div>
                                <ProjectGallery
                                    images={project.gallery.images}
                                    gridStyle={(project.gallery.gridStyle as GridStyle) || "3x2"}
                                />
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar Info - Hidden on mobile, visible on desktop */}
                    <div className="hidden lg:block lg:col-span-4">
                        <CenteredStickySidebar>
                            <div className="p-8 pt-16 border border-white/10 bg-white/5 backdrop-blur-xl relative space-y-10">
                                {/* Badges in Top Right */}
                                <div className="absolute top-6 right-6 flex items-end gap-2 pointer-events-none">
                                    <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-[8px] text-white px-3 py-0.5 font-black tracking-widest uppercase">
                                        {project.service?.title}
                                    </Badge>
                                    {project.categories?.slice(0, 2).map((cat: any) => (
                                        <Badge key={cat.slug.current} variant="outline" className="border-white/10 text-[8px] text-white/40 px-3 py-0.5 font-black tracking-widest uppercase whitespace-nowrap">
                                            {cat.title}
                                        </Badge>
                                    ))}
                                </div>

                                {/* Smooth Height Animated Summary Section */}
                                <SmoothSummarySection
                                    activeVideoIndex={activeVideoIndex}
                                    activeTitle={activeTitle}
                                    activeSummary={activeSummary}
                                />

                                {/* Meta Items Grid */}
                                <div className="grid grid-cols-1 gap-4">
                                    {/* Skills Section */}
                                    {project.skills && project.skills.length > 0 && (
                                        <div className="relative group/nav p-5 bg-white/2 hover:bg-white/5 transition-all">
                                            <CornerBorders isActive={false} groupName="nav" />
                                            <div className="flex items-center gap-5">
                                                <div className="w-10 h-10 bg-white/5 flex items-center justify-center text-white/30 group-hover/nav:text-white transition-colors shrink-0">
                                                    <Wrench size={18} />
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-[9px] text-white/20 uppercase font-black tracking-[0.2em]">Умения</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.skills.map((skill: string, sIdx: number) => (
                                                            <span key={sIdx} className="text-[10px] bg-white/5 text-white/60 px-2 py-1 uppercase font-bold tracking-wider hover:bg-white/10 hover:text-white transition-all">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {project.platform && (
                                        <div className="relative group/nav p-5 bg-white/2 hover:bg-white/5 transition-all">
                                            <CornerBorders isActive={false} groupName="nav" />
                                            <div className="flex items-center gap-5">
                                                <div className="w-10 h-10 bg-white/5 flex items-center justify-center text-white/30 group-hover/nav:text-white transition-colors">
                                                    <Share2 size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-[9px] text-white/20 uppercase font-black tracking-[0.2em] mb-1">Платформа</p>
                                                    <p className="text-white font-black text-sm uppercase">{project.platform}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="relative group/nav p-5 bg-white/2 hover:bg-white/5 transition-all">
                                        <CornerBorders isActive={false} groupName="nav" />
                                        <div className="flex items-center gap-5">
                                            <div className="w-10 h-10 bg-white/5 flex items-center justify-center text-white/30 group-hover/nav:text-white transition-colors">
                                                <Calendar size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-white/20 uppercase font-black tracking-[0.2em] mb-1">Дата на проекта</p>
                                                <p className="text-white font-black text-sm uppercase">
                                                    {project.projectDate
                                                        ? new Date(project.projectDate).toLocaleDateString('bg-BG', { year: 'numeric', month: 'long' })
                                                        : new Date(project._createdAt).getFullYear()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {project.metrics && (
                                        <div className="relative group/nav p-5 bg-white/2 hover:bg-white/5 transition-all">
                                            <CornerBorders isActive={false} groupName="nav" />
                                            <div className="flex items-center gap-5">
                                                <div className="w-10 h-10 bg-white/5 flex items-center justify-center text-white/30 group-hover/nav:text-white transition-colors">
                                                    <BarChart3 size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-[9px] text-white/20 uppercase font-black tracking-[0.2em] mb-1">Ключови показатели</p>
                                                    <div className="text-3xl font-black bg-clip-text text-transparent bg-linear-to-r from-white via-white/80 to-white/40 leading-none">
                                                        {project.metrics}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* External Links */}
                                {project.externalLinks?.length > 0 && (
                                    <div className="space-y-4 pt-4 border-t border-white/5">
                                        <h4 className="text-[9px] font-black tracking-[0.4em] uppercase text-white/20 px-2">Директни връзки</h4>
                                        <div className="grid grid-cols-1 gap-4">
                                            {project.externalLinks.map((link: any, lIdx: number) => {
                                                const LinkIcon = (LucideIcons as any)[link.icon] || LucideIcons.ArrowRight;
                                                return (
                                                    <div key={lIdx} className="relative group/nav flex items-center gap-5 bg-white/2 hover:bg-white/5 p-4 transition-all w-full border border-white/5 hover:border-white/10">
                                                        <CornerBorders isActive={false} groupName="nav" />
                                                        <div className="w-10 h-10 bg-white/5 flex items-center justify-center text-white/30 group-hover/nav:text-white transition-colors shrink-0">
                                                            <LinkIcon size={18} />
                                                        </div>
                                                        <a
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-xs font-black uppercase tracking-[0.2em] text-white/50 group-hover/nav:text-white transition-colors"
                                                        >
                                                            {link.label}
                                                        </a>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CenteredStickySidebar>
                    </div>
                </div>



                {/* Related Projects */}
                {relatedProjects && relatedProjects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12 mb-24"
                    >
                        <div className="flex flex-col items-start gap-4">
                            <h4 className="text-3xl md:text-5xl font-black text-white/40 uppercase tracking-tighter">
                                ДРУГИ <span className="text-white">{project.categories?.[0]?.title || 'ПОДОБНИ ПРОЕКТИ'}</span>
                            </h4>
                            <div className="w-20 h-1 bg-white/10" />
                        </div>

                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                                dragFree: true,
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-4">
                                {relatedProjects.map((relProject) => (
                                    <CarouselItem key={relProject._id} className="pl-4 basis-[85%] md:basis-1/2 lg:basis-[31%]">
                                        <ProjectCard
                                            project={relProject}
                                            categories={categories || []}
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className="flex justify-end gap-2 mt-8">
                                <CarouselPrevious className="static translate-y-0 bg-slate-900 hover:bg-slate-800 border-white/10 text-white" />
                                <CarouselNext className="static translate-y-0 bg-slate-900 hover:bg-slate-800 border-white/10 text-white" />
                            </div>
                        </Carousel>
                    </motion.div>
                )}

                {/* Beautified Contact CTA - Moved outside grid for full width */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative group p-12 overflow-hidden border border-white/5 bg-slate-900/40 w-full"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full group-hover:bg-white/10 transition-all duration-1000" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="space-y-4 text-center md:text-left max-w-lg">
                            <h4 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
                                Имате подобен проект наум?
                            </h4>
                            <p className="text-white/40 font-light text-xl">
                                Нека обсъдим как можем да реализираме Вашата визия заедно.
                            </p>
                        </div>
                        <Link
                            href="/#contact"
                            className="h-auto py-6 px-6 bg-white text-black hover:bg-white/90 text-sm font-black uppercase tracking-[0.2em] transition-transform hover:scale-105 active:scale-95 inline-flex items-center justify-center"
                        >
                            Свържете се с нас
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}