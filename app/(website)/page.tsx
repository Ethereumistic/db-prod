import { client } from "@/lib/sanity/client";
import { servicesQuery, categoriesQuery, projectsQuery } from "@/lib/sanity/queries";
import { ServicesCDN } from "@/components/sections/services-cdn";
import { Hero } from "@/components/sections/hero";
import { Partners } from "@/components/sections/partners";
import { Portfolio } from "@/components/sections/portfolio";

export default async function Home() {
    const [services, categories, projects] = await Promise.all([
        client.fetch(servicesQuery, {}, { next: { revalidate: 3600 } }),
        client.fetch(categoriesQuery, {}, { next: { revalidate: 3600 } }),
        client.fetch(projectsQuery, {}, { next: { revalidate: 3600 } }),
    ]);

    return (
        <>
            <Hero />
            <ServicesCDN services={services} />
            <Partners />
            <Portfolio projects={projects} categories={categories} services={services} />
        </>
    );
}