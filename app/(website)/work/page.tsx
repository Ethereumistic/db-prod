import { client } from "@/lib/sanity/client";
import { Portfolio2 } from "@/components/sections/portfolio2";

async function getCategories() {
    return client.fetch(`*[_type == "projectCategory"]{
        _id,
        title,
        slug,
        media,
        categoryType
    }`);
}

import { BackButton } from "@/components/ui/back-button";

export default async function WorkRootPage() {
    const categories = await getCategories();

    return (
        <main className="bg-black min-h-screen pt-32 pb-24">
            <div className="container mx-auto px-4">
                <BackButton href="/#work" />
                <Portfolio2 categories={categories} />
            </div>
        </main>
    );
}
