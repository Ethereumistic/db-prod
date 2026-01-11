"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { useScrollAnchor } from "@/hooks/use-scroll-anchor";
import { CornerBorders } from "@/components/ui/corner-borders";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "../ui/button";

const footerLinks = [
    { title: "За нас", href: "/about" },
    { title: "Услуги", href: "/#services" },
    { title: "Портфолио", href: "/portfolio" },
    { title: "Контакт", href: "/contact" },
];

const socials = [
    { icon: Facebook, href: "https://www.facebook.com/dbproductions.bg", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/dbproductions.bg/", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/channel/UC5EYL-EBq0kzqSpLPe3Bl5A", label: "Youtube" },
];

export function Footer() {
    const { handleAnchorClick } = useScrollAnchor();

    return (
        <footer className="bg-black border-t border-white/5 pt-16 pb-8">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-14 gap-16 lg:gap-8 mb-16 lg:pl-8 pl-0">
                    {/* Left Side: Logo */}
                    <div className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-8">
                        <Link
                            href="/"
                            onClick={(e) => handleAnchorClick(e, "/")}
                            className="hover:opacity-80 transition-opacity"
                        >
                            <Logo size="xl" variant="logo" layout="vertical" />
                        </Link>
                        <p className="text-foreground/60 max-w-sm text-center lg:text-left text-sm font-light leading-relaxed">
                            Бутиково творческо студио, специализирано във фотографията, киното и дигиталното разказване на истории. Постигаме съвършенство от 2018 г.
                        </p>
                        <div className="flex items-center gap-4">
                            {socials.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 flex items-center justify-center border border-white/10 text-white/50 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Contact & Links */}
                    <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-8">
                        {/* Quick Links */}
                        <div className="space-y-6 text-center md:text-left md:pl-12">
                            <h3 className="text-white font-bold tracking-tight text-lg">Бързи връзки</h3>
                            <nav className="flex flex-col space-y-4">
                                {footerLinks.map((link) => (
                                    <Link
                                        key={link.title}
                                        href={link.href}
                                        onClick={(e) => handleAnchorClick(e, link.href)}
                                        className="text-foreground/70 hover:text-foreground transition-all duration-300 text-sm py-2 px-4 relative group/nav inline-block w-fit mx-auto md:mx-0"
                                    >
                                        <CornerBorders />
                                        <span className="relative z-10">{link.title}</span>

                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-8 text-center md:text-left">
                            <div className="space-y-4 flex flex-col items-center">
                                <h3 className="text-white text-center font-bold tracking-tight text-lg">Свържете се с нас</h3>
                                <div className="relative group/nav inline-block p-4 mx-auto md:mx-0">
                                    <CornerBorders />
                                    <a
                                        href="mailto:video@dbproductions.net"
                                        className="relative z-10 inline-flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors group"
                                    >
                                        <Mail className="w-4 h-4 text-foreground/30 group-hover:text-foreground transition-colors" />
                                        video@dbproductions.net
                                    </a>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 lg:gap-2 pt-4 ">

                                <div className=" relative group/nav p-4 min-w-fit w-fit mx-auto md:mx-0">
                                    <CornerBorders />
                                    <div className="relative z-10 flex-row  items-center gap-4 text-left">
                                        <Avatar size="2x" className="border translate-x-[30%] border-white/10 group-hover/nav:border-white/20 transition-colors duration-300">
                                            <AvatarImage
                                                src="https://cdn.jsdelivr.net/gh/Ethereumistic/db-prod-assets/about/dido.png"
                                                alt="Дилян Калчев"
                                                className="scale-[2.5] object-[center_-78%] -translate-x-[7%]"
                                            />
                                            <AvatarFallback className="text-[10px]">ДК</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-center text-white font-medium whitespace-nowrap">Дилян Калчев</p>
                                            <a
                                                href="tel:+359877611162"
                                                className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors group text-sm whitespace-nowrap"
                                            >
                                                +359 877 611 162
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className=" relative group/nav p-4 min-w-fit w-fit mx-auto md:mx-0 ">
                                    <CornerBorders />
                                    <div className="relative z-10 flex-row items-center gap-4 text-left">
                                        <Avatar size="2x" className="border translate-x-[35%] border-white/10 group-hover/nav:border-white/20 transition-colors duration-300">
                                            <AvatarImage
                                                src="https://cdn.jsdelivr.net/gh/Ethereumistic/db-prod-assets/about/dani.png"
                                                alt="Даниел Ненов"
                                                className="scale-[2.5] object-[center_-35%] translate-x-[5%]"
                                            />
                                            <AvatarFallback className="text-[10px]">ДН</AvatarFallback>
                                        </Avatar>
                                        <div className="">
                                            <p className="text-white text-center font-medium whitespace-nowrap">Даниел Ненов</p>
                                            <a
                                                href="tel:+359882664006"
                                                className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors group text-sm whitespace-nowrap"
                                            >
                                                {/* <Phone className="w-3 h-3 text-foreground/30 group-hover:text-foreground transition-colors" /> */}
                                                +359 882 664 006
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-foreground/60 text-xs tracking-widest group">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p>© {new Date().getFullYear()} db PRODUCTIONS. ВСИЧКИ ПРАВА ЗАПАЗЕНИ.</p>
                        <div className="flex gap-4 md:gap-6">
                            <Link href="/privacy-policy" className="hover:text-white transition-colors">ПОЛИТИКА ЗА ПОВЕРИТЕЛНОСТ</Link>
                            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">ОБЩИ УСЛОВИЯ</Link>
                        </div>
                    </div>
                    <Link href="https://echoray.io" target="_blank" className="group"><p className="text-foreground/60">СЪЗДАДЕНО С ПРЕЦИЗНОСТ | <span className="text-foreground/60 transition-colors group-hover:text-foreground">ECHORAY.IO</span></p></Link>
                </div>
            </div>
        </footer>
    );
}
