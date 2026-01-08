"use client";

import React, { useState } from "react";
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
    ComboboxTrigger,
    ComboboxInput,
    ComboboxList,
} from "@/components/ui/combobox";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, Loader2, ChevronDown } from "lucide-react";

const inquiryTypes = [
    { value: "question", label: "Имам въпрос относно услуга" },
    { value: "inquiry", label: "Искам да направя запитване за проект" },
    { value: "opinion", label: "Искам да споделя своето мнение" },
    { value: "compliment", label: "Искам да изкажа комплимент" },
    { value: "proposal", label: "Искам да предложа сътрудничество" },
];

export function Contact() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [result, setResult] = useState("");
    const [selectedInquiry, setSelectedInquiry] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        const form = e.currentTarget;
        const formData = new FormData(form);
        formData.append("access_key", "19d56402-773c-4e1b-893c-78840ceb7ade");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setStatus("success");
                setResult("Благодарим ви! Съобщението е изпратено успешно. Ще се свържем с вас скоро.");
                form.reset();
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
                setResult(data.message || "Грешка при изпращането. Моля, опитайте отново.");
            }
        } catch (error) {
            setStatus("error");
            setResult("Възникна техническа грешка. Моля, опитайте по-късно.");
        }
    };

    return (
        <section id="contact" className="relative py-24 bg-black overflow-hidden -scroll-mt-4">
            <div className="container max-w-4xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center mb-12 text-center space-y-4">
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
                        className="text-white/40 max-w-2xl text-lg font-light leading-relaxed"
                    >
                        Готови ли сте да реализираме Вашата идея? Пишете ни и ще се свържем с Вас.
                    </motion.p>
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
                                <Label htmlFor="form-name">Име</Label>
                                <Input
                                    id="form-name"
                                    name="name"
                                    required
                                    placeholder="Вашето име"
                                    className="h-12"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="form-email">Имейл</Label>
                                <Input
                                    id="form-email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="email@example.com"
                                    className="h-12"
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <Label htmlFor="form-phone">Телефон</Label>
                                <Input
                                    id="form-phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    placeholder="+359 ..."
                                    className="h-12"
                                />
                            </div>

                            {/* Company */}
                            <div className="space-y-2">
                                <Label htmlFor="form-company">Компания <span className="text-white/20 normal-case">(по желание)</span></Label>
                                <Input
                                    id="form-company"
                                    name="company"
                                    placeholder="Име на фирмата"
                                    className="h-12"
                                />
                            </div>
                        </div>

                        {/* Inquiry Type */}
                        <div className="space-y-2">
                            <Label>Тип на запитването <span className="text-white/20 normal-case">(по желание)</span></Label>
                            <input type="hidden" name="inquiry_type" value={selectedInquiry} />
                            <Combobox
                                value={selectedInquiry}
                                onValueChange={(val) => setSelectedInquiry(val as string)}
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
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                            <Label htmlFor="form-message">Съобщение</Label>
                            <Textarea
                                id="form-message"
                                name="message"
                                required
                                placeholder="Напишете вашето съобщение тук..."
                                className="min-h-[150px] resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full relative group/btn bg-white text-black hover:bg-white/90 font-black uppercase tracking-tighter h-14 text-lg overflow-hidden transition-all duration-300 active:scale-[0.98]"
                            >
                                <CornerBorders isActive groupName="btn" cornerClassName="border-black" />
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {status === "loading" ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Изпращане...
                                        </>
                                    ) : (
                                        "Изпрати запитване"
                                    )}
                                </span>
                            </Button>
                        </div>

                        {/* Status Messages */}
                        <AnimatePresence mode="wait">
                            {status === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 text-green-400 text-sm"
                                >
                                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                                    <p>{result}</p>
                                </motion.div>
                            )}

                            {status === "error" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                                >
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    <p>{result}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
