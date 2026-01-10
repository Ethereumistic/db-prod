"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CornerBorders } from "@/components/ui/corner-borders";
import { Card } from "@/components/ui/card";
import { urlFor } from "@/lib/sanity/image";

interface WorkCardProps {
    project: any;
    baseUrl: string;
}

export function WorkCard({ project, baseUrl }: WorkCardProps) {
    const imageSrc = project.mainImage?.asset
        ? urlFor(project.mainImage.asset).url()
        : (project.mainImage?.externalUrl || "/placeholder.jpg");

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
        >
            <Link href={`${baseUrl}/${project.slug.current}`}>
                <Card className="group relative aspect-square overflow-hidden border-white/5 bg-slate-900/50 hover:border-white/20 transition-all duration-700 rounded-none">
                    <Image
                        src={imageSrc}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent transition-opacity duration-500" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <div className="space-y-4">
                            {project.pageTitle && (
                                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-black">
                                    {project.pageTitle}
                                </p>
                            )}
                            <div className="relative inline-flex items-center self-start">
                                <CornerBorders />
                                <h3 className="text-xl font-black text-white px-4 py-2 relative z-10 uppercase">
                                    {project.title}
                                </h3>
                            </div>
                        </div>
                    </div>
                </Card>
            </Link>
        </motion.div>
    );
}
