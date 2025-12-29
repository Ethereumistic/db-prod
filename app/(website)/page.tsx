import { Services } from "@/components/sections/services";
import { ServicesCDN } from "@/components/sections/services-cdn";
import { Hero } from "@/components/sections/hero";
import { Partners } from "@/components/sections/partners";

export default function Home() {
    return (
        <>
            <Hero />
            <Partners />
            <Services />
            <ServicesCDN />
        </>
    );
}