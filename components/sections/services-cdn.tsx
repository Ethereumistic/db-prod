"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import {
    Card,
} from "@/components/ui/card";
import { CornerBorders } from "@/components/ui/corner-borders";
import { urlFor } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";

interface ServiceData {
    _id: string;
    title: string;
    description: string;
    icon: string;
    route?: string;
    image: {
        asset?: any;
        externalUrl?: string;
    };
}

interface ServicesProps {
    services: ServiceData[];
}

export function ServicesCDN({ services }: ServicesProps) {
    return (
        <section id="services" className="py-24 bg-black scroll-mt-20">
            <div className="container max-w-6xl mx-auto px-4">
                <div className="flex flex-col items-center mb-16 text-center space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase"
                    >
                        НАШИТЕ <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/80 to-white/40">УСЛУГИ</span>
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="w-20 h-1 bg-white/10"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-white/40 max-w-xl text-lg font-light"
                    >
                        Цялостни творчески решения – от първоначалната концепция до финалния резултат.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => {
                        const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.Scissors;
                        const imageSrc = service.image?.asset
                            ? urlFor(service.image.asset).url()
                            : (service.image?.externalUrl || "/placeholder.jpg");

                        const CardContent = (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card
                                    className="relative border-white/5 hover:border-white/20 transition-all duration-700 group group/nav overflow-hidden aspect-4/5 flex flex-col justify-end h-full bg-slate-900/40 backdrop-blur-sm"
                                >
                                    {/* Background Image */}
                                    <div className="absolute inset-0 z-0">
                                        <Image
                                            src={imageSrc}
                                            alt={service.title}
                                            fill
                                            className="object-cover scale-100 group-hover:scale-110 transition-all duration-1000 ease-out opacity-60 group-hover:opacity-100"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent transition-all duration-500" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 p-8">
                                        <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 group-hover:bg-white group-hover:border-white mb-6">
                                            <IconComponent className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                                        </div>
                                        <div className="relative inline-flex items-center mb-4">
                                            <CornerBorders />
                                            <h3 className="text-2xl font-black text-white px-6 py-2 transition-all duration-500 relative z-10">
                                                {service.title}
                                            </h3>
                                        </div>
                                        <p className="text-white/50 group-hover:text-white/80 transition-colors duration-500 text-sm leading-relaxed line-clamp-3 font-medium">
                                            {service.description}
                                        </p>
                                    </div>
                                </Card>
                            </motion.div>
                        );

                        if (service.route) {
                            return (
                                <Link key={service._id} href={service.route}>
                                    {CardContent}
                                </Link>
                            );
                        }

                        return <div key={service._id}>{CardContent}</div>;
                    })}
                </div>
            </div>
        </section>
    );
}
