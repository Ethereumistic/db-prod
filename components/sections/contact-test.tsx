"use client";

import React, { useState, useRef } from "react";
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

const inquiryTypes = [
    { value: "question", label: "Имам въпрос относно услуга" },
    { value: "inquiry", label: "Искам да направя запитване за проект" },
    { value: "opinion", label: "Искам да споделя своето мнение" },
    { value: "compliment", label: "Искам да изкажа комплимент" },
    { value: "proposal", label: "Искам да предложа сътрудничество" },
];

type AnimationPhase = "idle" | "pattern" | "opening" | "closing" | "success";

export function ContactTest() {
    const [selectedInquiry, setSelectedInquiry] = useState("");
    const [animationPhase, setAnimationPhase] = useState<AnimationPhase>("idle");
    const [capturedName, setCapturedName] = useState("");
    const nameInputRef = useRef<HTMLInputElement>(null);

    const triggerAnimation = () => {
        if (animationPhase !== "idle") return;

        // Capture the name from the input
        const nameValue = nameInputRef.current?.value || "клиент";
        setCapturedName(nameValue);

        // Phase 1: Show checkered pattern + fade out text
        setAnimationPhase("pattern");

        // Phase 2: Open the clapper (after pattern appears)
        setTimeout(() => {
            setAnimationPhase("opening");
        }, 600);

        // Phase 3: Close the clapper
        setTimeout(() => {
            setAnimationPhase("closing");
        }, 1200);

        // Phase 4: Show success message in form
        setTimeout(() => {
            setAnimationPhase("success");
        }, 1500);
    };

    const resetForm = () => {
        setAnimationPhase("idle");
        setCapturedName("");
        setSelectedInquiry("");
    };

    const isAnimating = animationPhase === "pattern" || animationPhase === "opening" || animationPhase === "closing";
    const showPattern = animationPhase === "pattern" || animationPhase === "opening" || animationPhase === "closing" || animationPhase === "success";

    // Blur amount based on animation phase
    const getBlurAmount = () => {
        if (animationPhase === "pattern") return "blur(2px)";
        if (animationPhase === "opening") return "blur(8px)";
        if (animationPhase === "closing") return "blur(4px)";
        return "blur(0px)";
    };

    return (
        <section id="contact-test" className="relative py-24 bg-black -scroll-mt-4">
            {/* Debug indicator */}
            <div className="absolute top-4 right-4 z-50 bg-yellow-500 text-black px-3 py-1 text-sm font-mono">
                DEBUG: {animationPhase}
            </div>

            <div className="container max-w-4xl mx-auto px-6 relative z-10">
                {/* Header with Clapper Animation - overflow visible to show clapper edges */}
                <div className="relative  overflow-visible">
                    {/* The animated clapper part */}
                    <motion.div
                        className="relative"
                        style={{
                            transformOrigin: "bottom left",
                        }}
                        animate={{
                            rotateZ: animationPhase === "opening" ? -20 : 0,
                        }}
                        transition={{
                            duration: 0.3,
                            ease: animationPhase === "closing" ? [0.68, -0.55, 0.265, 1.55] : "easeOut",
                        }}
                    >
                        {/* Checkered pattern background (cinema clapper) - thicker stripes */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none overflow-hidden border border-border"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: showPattern ? 1 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <div
                                className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4"
                                style={{
                                    background: `
                                        repeating-linear-gradient(
                                            45deg,
                                            #ffffff 0px,
                                            #ffffff 40px,
                                            #000000 40px,
                                            #000000 80px
                                        )
                                    `,
                                }}
                            />
                        </motion.div>

                        {/* Header content - fades out when pattern appears */}
                        <motion.div
                            className="flex flex-col items-center text-center space-y-4 p-2 relative z-10"
                            animate={{
                                opacity: showPattern ? 0 : 1,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase"
                            >
                                СВЪРЖЕТЕ СЕ С <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/50 to-white/20">НАС</span>
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
                                className="text-white/40 max-w-2xl text-lg font-light leading-relaxed mb-4"
                            >
                                Готови ли сте да реализираме Вашата идея? Пишете ни и ще се свържем с Вас.
                            </motion.p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative bg-white/5 border border-white/10 p-8 md:p-12 overflow-hidden"
                >
                    <CornerBorders cornerClassName="w-8 h-8" />

                    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="test-form-name">Име</Label>
                                <div className="relative">
                                    {/* Original input - blurs during animation, hidden on success */}
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
                                            id="test-form-name"
                                            name="name"
                                            placeholder="Вашето име"
                                            className="h-12"
                                            disabled={isAnimating || animationPhase === "success"}
                                        />
                                    </motion.div>
                                    {/* Success value */}
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
                                <Label htmlFor="test-form-email">Имейл</Label>
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
                                            id="test-form-email"
                                            name="email"
                                            type="email"
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
                                <Label htmlFor="test-form-phone">Телефон</Label>
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
                                            id="test-form-phone"
                                            name="phone"
                                            type="tel"
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

                            {/* Inquiry Type - keeps original value */}
                            <div className="space-y-2">
                                <Label>Тип на запитването <span className="text-white/20 normal-case">(по желание)</span></Label>
                                <input type="hidden" name="inquiry_type" value={selectedInquiry} />
                                <motion.div
                                    animate={{
                                        filter: isAnimating ? getBlurAmount() : "blur(0px)",
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Combobox
                                        value={selectedInquiry}
                                        onValueChange={(val) => setSelectedInquiry(val as string)}
                                        disabled={isAnimating || animationPhase === "success"}
                                    >
                                        <ComboboxInput
                                            placeholder="Изберете тип запитване"
                                            className="h-12 border-white/10 dark:bg-white/5 transition-all text-sm text-white/70 w-full"
                                        />
                                        <ComboboxContent className="bg-zinc-900 border-white/10 text-white/80 p-0">
                                            <ComboboxList className="p-0">
                                                {inquiryTypes.map((type) => (
                                                    <ComboboxItem
                                                        key={type.value}
                                                        value={type.label}
                                                    >
                                                        {type.label}
                                                    </ComboboxItem>
                                                ))}
                                            </ComboboxList>
                                        </ComboboxContent>
                                    </Combobox>
                                </motion.div>
                            </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                            <Label htmlFor="test-form-message">Съобщение</Label>
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
                                        id="test-form-message"
                                        name="message"
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

                        {/* Button */}
                        <div className="pt-4">
                            {animationPhase === "success" ? (
                                <Button
                                    type="button"
                                    onClick={resetForm}
                                    className="w-full relative group/btn bg-white text-black hover:bg-white/90 font-black uppercase tracking-tighter h-14 text-lg overflow-hidden transition-all duration-300 active:scale-[0.98]"
                                >
                                    <CornerBorders isActive groupName="btn" cornerClassName="border-black" />
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Благодаря
                                    </span>
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    onClick={triggerAnimation}
                                    disabled={animationPhase !== "idle"}
                                    className="w-full relative group/btn bg-white text-black hover:bg-white/90 font-black uppercase tracking-tighter h-14 text-lg overflow-hidden transition-all duration-300 active:scale-[0.98]"
                                >
                                    <CornerBorders isActive groupName="btn" cornerClassName="border-black" />
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {isAnimating ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Анимация...
                                            </>
                                        ) : (
                                            "🎬 Тествай Анимацията"
                                        )}
                                    </span>
                                </Button>
                            )}
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
