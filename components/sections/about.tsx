"use client";


import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, Youtube, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CornerBorders } from "@/components/ui/corner-borders";
import {
    Sheet,
    SheetContent,
    SheetClose,
} from "@/components/ui/sheet";
import TikTokIcon from "@/components/ui/tiktok";

const ASSETS_BASE_URL = "https://cdn.jsdelivr.net/gh/Ethereumistic/db-prod-assets/about/";

const owners = [
    {
        name: "Даниел Ненов",
        role: "Режисьор, Оператор & Монтажист",
        image: "dani.png",
        description: "Творческият двигател на студиото, специализиран в кинематографичното разказване и прецизния монтаж.",
        fullBio: "Даниел е творческият двигател на студиото с опит в продукции като „Игри на волята“ и „Hell’s Kitchen“. Неговата сила е в кинематографичното разказване и прецизния монтаж, фокусирайки се върху автентичността и емоцията.",
        highlights: [
            { label: "Телевизионни проекти", value: "Игри на волята, Hell’s Kitchen" },
            { label: "Ключови постижения", value: "Съосновател на DB Productions" },
            { label: "Документално кино", value: "Режисьор на „Чистота или Смърт“" }
        ],
        socials: [
            { icon: Facebook, href: "https://www.facebook.com/daniel.nenov.52" },
            { icon: Instagram, href: "https://www.instagram.com/dnenov/" },
            { icon: Youtube, href: "https://www.youtube.com/@nenovideocreator" },
        ],
        imageStyle: "object-cover object-[50%_15%] transition-transform duration-700 ",
        imageStyleSheet: "object-cover object-[50%_0%] transition-transform duration-700",
        imageStyleSheetMobile: "object-cover object-[50%_10%] transition-transform duration-700",
        side: "left" as const,
    },
    {
        name: "Дилян Калчев",
        role: "Продуцент, Сценарист & Инфлуенсър",
        image: "dido.png",
        description: "Експерт в медийната продукция и журналистиката, фокусиран върху вдъхновяващи и смислени истории.",
        fullBio: "Дилян обединява кинообразованието си от Coventry University с журналистическия си опит в „Здравей, България“ по Нова телевизия. Като глас на смисленото съдържание, той се фокусира върху истории, които вдъхновяват и информират.",
        highlights: [
            { label: "Образование", value: "Coventry University (UK) – Кино и Телевизия" },
            { label: "Медиен опит", value: "Репортер в „Здравей, България“ (Нова ТВ)" },
            { label: "Digital Impact", value: "65,000+ последователи в соц. мрежи" }
        ],
        socials: [
            { icon: Facebook, href: "https://www.facebook.com/didonkin" },
            { icon: Instagram, href: "https://www.instagram.com/dilyankalchev/" },
            { icon: TikTokIcon, href: "https://www.tiktok.com/@dilyankalchev", isTikTok: true },
            { icon: Youtube, href: "https://www.youtube.com/@dilyankalchev", isYoutube: true },
        ],
        imageStyle: "object-cover object-top transition-transform duration-700",
        imageStyleSheet: "object-cover object-[50%_0%] transition-transform duration-700",
        imageStyleSheetMobile: "object-cover object-top transition-transform duration-700",
        side: "right" as const,
    }
];

export function About() {
    const [selectedOwner, setSelectedOwner] = useState<typeof owners[0] | null>(null);

    return (
        <section id="about" className="relative py-24 bg-black overflow-hidden -scroll-mt-5">
            <div className="container max-w-6xl mx-auto px-6 relative z-10">
                {/* Header - Matches Portfolio/Services Guidelines */}
                <div className="flex flex-col items-center mb-16 text-center space-y-4">
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
                            onClick={() => setSelectedOwner(owner)}
                            className="group group/nav flex flex-col bg-white/2 border border-white/5 transition-all hover:border-white/10 overflow-hidden cursor-pointer"
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
                                        "object-cover transition-all duration-1000 grayscale group-hover:grayscale-0",
                                        owner.imageStyle,
                                        "group-hover:scale-105"
                                    )}
                                />
                                {/* Overlay "Learn More" */}
                                <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
                                    <span className="px-3 py-1.5 border border-white/20 bg-black/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest -translate-x-2 group-hover:translate-x-0 transition-transform duration-500 block">
                                        Научи повече
                                    </span>
                                </div>

                                {/* Bottom transition gradient */}
                                <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-black via-black/60 to-transparent z-10" />

                                <div className="absolute top-6 right-6 flex flex-col items-center gap-2 z-20" onClick={(e) => e.stopPropagation()}>
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

                            {/* Lower Zone: Description */}
                            <div className="w-full px-8 py-8 flex-1 flex flex-col items-center bg-black border-t border-white/5">
                                <p className="text-white/50 leading-relaxed font-light text-sm md:text-base text-center italic">
                                    {owner.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Unified Detail Sheet / Dialog */}
                <Sheet open={!!selectedOwner} onOpenChange={(open) => !open && setSelectedOwner(null)}>
                    <SheetContent
                        side="bottom"
                        showCloseButton={false}
                        className="fixed inset-0 w-full z-5000 h-full bg-black border-none p-0 overflow-hidden"
                    >
                        <div className="relative h-full bg-linear-to-b from-zinc-900 via-black to-black overflow-y-auto 2xl:overflow-hidden">
                            <div className="grid grid-cols-1 2xl:grid-cols-2 h-full divide-y 2xl:divide-y-0 2xl:divide-x divide-white/5">
                                {owners.map((owner) => (
                                    <div
                                        key={owner.name}
                                        className={cn(
                                            "flex-col h-full",
                                            // On 2xl+ we show both. On smaller we show only selected.
                                            owner.name === selectedOwner?.name ? "flex" : "hidden 2xl:flex",
                                            owner.side === "left" ? "md:flex-row" : "md:flex-row-reverse"
                                        )}
                                    >
                                        {/* Image half */}
                                        <div className="relative w-full md:w-1/2 h-[45vh] md:h-full overflow-hidden bg-zinc-900">
                                            {/* Side-specific Close Button */}
                                            <SheetClose className={cn(
                                                "fixed 2xl:absolute top-3 z-100 group/close flex items-center justify-center w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 transition-all hover:bg-white/10 hover:border-white/20",
                                                owner.side === "left" ? "left-3" : "right-3"
                                            )}>
                                                <CornerBorders groupName="close" />
                                                <X size={20} className="text-white/40 group-hover:text-white transition-all duration-300 group-hover:rotate-90" />
                                            </SheetClose>

                                            <Image
                                                src={`${ASSETS_BASE_URL}${owner.image}`}
                                                alt={owner.name}
                                                fill
                                                className={cn(
                                                    "hidden md:block",
                                                    owner.imageStyleSheet
                                                )}
                                            />
                                            <Image
                                                src={`${ASSETS_BASE_URL}${owner.image}`}
                                                alt={owner.name}
                                                fill
                                                className={cn(
                                                    "block md:hidden",
                                                    owner.imageStyleSheetMobile
                                                )}
                                            />
                                            <div className={cn(
                                                "absolute inset-0 hidden md:block",
                                                owner.side === "left"
                                                    ? "bg-linear-to-r from-transparent via-transparent to-black/60"
                                                    : "bg-linear-to-l from-transparent via-transparent to-black/60"
                                            )} />
                                            <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black via-black/80 to-transparent md:hidden" />
                                            {/* Mobile Name Overlay - Positioned on the edge of the transition */}
                                            <div className="absolute bottom-6 left-8 md:hidden z-20">
                                                <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none whitespace-nowrap">
                                                    {owner.name}
                                                </h2>
                                            </div>
                                        </div>

                                        {/* Content half */}
                                        <div className={cn(
                                            "flex-1 p-8 flex flex-col justify-start space-y-4 md:space-y-10 2xl:space-y-12 overflow-y-auto items-start text-left",
                                            owner.side === "right" && "md:items-end md:text-right"
                                        )}>
                                            <div className="hidden md:block space-y-1 md:space-y-4">
                                                <h2 className="text-3xl md:text-6xl lg:text-6xl xl:text-6xl 2xl:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                                                    {owner.name.split(' ')[0]} <br />
                                                    <span className="text-white/40">{owner.name.split(' ')[1]}</span>
                                                </h2>
                                            </div>

                                            {/* Summarized Content Blocks */}
                                            <div className="grid grid-cols-1 gap-4 md:gap-10 w-full max-w-xl">
                                                <div className="space-y-2 md:space-y-4">
                                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 border-b border-white/5 pb-2">Профил</h4>
                                                    <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-white/60 leading-relaxed font-light italic">
                                                        {owner.fullBio}
                                                    </p>
                                                </div>

                                                <div className="space-y-2 md:space-y-4">
                                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 border-b border-white/5 pb-2">Акценти</h4>
                                                    <div className="grid grid-cols-1 gap-3 md:gap-8">
                                                        {owner.highlights.map(item => (
                                                            <div key={item.label} className="group/item">
                                                                <p className="text-[9px] text-white/40 uppercase font-bold tracking-tighter mb-1">{item.label}</p>
                                                                <p className="text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-base text-white/80 font-light">{item.value}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer Actions */}
                                            <div className={cn(
                                                "pt-4 md:pt-8 flex items-center gap-6 w-full max-w-xl",
                                                owner.side === "right" && "md:flex-row-reverse"
                                            )}>
                                                <div className="flex gap-4">
                                                    {owner.socials.map((social, sIndex) => (
                                                        <Link
                                                            key={sIndex}
                                                            href={social.href}
                                                            target="_blank"
                                                            className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300"
                                                        >
                                                            <social.icon className="w-5 h-5 md:w-7 md:h-7" />
                                                        </Link>
                                                    ))}
                                                </div>
                                                <div className="h-px flex-1 bg-white/5" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </section>
    );
}