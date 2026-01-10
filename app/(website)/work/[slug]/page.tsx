
import { client } from "@/lib/sanity/client";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { WorkCard } from "@/components/portfolio/work-card";
import { Portfolio2 } from "@/components/sections/portfolio2";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import { getVideoData } from "@/lib/utils/video";

import { Card, CardContent } from "@/components/ui/card";
import { WorkGallery } from "@/components/portfolio/work-gallery";

import { BackButton } from "@/components/ui/back-button";

async function getCategory(slug: string) {
    return client.fetch(
        `*[_type == "projectCategory" && slug.current == $slug][0]{
            ...,
            "projects": *[_type == "work" && references(^._id)]{
                _id,
                title,
                slug,
                mainImage,
                heroThumbnail,
                videos,
                galleries
            }
        }`,
        { slug }
    );
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = await getCategory(slug);

    if (!category) {
        notFound();
    }

    const { categoryType, projects, title } = category;

    return (
        <main className="bg-black min-h-screen pt-48 pb-24 text-white">
            <div className="container mx-auto px-4">
                <BackButton href="/#work" />
                <div className="flex flex-col items-center mb-16 text-center space-y-4">
                    <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter">
                        {title}
                    </h1>
                    <div className="w-24 h-1 bg-white/20" />
                </div>

                {categoryType === 'solo' ? (
                    <div className="max-w-5xl mx-auto space-y-32">
                        {projects?.map((project: any) => (
                            <div key={project._id} className="space-y-32">
                                {/* Hero Thumbnail (Image or Video) */}
                                {project.heroThumbnail && (project.heroThumbnail.videoUrl || project.heroThumbnail.image) && (
                                    <Card className="bg-slate-900/50 border-white/5 rounded-none overflow-hidden">
                                        <CardContent className="p-8 space-y-12">
                                            {project.heroThumbnail.videoUrl ? (
                                                <div className="space-y-12">
                                                    {/* Header Info for Hero Video */}
                                                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                                        <div className="space-y-1">
                                                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
                                                                {project.title}
                                                            </h2>
                                                        </div>
                                                    </div>

                                                    {/* Hero Video Player */}
                                                    {(() => {
                                                        const videoData = getVideoData(project.heroThumbnail.videoUrl);
                                                        return (
                                                            <div className={cn(
                                                                "relative overflow-hidden border border-white/10 bg-black shadow-2xl",
                                                                videoData?.isVertical ? "aspect-9/16 max-w-[400px] mx-auto" : "aspect-video"
                                                            )}>
                                                                {videoData ? (
                                                                    <iframe
                                                                        src={videoData.embedUrl}
                                                                        className="absolute inset-0 w-full h-full"
                                                                        allowFullScreen
                                                                    />
                                                                ) : (
                                                                    <div className="flex items-center justify-center h-full text-white/20 uppercase font-black text-xs">
                                                                        Invalid Video URL
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })()}
                                                </div>
                                            ) : (
                                                /* Hero Image */
                                                <div className="relative aspect-video overflow-hidden border border-white/10 bg-black shadow-2xl">
                                                    <Image
                                                        src={project.heroThumbnail.image?.asset ? urlFor(project.heroThumbnail.image.asset).url() : (project.heroThumbnail.image?.externalUrl || "/placeholder.jpg")}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                )}

                                {project.videos?.map((video: any, vIdx: number) => {
                                    const videoUrls = video.urls || [video.url];
                                    return (
                                        <Card key={vIdx} className="bg-slate-900/50 border-white/5 rounded-none overflow-hidden">
                                            <CardContent className="p-8 space-y-12">
                                                {/* Header Info Above Video */}
                                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                                    <div className="space-y-1">
                                                        {video.date && (
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/30">
                                                                {new Date(video.date).toLocaleDateString()}
                                                            </p>
                                                        )}
                                                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
                                                            {video.title || project.title}
                                                        </h2>
                                                    </div>
                                                </div>

                                                {/* Video Grid/Flex */}
                                                {(() => {
                                                    const videoItems = videoUrls.map((url: string) => ({
                                                        url,
                                                        data: getVideoData(url)
                                                    }));
                                                    const hasShorts = videoItems.some((item: any) => item.data?.isVertical);

                                                    return (
                                                        <div className={cn(
                                                            "flex flex-wrap justify-center gap-8",
                                                            !hasShorts && "flex-col"
                                                        )}>
                                                            {videoItems.map((item: { url: string; data: any }, uIdx: number) => {
                                                                const isVertical = item.data?.isVertical;
                                                                return (
                                                                    <div key={uIdx} className={cn(
                                                                        "relative overflow-hidden border border-white/10 bg-black shadow-2xl transition-all duration-500 w-full",
                                                                        isVertical
                                                                            ? cn(
                                                                                "aspect-9/16 max-w-[400px]",
                                                                                videoItems.length === 2 ? "md:w-[calc(45%-1.5rem)]" : "md:w-[calc(33.333%-1.5rem)]"
                                                                            )
                                                                            : "aspect-video"
                                                                    )}>
                                                                        {item.data ? (
                                                                            <iframe
                                                                                src={item.data.embedUrl}
                                                                                className="absolute inset-0 w-full h-full"
                                                                                allowFullScreen
                                                                            />
                                                                        ) : (
                                                                            <div className="flex items-center justify-center h-full text-white/20 uppercase font-black text-xs">
                                                                                Invalid Video URL
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    );
                                                })()}

                                                {/* Description Below Video */}
                                                {video.description && (
                                                    <p className="text-xl font-light text-white/60 leading-relaxed max-w-3xl">
                                                        {video.description}
                                                    </p>
                                                )}

                                                {/* Video Level Galleries */}
                                                {video.galleries?.map((gallery: any, gIdx: number) => (
                                                    <WorkGallery
                                                        key={gIdx}
                                                        images={gallery.images}
                                                        title={gallery.title || "Photography"}
                                                    />
                                                ))}
                                            </CardContent>
                                        </Card>
                                    );
                                })}

                                {/* Top-Level Project Galleries */}
                                {project.galleries?.map((gallery: any, gIdx: number) => (
                                    <div key={gIdx} className="px-8">
                                        <WorkGallery
                                            images={gallery.images}
                                            title={gallery.title || "Project Gallery"}
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    // MULTI layout: Show project cards linking to detail pages
                    <div className="flex flex-wrap justify-center gap-8">
                        {projects?.map((project: any) => (
                            <div
                                key={project._id}
                                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)]"
                            >
                                <WorkCard
                                    project={project}
                                    baseUrl={`/work/${slug}`}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {(!projects || projects.length === 0) && (
                    <div className="text-center py-20 text-white/40">
                        Няма добавени проекти в тази категория.
                    </div>
                )}
            </div>
        </main>
    );
}
