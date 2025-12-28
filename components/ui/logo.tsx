import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "auto";
    width?: number;
    height?: number;
    variant?: "logo" | "logomark" | "logotype";
    layout?: "vertical" | "horizontal_right" | "horizontal_left";
    textClassName?: string;
}

const sizes = {
    xs: { width: 56, height: 32 },
    sm: { width: 68, height: 44 },
    md: { width: 112, height: 63 },
    lg: { width: 168, height: 95 },
    xl: { width: 224, height: 126 },
    auto: { width: 0, height: 0 },
};

export function Logo({
    className,
    size = "md",
    width,
    height,
    variant = "logo",
    layout = "horizontal_right",
    textClassName,
}: LogoProps) {
    const dimensions = size === "auto" ? { width, height } : sizes[size];

    const logomark = (
        <Image
            src="https://cdn.jsdelivr.net/gh/Ethereumistic/db-prod-assets/logo/logomark.png"
            alt="DB Productions Logo"
            width={dimensions.width || width}
            height={dimensions.height || height}
            className="dark:invert grayscale-0 transition-all duration-300 object-contain"
            priority
        />
    );

    const logotype = (
        <span
            className={cn(
                "font-bold tracking-tighter transition-all duration-300 whitespace-nowrap",
                size === "xs" && "text-base",
                size === "sm" && "text-xl",
                size === "md" && "text-xl",
                size === "lg" && "text-2xl",
                size === "xl" && "text-3xl",
                layout === "vertical" && "text-center leading-none",
                textClassName
            )}
            style={
                layout === "vertical"
                    ? {
                        // Mathematical magic to make font-size relative to container width
                        // "DB PRODUCTIONS" is ~14 characters.
                        // This calculation ensures the text is always exactly as wide as the image.
                        fontSize: `calc(${(dimensions.width || width)}px * 0.126)`,
                        width: dimensions.width || width,
                    }
                    : {}
            }
        >
            db PRODUCTIONS
        </span>
    );

    if (variant === "logomark") {
        return <div className={cn("relative flex items-center justify-center", className)}>{logomark}</div>;
    }

    if (variant === "logotype") {
        return <div className={cn("relative flex items-center justify-center", className)}>{logotype}</div>;
    }

    return (
        <div
            className={cn(
                "relative flex items-center gap-2",
                layout === "vertical" && "flex-col gap-1",
                layout === "horizontal_left" && "flex-row-reverse",
                className
            )}
        >
            {logomark}
            {logotype}
        </div>
    );
}
