"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

import { CornerBorders } from "./corner-borders";

interface BackButtonProps {
    href: string;
    className?: string;
}

export function BackButton({ href, className }: BackButtonProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={className}
        >
            <Link
                href={href}
                className="group/back relative inline-flex items-center justify-center w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 transition-all hover:bg-white/10 hover:border-white/20"
            >
                <CornerBorders groupName="back" />
                <ChevronLeft size={20} className="text-white/40 group-hover:text-white transition-colors group-hover:-translate-x-1 duration-300" />
            </Link>
        </motion.div>
    );
}
