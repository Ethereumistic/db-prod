"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useScrollAnchor } from "@/hooks/use-scroll-anchor";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const navItems = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Services", href: "/#services" },
    { title: "Portfolio", href: "/portfolio" },
    { title: "Contact", href: "/contact" },
];

export function Navbar() {
    const [scrolled, setScrolled] = React.useState(false);
    const pathname = usePathname();
    const router = useRouter();

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { handleAnchorClick } = useScrollAnchor();

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
            scrolled ? "py-2" : "py-6"
        )}>
            <div className="container mx-auto px-4">
                <nav className={cn(
                    "flex items-center justify-between border border-white/10 transition-all duration-500 ease-in-out px-6 py-2 backdrop-blur-xl shadow-2xl",
                    scrolled ? "bg-black/20 scale-[0.98]" : "bg-black/20"
                )}>
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                        <Logo
                            size="sm"
                            variant="logo"
                            layout="horizontal_right"
                            textClassName="hidden sm:inline-block"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {navItems.map((item) => (
                                    <NavigationMenuItem key={item.title}>
                                        <Link
                                            href={item.href}
                                            onClick={(e) => handleAnchorClick(e, item.href)}
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                "bg-transparent hover:bg-white/10  text-white/70 hover:text-white transition-colors cursor-pointer"
                                            )}
                                        >
                                            {item.title}
                                        </Link>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>

                        <Button className="bg-white text-black hover:bg-white/90 font-medium px-6 transition-all hover:scale-105 active:scale-95">
                            Get Started
                        </Button>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger
                                render={
                                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 transition-transform active:scale-90">
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                }
                            />
                            <SheetContent side="right" className="bg-black/95 border-l border-white/10 text-white backdrop-blur-2xl">
                                <SheetHeader>
                                    <SheetTitle className="text-left">
                                        <Logo size="md" className="mb-4" />
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-6 mt-8">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.title}
                                            href={item.href}
                                            onClick={(e) => handleAnchorClick(e, item.href)}
                                            className="text-3xl font-bold text-white/70 hover:text-white transition-all hover:translate-x-2"
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                    <Button className="mt-8 bg-white text-black hover:bg-white/90 font-bold py-8 text-xl">
                                        Book Now
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </nav>
            </div>
        </header>
    );
}
