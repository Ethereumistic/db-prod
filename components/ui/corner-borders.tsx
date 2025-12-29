import { cn } from "@/lib/utils";

interface CornerBordersProps {
    isActive?: boolean;
    className?: string;
    cornerClassName?: string;
}

export function CornerBorders({
    isActive,
    className,
    cornerClassName
}: CornerBordersProps) {
    return (
        <>
            <span className={cn(
                "absolute top-1 left-0 w-2 h-2 border-t border-l transition-all duration-500 ease-out",
                "border-white", // Default to white as per user's last edit
                isActive
                    ? "opacity-100 scale-110"
                    : "opacity-0 -translate-x-2 -translate-y-2 group-hover/nav:opacity-100 group-hover/nav:translate-x-0 group-hover/nav:translate-y-0",
                cornerClassName
            )} />
            <span className={cn(
                "absolute bottom-1 right-0 w-2 h-2 border-b border-r transition-all duration-500 ease-out",
                "border-white",
                isActive
                    ? "opacity-100 scale-110"
                    : "opacity-0 translate-x-2 translate-y-2 group-hover/nav:opacity-100 group-hover/nav:translate-x-0 group-hover/nav:translate-y-0",
                cornerClassName
            )} />
        </>
    );
}
