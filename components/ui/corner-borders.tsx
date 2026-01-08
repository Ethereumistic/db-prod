import { cn } from "@/lib/utils";

interface CornerBordersProps {
    isActive?: boolean;
    className?: string;
    cornerClassName?: string;
    groupName?: string;
}

export function CornerBorders({
    isActive,
    className,
    cornerClassName,
    groupName = "nav"
}: CornerBordersProps) {
    const groupHoverClass = `group-hover/${groupName}`;

    return (
        <>
            <span className={cn(
                "absolute top-0 left-0 w-2 h-2 border-t border-l transition-all duration-500 ease-out",
                "border-white", // Default to white as per user's last edit
                isActive
                    ? "opacity-100 scale-110"
                    : cn(
                        "opacity-0 -translate-x-2 -translate-y-2",
                        groupName === "nav" ? "group-hover/nav:opacity-100 group-hover/nav:translate-x-0 group-hover/nav:translate-y-0" :
                            groupName === "partner" ? "group-hover/partner:opacity-100 group-hover/partner:translate-x-0 group-hover/partner:translate-y-0" :
                                groupName === "field" ? "group-focus-within/field:opacity-100 group-focus-within/field:translate-x-0 group-focus-within/field:translate-y-0" :
                                    groupName === "dropdown-item" ? "group-hover/dropdown-item:opacity-100 group-hover/dropdown-item:translate-x-0 group-hover/dropdown-item:translate-y-0 focus-visible:opacity-100 focus-visible:translate-x-0 focus-visible:translate-y-0" :
                                        groupName === "combobox-item" ? "group-hover/combobox-item:opacity-100 group-hover/combobox-item:translate-x-0 group-hover/combobox-item:translate-y-0 group-focus/combobox-item:opacity-100 group-focus/combobox-item:translate-x-0 group-focus/combobox-item:translate-y-0" :
                                            "group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                    ),
                cornerClassName
            )} />
            <span className={cn(
                "absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-all duration-500 ease-out",
                "border-white",
                isActive
                    ? "opacity-100 scale-110"
                    : cn(
                        "opacity-0 translate-x-2 translate-y-2",
                        groupName === "nav" ? "group-hover/nav:opacity-100 group-hover/nav:translate-x-0 group-hover/nav:translate-y-0" :
                            groupName === "partner" ? "group-hover/partner:opacity-100 group-hover/partner:translate-x-0 group-hover/partner:translate-y-0" :
                                groupName === "field" ? "group-focus-within/field:opacity-100 group-focus-within/field:translate-x-0 group-focus-within/field:translate-y-0" :
                                    groupName === "dropdown-item" ? "group-hover/dropdown-item:opacity-100 group-hover/dropdown-item:translate-x-0 group-hover/dropdown-item:translate-y-0 focus-visible:opacity-100 focus-visible:translate-x-0 focus-visible:translate-y-0" :
                                        groupName === "combobox-item" ? "group-hover/combobox-item:opacity-100 group-hover/combobox-item:translate-x-0 group-hover/combobox-item:translate-y-0 group-focus/combobox-item:opacity-100 group-focus/combobox-item:translate-x-0 group-focus/combobox-item:translate-y-0" :
                                            "group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                    ),
                cornerClassName
            )} />
        </>
    );
}
