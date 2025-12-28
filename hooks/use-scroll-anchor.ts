"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

export function useScrollAnchor() {
    const pathname = usePathname();

    const handleAnchorClick = React.useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("/#")) {
            const id = href.split("#")[1];
            if (pathname === "/") {
                e.preventDefault();
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                    // Force a history update to ensure the hash is in the URL even if it was there
                    window.history.pushState(null, "", href);
                }
            }
        } else if (href === "/") {
            if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.history.pushState(null, "", "/");
            }
        }
    }, [pathname]);

    return { handleAnchorClick };
}
