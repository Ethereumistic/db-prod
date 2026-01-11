"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CornerBorders } from "@/components/ui/corner-borders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Combobox,
    ComboboxContent,
    ComboboxItem,
    ComboboxInput,
    ComboboxList,
} from "@/components/ui/combobox";
import { Loader2 } from "lucide-react";
import { Logo } from "@/components/ui/logo";

const inquiryTypes = [
    { value: "question", label: "Имам въпрос относно услуга" },
    { value: "inquiry", label: "Искам да направя запитване за проект" },
    { value: "opinion", label: "Искам да споделя своето мнение" },
    { value: "compliment", label: "Искам да изкажа комплимент" },
    { value: "proposal", label: "Искам да предложа сътрудничество" },
];

/**
 * Custom hook to detect mobile screen size
 */
function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
}

export function Contact() {
    const isMobile = useMediaQuery("(max-width: 768px)");

    // Condition rendering to avoid duplicate DOM and ID conflicts
    return isMobile ? <ContactMovie /> : <ContactBoard />;
}

// --- CLAPPERBOARD VERSION (DESKTOP) ---
type BoardAnimationPhase = "idle" | "pattern" | "opening" | "closing" | "success";

function ContactBoard() {
    const [selectedInquiry, setSelectedInquiry] = useState("");
    const [animationPhase, setAnimationPhase] = useState<BoardAnimationPhase>("idle");
    const [capturedName, setCapturedName] = useState("");
    const nameInputRef = useRef<HTMLInputElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (animationPhase !== "idle") return;

        // Pixel-perfect scroll to section with offset (40)
        setTimeout(() => {
            const target = sectionRef.current;
            if (target) {
                const top = target.getBoundingClientRect().top + window.pageYOffset - 40;
                window.scrollTo({ top, behavior: "smooth" });
            }
        }, 50);

        const nameValue = nameInputRef.current?.value || "клиент";
        setCapturedName(nameValue);

        const form = e.currentTarget;
        const formData = new FormData(form);
        formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "");
        formData.append("subject", `Ново запитване от ${nameValue} - db Productions`);

        setAnimationPhase("pattern");
        setTimeout(() => setAnimationPhase("opening"), 600);
        setTimeout(() => setAnimationPhase("closing"), 1200);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            setTimeout(() => {
                if (data.success) {
                    setAnimationPhase("success");
                    form.reset();
                } else {
                    setAnimationPhase("idle");
                    alert(data.message || "Грешка при изпращането. Моля, опитайте отново.");
                }
            }, 1500);
        } catch (error) {
            setTimeout(() => {
                setAnimationPhase("idle");
                alert("Възникна техническа грешка. Моля, опитайте по-късно.");
            }, 1500);
        }
    };

    const resetForm = () => {
        setAnimationPhase("idle");
        setCapturedName("");
        setSelectedInquiry("");
    };

    const isAnimating = animationPhase === "pattern" || animationPhase === "opening" || animationPhase === "closing";
    const showPattern = animationPhase === "pattern" || animationPhase === "opening" || animationPhase === "closing" || animationPhase === "success";

    const getBlurAmount = () => {
        if (animationPhase === "pattern") return "blur(2px)";
        if (animationPhase === "opening") return "blur(8px)";
        if (animationPhase === "closing") return "blur(4px)";
        return "blur(0px)";
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative py-24 bg-black scroll-mt-8"
        >
            <div className="container max-w-4xl mx-auto px-6 relative z-10">
                <div className="relative overflow-visible">
                    <motion.div
                        className="relative"
                        style={{ transformOrigin: "bottom left" }}
                        animate={{ rotateZ: animationPhase === "opening" ? -20 : 0 }}
                        transition={{
                            duration: 0.3,
                            ease: animationPhase === "closing" ? [0.68, -0.55, 0.265, 1.55] : "easeOut",
                        }}
                    >
                        <motion.div
                            className="absolute inset-0 pointer-events-none overflow-hidden border border-border"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: showPattern ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div
                                className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4"
                                style={{
                                    background: `repeating-linear-gradient(45deg, #ffffff 0px, #ffffff 40px, #000000 40px, #000000 80px)`,
                                }}
                            />
                        </motion.div>

                        <motion.div
                            className="flex flex-col items-center text-center space-y-4 p-2 relative z-10"
                            animate={{ opacity: showPattern ? 0 : 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
                                СВЪРЖЕТЕ СЕ С <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/50 to-white/20">НАС</span>
                            </h2>
                            <div className="w-24 h-1 bg-white/20 origin-center" />
                            <p className="text-white/40 max-w-2xl text-lg font-light leading-relaxed mb-4">
                                Готови ли сте да реализираме Вашата идея? Пишете ни и ще се свържем с Вас.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative bg-white/5 border border-white/10 p-8 md:p-12 overflow-hidden"
                >
                    <CornerBorders cornerClassName="w-8 h-8" />
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="board-name">Име</Label>
                                <div className="relative">
                                    <motion.div
                                        animate={{
                                            filter: isAnimating ? getBlurAmount() : "blur(0px)",
                                            opacity: animationPhase === "success" ? 0 : 1,
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className={animationPhase === "success" ? "absolute inset-0" : ""}
                                    >
                                        <Input
                                            ref={nameInputRef}
                                            id="board-name"
                                            name="name"
                                            required
                                            placeholder="Вашето име"
                                            className="h-12"
                                            disabled={isAnimating || animationPhase === "success"}
                                        />
                                    </motion.div>
                                    {animationPhase === "success" && (
                                        <motion.div
                                            initial={{ filter: "blur(8px)", opacity: 0 }}
                                            animate={{ filter: "blur(0px)", opacity: 1 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <div className="h-12 flex items-center px-3 bg-white/5 border border-white/10 text-white">
                                                Благодарим Ви, {capturedName || "клиент"}!
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="board-email">Имейл</Label>
                                <div className="relative">
                                    <motion.div
                                        animate={{
                                            filter: isAnimating ? getBlurAmount() : "blur(0px)",
                                            opacity: animationPhase === "success" ? 0 : 1,
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className={animationPhase === "success" ? "absolute inset-0" : ""}
                                    >
                                        <Input
                                            id="board-email"
                                            name="email"
                                            type="email"
                                            required
                                            placeholder="email@example.com"
                                            className="h-12"
                                            disabled={isAnimating || animationPhase === "success"}
                                        />
                                    </motion.div>
                                    {animationPhase === "success" && (
                                        <motion.div
                                            initial={{ filter: "blur(8px)", opacity: 0 }}
                                            animate={{ filter: "blur(0px)", opacity: 1 }}
                                            transition={{ duration: 0.4, delay: 0.05 }}
                                        >
                                            <div className="h-12 flex items-center px-3 bg-white/5 border border-white/10 text-white">
                                                Получен ✓
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <Label htmlFor="board-phone">Телефон</Label>
                                <div className="relative">
                                    <motion.div
                                        animate={{
                                            filter: isAnimating ? getBlurAmount() : "blur(0px)",
                                            opacity: animationPhase === "success" ? 0 : 1,
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className={animationPhase === "success" ? "absolute inset-0" : ""}
                                    >
                                        <Input
                                            id="board-phone"
                                            name="phone"
                                            type="tel"
                                            required
                                            placeholder="+359 ..."
                                            className="h-12"
                                            disabled={isAnimating || animationPhase === "success"}
                                        />
                                    </motion.div>
                                    {animationPhase === "success" && (
                                        <motion.div
                                            initial={{ filter: "blur(8px)", opacity: 0 }}
                                            animate={{ filter: "blur(0px)", opacity: 1 }}
                                            transition={{ duration: 0.4, delay: 0.1 }}
                                        >
                                            <div className="h-12 flex items-center px-3 bg-white/5 border border-white/10 text-white">
                                                Очаквайте обаждане!
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            {/* Inquiry Type */}
                            <div className="space-y-2">
                                <Label>Тип на запитването <span className="text-white/20 normal-case">(по желание)</span></Label>
                                <input type="hidden" name="inquiry_type" value={selectedInquiry} />
                                <motion.div
                                    animate={{ filter: isAnimating ? getBlurAmount() : "blur(0px)" }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Combobox
                                        value={selectedInquiry}
                                        onValueChange={(val) => setSelectedInquiry(val as string)}
                                        disabled={isAnimating || animationPhase === "success"}
                                    >
                                        <ComboboxInput
                                            placeholder="Изберете тип запитване"
                                            className="h-12 border-white/10 dark:bg-white/5 w-full text-sm"
                                        />
                                        <ComboboxContent className="bg-zinc-900 border-white/10 text-white/80">
                                            <ComboboxList>
                                                {inquiryTypes.map((type) => (
                                                    <ComboboxItem key={type.value} value={type.label}>{type.label}</ComboboxItem>
                                                ))}
                                            </ComboboxList>
                                        </ComboboxContent>
                                    </Combobox>
                                </motion.div>
                            </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                            <Label htmlFor="board-message">Съобщение</Label>
                            <div className="relative">
                                <motion.div
                                    animate={{
                                        filter: isAnimating ? getBlurAmount() : "blur(0px)",
                                        opacity: animationPhase === "success" ? 0 : 1,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={animationPhase === "success" ? "absolute inset-0" : ""}
                                >
                                    <Textarea
                                        id="board-message"
                                        name="message"
                                        required
                                        placeholder="Напишете вашето съобщение тук..."
                                        className="min-h-[150px] resize-none"
                                        disabled={isAnimating || animationPhase === "success"}
                                    />
                                </motion.div>
                                {animationPhase === "success" && (
                                    <motion.div
                                        initial={{ filter: "blur(8px)", opacity: 0 }}
                                        animate={{ filter: "blur(0px)", opacity: 1 }}
                                        transition={{ duration: 0.4, delay: 0.15 }}
                                    >
                                        <div className="h-[150px] p-3 bg-white/5 border border-white/10 text-white/90 leading-relaxed overflow-hidden">
                                            <p className="mb-2 text-center">Благодарим Ви, {capturedName || "клиент"}!</p>
                                            <p className="mb-3 text-center">Ще се свържем с Вас възможно най-скоро!</p>
                                            <div className="flex justify-between items-start">
                                                <div className="flex flex-col">
                                                    <span className="text-white/60 text-sm">Дилян Калчев</span>
                                                    <span className="text-white font-medium">+359 877 611 162</span>
                                                </div>
                                                <div className="flex flex-col text-right">
                                                    <span className="text-white/60 text-sm">Даниел Ненов</span>
                                                    <span className="text-white font-medium">+359 882 664 006</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button
                                type={animationPhase === "success" ? "button" : "submit"}
                                onClick={animationPhase === "success" ? resetForm : undefined}
                                disabled={isAnimating}
                                className="w-full relative group/btn bg-white text-black hover:bg-white/90 font-black uppercase tracking-tighter h-14 text-lg overflow-hidden transition-all duration-300 active:scale-[0.98]"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {animationPhase === "success" ? "Благодаря" : isAnimating ? <><Loader2 className="w-5 h-5 animate-spin" /> Изпращане...</> : "Изпрати запитване"}
                                </span>
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}

// --- MOVIE FILM VERSION (MOBILE) ---
type MovieAnimationPhase = "idle" | "blurring" | "swiping" | "success";

function ContactMovie() {
    const [selectedInquiry, setSelectedInquiry] = useState("");
    const [animationPhase, setAnimationPhase] = useState<MovieAnimationPhase>("idle");
    const [capturedName, setCapturedName] = useState("");
    const nameInputRef = useRef<HTMLInputElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (animationPhase !== "idle") return;

        // Target the card itself for the scroll so it lands under the navbar
        setTimeout(() => {
            const target = cardRef.current;
            if (target) {
                const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top, behavior: "smooth" });
            }
        }, 50);

        const nameValue = nameInputRef.current?.value || "клиент";
        setCapturedName(nameValue);

        const form = e.currentTarget;
        const formData = new FormData(form);
        formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "");
        formData.append("subject", `Ново запитване от ${nameValue} - db Productions`);

        setAnimationPhase("blurring");
        setTimeout(() => setAnimationPhase("swiping"), 800);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            setTimeout(() => {
                if (data.success) {
                    setAnimationPhase("success");
                    form.reset();
                } else {
                    setAnimationPhase("idle");
                    alert(data.message || "Грешка при изпращането. Моля, опитайте отново.");
                }
            }, 1300);
        } catch (error) {
            setTimeout(() => {
                setAnimationPhase("idle");
                alert("Възникна техническа грешка. Моля, опитайте по-късно.");
            }, 1300);
        }
    };

    const resetForm = () => {
        setAnimationPhase("idle");
        setCapturedName("");
        setSelectedInquiry("");
    };

    const isAnimating = animationPhase === "blurring" || animationPhase === "swiping";
    const showFilmSides = animationPhase === "blurring" || animationPhase === "swiping" || animationPhase === "success";

    const getBlurAmount = () => {
        if (animationPhase === "blurring") return "blur(4px)";
        if (animationPhase === "swiping") return "blur(8px)";
        return "blur(0px)";
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative py-12 bg-black overflow-hidden"
        >
            <div className="container max-w-4xl mx-auto px-6 relative z-10">
                <div className="relative mb-8">
                    <motion.div
                        className="flex flex-col items-center text-center space-y-4 p-2"
                        animate={{
                            opacity: showFilmSides && animationPhase !== "success" ? 0.3 : 1,
                            scale: showFilmSides && animationPhase !== "success" ? 0.95 : 1,
                        }}
                    >
                        <h2 className="text-4xl font-black tracking-tighter text-white uppercase">
                            СВЪРЖЕТЕ СЕ <span className="text-white/40">С НАС</span>
                        </h2>
                    </motion.div>
                </div>

                <motion.div
                    ref={cardRef}
                    className="relative bg-white/5 border border-white/10 overflow-hidden min-h-[640px] flex flex-col"
                >
                    <CornerBorders cornerClassName="w-6 h-6" />

                    {/* Wider Film Strips */}
                    <AnimatePresence>
                        {showFilmSides && (
                            <>
                                <motion.div
                                    initial={{ x: -60, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -60, opacity: 0 }}
                                    className="absolute left-0 top-0 bottom-0 w-12 bg-zinc-950 border-r border-white/10 z-20 flex flex-col items-center py-4 gap-4"
                                >
                                    {[...Array(15)].map((_, i) => (
                                        <div key={i} className="w-5 h-6 bg-white/90 rounded-sm" />
                                    ))}
                                </motion.div>
                                <motion.div
                                    initial={{ x: 60, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: 60, opacity: 0 }}
                                    className="absolute right-0 top-0 bottom-0 w-12 bg-zinc-950 border-l border-white/10 z-20 flex flex-col items-center py-4 gap-4"
                                >
                                    {[...Array(15)].map((_, i) => (
                                        <div key={i} className="w-5 h-6 bg-white/90 rounded-sm" />
                                    ))}
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>

                    <div className="relative flex-1 p-6 px-14 overflow-hidden flex flex-col">
                        <AnimatePresence mode="wait">
                            {animationPhase !== "success" ? (
                                <motion.div
                                    key="movie-form"
                                    animate={{
                                        filter: isAnimating ? getBlurAmount() : "blur(0px)",
                                        y: animationPhase === "swiping" ? 800 : 0,
                                        opacity: animationPhase === "swiping" ? 0 : 1,
                                    }}
                                    transition={{ y: { duration: 0.6, ease: [0.45, 0, 0.55, 1] } }}
                                    className="space-y-4 flex-1 flex flex-col"
                                >
                                    <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
                                        <div className="space-y-4 flex-1">
                                            <div className="space-y-1">
                                                <Label htmlFor="movie-name">Име</Label>
                                                <Input ref={nameInputRef} id="movie-name" name="name" required placeholder="Вашето име" className="bg-white/5 border-white/10 h-11" disabled={isAnimating} />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="movie-email">Имейл</Label>
                                                <Input id="movie-email" name="email" type="email" required placeholder="email@example.com" className="bg-white/5 border-white/10 h-11" disabled={isAnimating} />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="movie-phone">Телефон</Label>
                                                <Input id="movie-phone" name="phone" type="tel" required placeholder="+359 ..." className="bg-white/5 border-white/10 h-11" disabled={isAnimating} />
                                            </div>
                                            <div className="space-y-1">
                                                <Label>Тип на запитването <span className="text-white/20 normal-case">(по желание)</span></Label>
                                                <input type="hidden" name="inquiry_type" value={selectedInquiry} />
                                                <Combobox
                                                    value={selectedInquiry}
                                                    onValueChange={(val) => setSelectedInquiry(val as string)}
                                                    disabled={isAnimating}
                                                >
                                                    <ComboboxInput
                                                        placeholder="Изберете тип запитване"
                                                        className="h-11 border-white/10 bg-white/5 w-full text-sm"
                                                    />
                                                    <ComboboxContent className="bg-zinc-900 border-white/10">
                                                        <ComboboxList>
                                                            {inquiryTypes.map((type) => (
                                                                <ComboboxItem key={type.value} value={type.label}>{type.label}</ComboboxItem>
                                                            ))}
                                                        </ComboboxList>
                                                    </ComboboxContent>
                                                </Combobox>
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="movie-message">Съобщение</Label>
                                                <Textarea id="movie-message" name="message" required placeholder="Вашето съобщение..." className="bg-white/5 border-white/10 min-h-[140px]" disabled={isAnimating} />
                                            </div>
                                        </div>
                                        <div className="pt-4">
                                            <Button
                                                type="submit"
                                                disabled={isAnimating}
                                                className="w-full relative group/btn bg-white text-black hover:bg-white/90 font-black uppercase tracking-tighter h-14 text-lg overflow-hidden transition-all duration-300 active:scale-[0.98]"
                                            >
                                                <span className="relative z-10 flex items-center justify-center gap-2">
                                                    {isAnimating ? <><Loader2 className="w-5 h-5 animate-spin" /> Изпращане...</> : "Изпрати запитване"}
                                                </span>
                                            </Button>
                                        </div>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="movie-success"
                                    initial={{ y: -600, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ y: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
                                    className="flex-1 flex flex-col"
                                >
                                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10">
                                        <Logo variant="logomark" size="lg" className="mx-auto" />

                                        <div className="space-y-6">
                                            <h3 className="text-4xl font-black text-white uppercase tracking-tighter">
                                                БЛАГОДАРИМ ВИ!
                                            </h3>
                                            <p className="text-xl text-white/80 font-light max-w-xs mx-auto leading-relaxed">
                                                Вашето съобщение е изпратено успешно. <br />
                                                Ще се свържем с Вас в най-скоро време!
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Button
                                            type="button"
                                            onClick={resetForm}
                                            className="w-full relative group/btn bg-white text-black hover:bg-white/90 font-black uppercase tracking-tighter h-14 text-lg overflow-hidden transition-all duration-300 active:scale-[0.98]"
                                        >
                                            <span className="relative z-10">Благодаря</span>
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <motion.div
                        className="absolute inset-0 pointer-events-none z-30 opacity-[0.03]"
                        animate={{ opacity: showFilmSides ? 0.05 : 0 }}
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Ffilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        }}
                    />
                </motion.div>
            </div>
        </section>
    );
}
