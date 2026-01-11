"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useScrollAnchor } from "@/hooks/use-scroll-anchor";
import { Menu, X, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

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
    SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { CornerBorders } from "@/components/ui/corner-borders";

const navItems = [
    // { title: "Начало", href: "/" },
    { title: "Услуги", href: "/#services" },
    { title: "Портфолио", href: "/#work" },
    { title: "За нас", href: "/#about" },
];

export function Navbar() {
    const [scrolled, setScrolled] = React.useState(false);
    const [isShowreelMode, setIsShowreelMode] = React.useState(false);
    const [currentHash, setCurrentHash] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);
    const pathname = usePathname();
    const router = useRouter();

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        const handleHashChange = () => {
            setCurrentHash(window.location.hash);
        };
        const handleShowreelChange = (e: any) => {
            setIsShowreelMode(e.detail);
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("popstate", handleHashChange);
        window.addEventListener("hashchange", handleHashChange);
        window.addEventListener("showreelModeChanged", handleShowreelChange);

        // Initial hash
        setCurrentHash(window.location.hash);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("popstate", handleHashChange);
            window.removeEventListener("hashchange", handleHashChange);
            window.removeEventListener("showreelModeChanged", handleShowreelChange);
        };
    }, []);

    const { handleAnchorClick } = useScrollAnchor();

    const handleExitShowreel = (e: React.MouseEvent) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("exitShowreel"));
    };

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-100 pointer-events-none",
            scrolled ? "py-2" : "py-6",
            isShowreelMode && "py-4 md:py-6"
        )}>
            <div className="container mx-auto px-4 pointer-events-auto">
                <nav className={cn(
                    "flex items-center justify-between border border-white/10 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] px-6 py-2 backdrop-blur-xl shadow-2xl overflow-hidden",
                    scrolled ? "bg-black/20 scale-[0.98]" : "bg-black/20",
                    isShowreelMode ? "w-14 h-14 p-0.5 rounded-none border-white/20 active:scale-100 cursor-pointer" : "w-full rounded-none"
                )}>
                    {/* Logo Section */}
                    <Link
                        href="/"
                        onClick={(e) => {
                            if (isShowreelMode) {
                                handleExitShowreel(e);
                                return;
                            }
                            handleAnchorClick(e, "/");
                            setCurrentHash("");
                        }}
                        className={cn(
                            "relative flex items-center justify-center transition-all duration-500",
                            isShowreelMode ? "w-full h-full" : "hover:opacity-80"
                        )}
                    >
                        <Logo
                            size={isShowreelMode ? "sm" : "sm"}
                            variant={isShowreelMode ? "logomark" : "logo"}
                            layout="horizontal_right"
                            className="transition-all duration-500"
                            textClassName={cn(
                                "lg:inline-block sm:inline-block md:hidden transition-all duration-500",
                                isShowreelMode && "opacity-0 invisible w-0"
                            )}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className={cn(
                        "hidden md:flex items-center gap-4 transition-all duration-500",
                        isShowreelMode && "opacity-0 invisible pointer-events-none w-0 scale-90 translate-x-10"
                    )}>
                        <NavigationMenu>
                            <NavigationMenuList className="gap-2 lg:gap-8">
                                {navItems.map((item) => {
                                    const isHashLink = item.href.startsWith("/#");
                                    const itemHash = isHashLink ? item.href.split("#")[1] : "";

                                    const isActive = isHashLink
                                        ? pathname === "/" && currentHash === `#${itemHash}`
                                        : pathname === item.href && (item.href === "/" ? !currentHash : true);

                                    return (
                                        <NavigationMenuItem key={item.title}>
                                            <Link
                                                href={item.href}
                                                onClick={(e) => {
                                                    handleAnchorClick(e, item.href);
                                                    if (isHashLink) setCurrentHash(`#${itemHash}`);
                                                    else if (item.href === "/") setCurrentHash("");
                                                }}
                                                className={cn(
                                                    navigationMenuTriggerStyle(),
                                                    "bg-transparent relative group/nav h-10 px-4 font-medium",
                                                    "text-white/70 transition-all duration-300",
                                                    isActive ? "text-white font-black" : "hover:text-white"
                                                )}
                                            >
                                                <CornerBorders isActive={isActive} />
                                                <span className="relative z-10">{item.title}</span>
                                            </Link>
                                        </NavigationMenuItem>
                                    );
                                })}
                            </NavigationMenuList>
                        </NavigationMenu>

                        <Link
                            href="/#contact"
                            onClick={(e) => {
                                handleAnchorClick(e, "/#contact");
                                setCurrentHash("#contact");
                            }}
                            className="bg-white py-2 text-black hover:bg-white/90 font-medium px-6 transition-all hover:scale-105 active:scale-95"
                        >
                            Контакти
                        </Link>
                    </div>

                    {/* Mobile Navigation */}
                    <div className={cn(
                        "md:hidden transition-all duration-500",
                        isShowreelMode && "opacity-0 invisible pointer-events-none w-0 scale-90 translate-x-10"
                    )}>
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger
                                render={
                                    <Button variant="ghost" size="icon" className="text-white  transition-transform active:scale-90 h-10 w-10 relative overflow-hidden">
                                        <div className="relative h-6 w-6">
                                            <motion.div
                                                animate={isOpen ? { rotate: 90, opacity: 0, scale: 0 } : { rotate: 0, opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="absolute inset-0 flex items-center justify-center"
                                            >
                                                <Menu className="h-6 w-6" />
                                            </motion.div>
                                            <motion.div
                                                initial={{ rotate: -90, opacity: 0, scale: 0 }}
                                                animate={isOpen ? { rotate: 0, opacity: 1, scale: 1 } : { rotate: -90, opacity: 0, scale: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="absolute inset-0 flex items-center justify-center"
                                            >
                                                <X className="h-6 w-6" />
                                            </motion.div>
                                        </div>
                                    </Button>
                                }
                            />
                            <SheetContent
                                side="right"
                                showCloseButton={false}
                                className={cn("bg-black/95 border-l border-white/10 text-white"
                                    , "backdrop-blur-2xl w-full sm:max-w-none p-0 "
                                    , scrolled ? "mt-2" : " mt-6"
                                )}
                            >
                                {/* Mobile Menu Header - Matches Navbar */}
                                <div className={cn(
                                    "px-4 transition-all duration-500",
                                    scrolled ? "py-2" : "py-6  mt-6"
                                )}>
                                    <div className={cn(
                                        "flex items-center justify-between px-6 py-2 bg-black/20 backdrop-blur-xl",
                                        scrolled && "scale-[0.98]"
                                    )}>

                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="flex flex-col items-center justify-center flex-1 gap-12 px-6">
                                    <div className="flex flex-col gap-6 w-full max-w-xs">
                                        {navItems.map((item) => {
                                            const isHashLink = item.href.startsWith("/#");
                                            const itemHash = isHashLink ? item.href.split("#")[1] : "";
                                            const isActive = isHashLink
                                                ? pathname === "/" && currentHash === `#${itemHash}`
                                                : pathname === item.href && (item.href === "/" ? !currentHash : true);

                                            return (
                                                <div key={item.title} className="flex justify-center">
                                                    <SheetClose render={
                                                        <Link
                                                            href={item.href}
                                                            onClick={(e) => {
                                                                handleAnchorClick(e, item.href);
                                                                if (isHashLink) setCurrentHash(`#${itemHash}`);
                                                                else if (item.href === "/") setCurrentHash("");
                                                            }}
                                                            className={cn(
                                                                "relative group/nav py-4 px-8 inline-flex items-center justify-center transition-all duration-300",
                                                                "text-white/70",
                                                                isActive ? "text-white font-black" : "hover:text-white font-medium"
                                                            )}
                                                        >
                                                            <CornerBorders
                                                                isActive={isActive}
                                                            />
                                                            <span className="text-3xl relative z-10">{item.title}</span>
                                                        </Link>
                                                    } />
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="w-full max-w-xs">
                                        <SheetClose render={
                                            <Link
                                                href="/#contact"
                                                onClick={(e) => {
                                                    handleAnchorClick(e, "/#contact");
                                                    setCurrentHash("#contact");
                                                }}
                                                className="w-full"
                                            >
                                                <Button className="w-full bg-white text-black hover:bg-white/90 font-bold py-8 text-xl transition-all hover:scale-[1.02] active:scale-95">
                                                    СВЪРЖИ СЕ С НАС
                                                </Button>
                                            </Link>
                                        } />
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </nav>

                {/* Sub-navbar Back Button removed from here and moved to individual pages */}
            </div>
        </header>
    );
}
