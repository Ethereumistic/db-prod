import { client } from "@/lib/sanity/client";
import { servicesQuery, categoriesQuery, partnersQuery, portfolioOrderQuery } from "@/lib/sanity/queries";
import { ServicesCDN } from "@/components/sections/services-cdn";
import { Hero } from "@/components/sections/hero";
import { Partners } from "@/components/sections/partners";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Portfolio2 } from "@/components/sections/portfolio2";
import { ContactTest } from "@/components/sections/contact-test";
import type { Metadata } from "next";
import { BASE_URL } from "@/lib/env";

// Homepage-specific metadata optimized for Bulgarian SEO
export const metadata: Metadata = {
    title: "db Productions | Видео Продукция и Дигитална Агенция в България",
    description: "Професионална видео продукция в София, България. Създаваме висококачествени реклами, YouTube серии, корпоративни видеа, TikTok и съдържание за социални мрежи. Вашият партньор за креативни видео решения.",
    keywords: [
        "видео продукция България",
        "видео продукция София",
        "рекламни видеа",
        "YouTube серии продукция",
        "корпоративни видеа България",
        "TikTok видеа",
        "Facebook реклами",
        "социални медии маркетинг",
        "дигитална агенция България",
        "video production Bulgaria",
        "db Productions",
    ],
    alternates: {
        canonical: BASE_URL,
    },
};

export default async function Home() {
    const [services, categories, partnersData, orderIds] = await Promise.all([
        client.fetch(servicesQuery, {}, { next: { revalidate: 3600 } }),
        client.fetch(categoriesQuery, {}, { next: { revalidate: 3600 } }),
        client.fetch(partnersQuery, {}, { next: { revalidate: 3600 } }),
        client.fetch(portfolioOrderQuery, {}, { next: { revalidate: 3600 } }),
    ]);

    // Apply the explicit ordering from the Portfolio Settings singleton.
    // Categories not present in the list fall back to alphabetical order at the end.
    const orderedIds: string[] = orderIds ?? [];
    const orderedCategories = [...categories].sort((a, b) => {
        const ia = orderedIds.indexOf(a._id);
        const ib = orderedIds.indexOf(b._id);
        if (ia === -1 && ib === -1) return a.title.localeCompare(b.title);
        if (ia === -1) return 1;
        if (ib === -1) return -1;
        return ia - ib;
    });

    return (
        <>
            <Hero />
            <ServicesCDN services={services} />
            <Portfolio2 categories={orderedCategories} />
            <Partners data={partnersData} />
            <About />
            <Contact />
            {/* <ContactTest /> */}
        </>
    );
}