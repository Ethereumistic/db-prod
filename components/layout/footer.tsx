"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { useScrollAnchor } from "@/hooks/use-scroll-anchor";

const footerLinks = [
    { title: "About", href: "/about" },
    { title: "Services", href: "/#services" },
    { title: "Portfolio", href: "/portfolio" },
    { title: "Contact", href: "/contact" },
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-16 lg:pl-8 pl-0">
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
                            Premium creative studio specializing in photography, cinematography, and digital storytelling. Delivering excellence since 2018.
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
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-8">
                        {/* Quick Links */}
                        <div className="space-y-6 text-center md:text-left md:pl-12">
                            <h3 className="text-white font-bold tracking-tight text-lg">Quick Links</h3>
                            <nav className="flex flex-col space-y-4">
                                {footerLinks.map((link) => (
                                    <Link
                                        key={link.title}
                                        href={link.href}
                                        onClick={(e) => handleAnchorClick(e, link.href)}
                                        className="text-foreground/70 hover:text-foreground transition-colors text-sm"
                                    >
                                        {link.title}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-8 text-center md:text-left">
                            <div className="space-y-4">
                                <h3 className="text-white font-bold tracking-tight text-lg">Get in touch</h3>
                                <a
                                    href="mailto:video@dbproductions.net"
                                    className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors group"
                                >
                                    <Mail className="w-4 h-4 text-foreground/30 group-hover:text-foreground transition-colors" />
                                    video@dbproductions.net
                                </a>
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pt-4">
                                <div className="space-y-2">
                                    <p className="text-white font-medium">Даниел Ненов</p>
                                    <a
                                        href="tel:+359882664006"
                                        className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors group text-sm"
                                    >
                                        <Phone className="w-3 h-3 text-foreground/30 group-hover:text-foreground transition-colors" />
                                        +359 882 664 006
                                    </a>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-white font-medium">Дилян Калчев</p>
                                    <a
                                        href="tel:+359877611162"
                                        className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors group text-sm"
                                    >
                                        <Phone className="w-3 h-3 text-foreground/30 group-hover:text-foreground transition-colors" />
                                        +359 877 611 162
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-foreground/60 text-xs tracking-widest uppercase group">
                    <p>© {new Date().getFullYear()} DB PRODUCTIONS. ALL RIGHTS RESERVED.</p>
                    <Link href="https://echoray.io" target="_blank" className="group"><p className="text-foreground/60">CRAFTED WITH PRECISION | <span className="text-foreground/60 transition-colors group-hover:text-foreground">ECHORAY.IO</span></p></Link>
                </div>
            </div>
        </footer>
    );
}
