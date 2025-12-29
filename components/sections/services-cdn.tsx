import Link from "next/link";
import Image from "next/image";
import * as LucideIcons from "lucide-react";
import {
    Card,
} from "@/components/ui/card";
import { CornerBorders } from "@/components/ui/corner-borders";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";

interface ServiceData {
    title: string;
    description: string;
    icon: string;
    route?: string;
    image: {
        asset?: any;
        externalUrl?: string;
    };
}

async function getServices(): Promise<ServiceData[]> {
    const query = `*[_type == "service"] | order(_createdAt asc) {
        title,
        description,
        icon,
        route,
        image
    }`;
    // Revalidate every 24 hours (86400 seconds) since services change rarely
    return client.fetch(query, {}, { next: { revalidate: 86400 } });
}

export async function ServicesCDN() {
    const services = await getServices();

    return (
        <section id="services" className="py-12 bg-black scroll-mt-7">
            <div className="container max-w-5xl mx-auto px-4">
                <div className="flex flex-col items-center mb-10 text-center space-y-3">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase">
                        НАШИТЕ <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/80 to-white/40">УСЛУГИ</span>
                    </h2>
                    <div className="w-16 h-1 bg-white/10" />
                    <p className="text-white/50 max-w-xl text-base font-light">
                        Цялостни творчески решения – от първоначалната концепция до финалния резултат.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((service) => {
                        // Dynamically get the icon component or fallback to Scissors
                        const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.Scissors;

                        // Determine image source
                        const imageSrc = service.image?.asset
                            ? urlFor(service.image.asset).url()
                            : (service.image?.externalUrl || "/placeholder.jpg");

                        const CardContent = (
                            <Card
                                className="relative border-white/10 hover:border-white/20 transition-all duration-500 group group/nav overflow-hidden aspect-square flex flex-col justify-end h-full"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={imageSrc}
                                        alt={service.title}
                                        fill
                                        className="object-cover scale-100 group-hover:scale-105 transition-all duration-1000 ease-out opacity-80 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black via-black/50 via-60% to-transparent transition-all duration-500" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 p-4">
                                    <div className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/20 backdrop-blur-sm transition-all duration-500 group-hover:bg-white group-hover:border-white mb-3">
                                        <IconComponent className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                                    </div>
                                    <div className="relative inline-flex items-center mb-3">
                                        <CornerBorders />
                                        <h3 className="text-xl font-bold text-white px-4 py-1.5 transition-all duration-500 relative z-10">
                                            {service.title}
                                        </h3>
                                    </div>
                                    <p className="text-white/60 group-hover:text-white/90 transition-colors duration-500 text-xs leading-relaxed line-clamp-2">
                                        {service.description}
                                    </p>
                                </div>
                            </Card>
                        );

                        if (service.route) {
                            return (
                                <Link key={service.title} href={service.route}>
                                    {CardContent}
                                </Link>
                            );
                        }

                        return <div key={service.title}>{CardContent}</div>;
                    })}
                </div>
            </div>
        </section>
    );
}
