"use client";

import { motion } from "framer-motion";
import { CornerBorders } from "@/components/ui/corner-borders";

interface LegalLayoutProps {
    title: string;
    children: React.ReactNode;
}

export function LegalLayout({ title, children }: LegalLayoutProps) {
    return (
        <section className="min-h-screen bg-black py-32">
            <div className="container max-w-4xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase mb-4">
                        {title}
                    </h1>
                    <div className="w-24 h-1 bg-white/20" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative bg-white/5 border border-white/10 p-8 overflow-hidden"
                >
                    <CornerBorders cornerClassName="w-16 h-16" isActive />
                    <div className="relative z-10 
                        [&_h3]:text-2xl md:[&_h3]:text-4xl [&_h3]:font-black [&_h3]:uppercase [&_h3]:tracking-tighter [&_h3]:text-white [&_h3]:mt-20 [&_h3]:mb-10 [&_h3]:flex [&_h3]:items-center [&_h3]:gap-4
                        [&_p]:text-white/50 [&_p]:font-light [&_p]:leading-relaxed [&_p]:mb-8 [&_p]:text-xl
                        [&_p_strong]:text-white [&_p_strong]:font-bold 
                        [&_ul]:list-none [&_ul]:pl-0 [&_ul]:space-y-6 [&_ul]:mb-12
                        [&_li]:relative [&_li]:pl-10 [&_li]:text-white/70 [&_li]:font-light [&_li]:text-xl
                        [&_li::before]:content-[''] [&_li::before]:absolute [&_li::before]:left-0 [&_li::before]:top-[0.55rem] [&_li::before]:w-3 [&_li::before]:h-3 [&_li::before]:bg-white/20 [&_li::before]:transition-all hover:[&_li::before]:bg-white hover:[&_li::before]:scale-125
                        [&_a]:text-white [&_a]:underline [&_a]:underline-offset-8 [&_a]:decoration-white/20 hover:[&_a]:decoration-white transition-all">
                        {children}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
