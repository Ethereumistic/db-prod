"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";
import { CornerBorders } from "@/components/ui/corner-borders";

interface ServiceData {
    _id: string;
    title: string;
    slug?: { current: string };
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
    // Only show the first 2 services as requested by the user
    const displayServices = services.slice(0, 2);

    return (
        <section id="services" className="relative py-24 bg-black overflow-hidden -scroll-mt-3">
            <div className="container max-w-6xl mx-auto px-6 relative z-10">
                {/* Header - Matches Portfolio Guidelines */}
                <div className="flex flex-col items-center mb-8 text-center space-y-4 ">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black tracking-widest text-white uppercase "
                    >
                        НАШИТЕ <span className=" text-transparent bg-clip-text  bg-linear-to-r from-white via-white/50 to-white/20">УСЛУГИ</span>
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
                    >Правим видеа с послание, защото истинският успех идва от съдържание със смисъл
                    </motion.p>
                </div>

                {/* Services Grid - Reduced Gap */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-5xl mx-auto">
                    {displayServices.map((service, index) => {
                        const imageSrc = service.image?.asset
                            ? urlFor(service.image.asset).url()
                            : (service.image?.externalUrl || "/placeholder.jpg");

                        const Content = (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className="group cursor-pointer relative"
                            >
                                {/* Image Container with CornerBorders */}
                                <div className="relative aspect-square mb-8 overflow-hidden border border-white/5 transition-all duration-700 group-hover:border-white/10 group-hover:bg-white/2">
                                    <CornerBorders
                                        groupName="service"
                                        className="z-20"
                                        cornerClassName="w-8 h-8 group-hover/service:border-white"
                                    />

                                    <Image
                                        src={imageSrc}
                                        alt={service.title}
                                        fill
                                        className={cn(
                                            "object-contain p-8 md:p-12 transition-all duration-1000 ease-in-out",
                                            "grayscale brightness-150 contrast-125 opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100 group-hover:contrast-100 group-hover:scale-[1.02]"
                                        )}
                                        priority={index < 2}
                                    />

                                    {/* Bottom Decorative Line */}
                                    {/* <div className="absolute bottom-0 left-0 h-px bg-white/30 w-0 group-hover:w-full transition-all duration-700 ease-in-out" /> */}
                                </div>

                                {/* Text Content */}
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <span className="text-white/10 text-3xl md:text-4xl font-black tracking-tighter pt-1 transition-colors duration-500 group-hover:text-white/30">
                                            {index + 1}.
                                        </span>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white uppercase tracking-widest leading-tight transition-all duration-500">
                                                {service.title}
                                            </h3>
                                            <p className="text-white/40 text-sm md:text-lg leading-relaxed max-w-md font-medium transition-colors duration-500 group-hover:text-white/80">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>


                                </div>
                            </motion.div>
                        );

                        return (
                            <Link
                                key={service._id}
                                href="#work"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const element = document.getElementById("work");
                                    if (element) {
                                        element.scrollIntoView({ behavior: "smooth" });
                                        // Update URL hash without jumping
                                        window.history.pushState(null, "", "#work");
                                    }
                                }}
                            >
                                {Content}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
