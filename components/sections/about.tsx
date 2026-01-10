"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";
import { CornerBorders } from "@/components/ui/corner-borders";

const ASSETS_BASE_URL = "https://cdn.jsdelivr.net/gh/Ethereumistic/db-prod-assets/about/";

const owners = [
    {
        name: "Даниел Ненов",
        role: "Режисьор, Сценарист & Монтажист",
        image: "dani.jpg",
        description: "Даниел е творческият двигател на студиото с опит в продукции като „Игри на волята“ и „Hell’s Kitchen“. Неговата сила е в кинематографичното разказване и прецизния монтаж, фокусирайки се върху автентичността и емоцията.",
        socials: [
            { icon: Facebook, href: "https://www.facebook.com/daniel.nenov.52" },
            { icon: Instagram, href: "https://www.instagram.com/dnenov/" },
        ],
        imageStyle: "object-cover object-center transition-transform duration-700 -translate-y-6 scale-100",
    },
    {
        name: "Дилян Калчев",
        role: "Журналист, Редактор & Продуцент",
        image: "dido.png",
        description: "Дилян съчетава образование от Coventry University с опит в Нова телевизия като редактор на „Здравей, България“. Той е гласът на смисленото съдържание, фокусиран върху истории, които вдъхновяват и информират.",
        socials: [
            { icon: Facebook, href: "https://www.facebook.com/didonkin" },
            { icon: Instagram, href: "https://www.instagram.com/dilyankalchev/" },
            { icon: Youtube, href: "https://www.tiktok.com/@dilyankalchev", isTikTok: true },
        ],
        imageStyle: "object-cover object-top transition-transform duration-700",
    }
];

export function About() {
    return (
        <section id="about" className="relative py-24 bg-black overflow-hidden -scroll-mt-5">
            <div className="container max-w-6xl mx-auto px-6 relative z-10">
                {/* Header - Matches Portfolio/Services Guidelines */}
                <div className="flex flex-col items-center mb-8 text-center space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase"
                    >
                        ЗА <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/50 to-white/20">НАС</span>
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
                        className="text-white/40 max-w-2xl text-lg font-light leading-relaxed"
                    >
                        Специлизираме в създаването на филми, видеосъдържание и реклами, съчетавайки креативност и високо качество.
                    </motion.p>
                </div>

                {/* Owners Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto">
                    {owners.map((owner, index) => (
                        <motion.div
                            key={owner.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="group group/nav flex flex-col bg-white/2 border border-white/5 transition-all hover:border-white/10 overflow-hidden"
                        >
                            {/* Upper Zone: Image + Title */}
                            <div className="relative w-full aspect-square overflow-hidden bg-zinc-900">
                                <CornerBorders
                                    groupName="nav"
                                    className="z-20"
                                    cornerClassName="w-8 h-8"
                                />
                                <Image
                                    src={`${ASSETS_BASE_URL}${owner.image}`}
                                    alt={owner.name}
                                    fill
                                    className={cn(
                                        "object-cover object-top transition-all duration-1000 grayscale",
                                        owner.imageStyle,
                                        "group-hover:scale-105"
                                    )}
                                />
                                {/* Bottom transition gradient */}
                                <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-black via-black/60 to-transparent z-10" />

                                <div className="absolute top-6 right-6 flex flex-col items-center gap-2 z-20">
                                    {owner.socials.map((social, sIndex) => (
                                        <Link
                                            key={sIndex}
                                            href={social.href}
                                            target="_blank"
                                            className="w-10 h-10 flex items-center justify-center border border-white/10 bg-black/20 backdrop-blur-sm text-white/40 hover:bg-white hover:text-black transition-all duration-300"
                                        >
                                            <social.icon className="w-5 h-5" />
                                        </Link>
                                    ))}
                                </div>

                                <div className="absolute bottom-6 w-full flex flex-col items-center z-20">
                                    <div className="relative inline-flex flex-col items-center px-6 py-2">
                                        <CornerBorders />
                                        <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase relative z-10 leading-tight">
                                            {owner.name}
                                        </h3>
                                        <p className="text-white/80 font-bold tracking-widest text-[9px] uppercase relative z-10 px-2 py-0.5 mt-1 bg-white/5 border border-white/10 backdrop-blur-sm">
                                            {owner.role}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Lower Zone: Description + Socials */}
                            <div className="w-full px-8 pb-2  flex-1 flex flex-col items-center bg-black">
                                <p className="text-white/50 leading-relaxed font-light text-sm md:text-base text-center italic">
                                    {owner.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
