"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CornerBorders } from "@/components/ui/corner-borders";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/lib/sanity/image";
import * as LucideIcons from "lucide-react";
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

interface ProjectDetailProps {
    project: any;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
    const imageSrc = project.mainImage?.asset
        ? urlFor(project.mainImage.asset).url()
        : (project.mainImage?.externalUrl || "/placeholder.jpg");

    const getEmbedUrl = (url: string) => {
        if (!url) return null;
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const id = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
            return `https://www.youtube.com/embed/${id}`;
        }
        if (url.includes('vimeo.com')) {
            const id = url.split('/').pop();
            return `https://player.vimeo.com/video/${id}`;
        }
        return null;
    };

    return (
        <section className="min-h-screen bg-black pt-26 pb-24">
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
                                className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9]"
                            >
                                {project.title}
                            </motion.h1>
                        </div>

                        {/* Visuals / Multi-Video */}
                        <div className="space-y-32">
                            {/* Primary Visual */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="relative aspect-video overflow-hidden border border-white/10 bg-slate-900 group"
                            >
                                {getEmbedUrl(project.videoUrl) ? (
                                    <div className="absolute inset-0 z-20">
                                        <iframe
                                            src={getEmbedUrl(project.videoUrl) as string}
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

                            {/* Additional Videos */}
                            {project.additionalVideos?.map((vid: any, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="space-y-8"
                                >
                                    <div className="space-y-6">
                                        <h3 className="text-6xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9] text-left">
                                            {vid.title || `Видео ${idx + 2}`}
                                        </h3>
                                    </div>
                                    <div className="relative aspect-video overflow-hidden border border-white/5 bg-slate-900/50">
                                        {getEmbedUrl(vid.url) ? (
                                            <iframe
                                                src={getEmbedUrl(vid.url) as string}
                                                title={vid.title}
                                                className="w-full h-full border-0"
                                                allowFullScreen
                                            ></iframe>
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <a href={vid.url} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white underline underline-offset-4 font-black tracking-widest uppercase text-[10px]">
                                                    ВРЪЗКА КЪМ ВИДЕО
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="lg:col-span-4 lg:block relative">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="sticky top-32"
                        >
                            <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-xl relative space-y-10">
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

                                <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-white/30 border-b border-white/5 pb-4 pr-20">Детайли на проект</h4>

                                {/* Project Summary Section */}
                                {project.summary && (
                                    <div className="relative group/nav p-6 bg-white/2 hover:bg-white/5 transition-all">
                                        <CornerBorders isActive={false} groupName="nav" />
                                        <div className="relative overflow-hidden">
                                            <div className="float-left mr-4 mt-1 w-10 h-10 bg-white/5 flex items-center justify-center text-white/30 group-hover/nav:text-white transition-colors">
                                                <Info size={18} />
                                            </div>
                                            <p className="text-base text-white/70 leading-relaxed font-light">
                                                {project.summary}
                                            </p>
                                        </div>
                                    </div>
                                )}

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
                        </motion.div>
                    </div>
                </div>

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
                            href="/contact"
                            className="h-auto py-6 px-12 bg-white text-black hover:bg-white/90 text-sm font-black uppercase tracking-[0.2em] transition-transform hover:scale-105 active:scale-95 inline-flex items-center justify-center"
                        >
                            Свържете се с нас
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
