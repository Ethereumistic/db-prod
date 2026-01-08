"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CornerBorders } from "@/components/ui/corner-borders";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { urlFor } from "@/lib/sanity/image";

interface ProjectCardProps {
    project: any;
    categories: any[];
}

export function ProjectCard({ project, categories }: ProjectCardProps) {
    const imageSrc = project.mainImage?.asset
        ? urlFor(project.mainImage.asset).url()
        : (project.mainImage?.externalUrl || "/placeholder.jpg");

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "circOut" }}
        >
            <Link href={`/portfolio/${project.slug.current}`}>
                <Card className="group group/nav relative aspect-square overflow-hidden border-white/5 bg-slate-900/50 hover:border-white/20 transition-all duration-700">
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
                            <div className="flex flex-wrap gap-2">
                                {categories
                                    .filter(cat => project.categoryIds?.includes(cat._id) || project.categories?.some((c: any) => c._id === cat._id))
                                    .map(cat => (
                                        <Badge key={cat._id} className="bg-white/10 backdrop-blur-md border-white/20 text-[10px] text-white/80 uppercase">
                                            {cat.title}
                                        </Badge>
                                    ))}
                            </div>

                            <div className="relative inline-flex items-center">
                                <CornerBorders />
                                <h3 className="text-3xl font-black text-white px-6 py-2 transition-all duration-500 relative z-10">
                                    {project.title}
                                </h3>
                            </div>

                            {project.metrics && (
                                <p className="text-white/50 text-xs font-medium uppercase tracking-widest">
                                    {project.metrics}
                                </p>
                            )}
                        </div>
                    </div>
                </Card>
            </Link>
        </motion.div>
    );
}
