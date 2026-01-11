import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BreakpointDisplay } from "@/lib/breakpoint-display";

export default function WebsiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                {/* <BreakpointDisplay /> */}
                {children}
            </main>
            <Footer />
        </>
    );
}
