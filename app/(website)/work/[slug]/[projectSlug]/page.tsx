import { client } from "@/lib/sanity/client";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity/image";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { getVideoData } from "@/lib/utils/video";

import { Card, CardContent } from "@/components/ui/card";
import { WorkGallery } from "@/components/portfolio/work-gallery";

import { BackButton } from "@/components/ui/back-button";

async function getProject(slug: string) {
    return client.fetch(
        `*[_type == "work" && slug.current == $slug][0]{
            ...,
            category->{
                title,
                slug
            },
            galleries
        }`,
        { slug }
    );
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string, projectSlug: string }> }) {
    const { slug, projectSlug } = await params;
    const project = await getProject(projectSlug);

    if (!project) {
        notFound();
    }

    const { title, videos, galleries, category, heroThumbnail } = project;

    return (
        <main className="bg-black min-h-screen pt-48 pb-24 text-white">
            <div className="container mx-auto px-4">
                <BackButton href={`/work/${slug}`} />

                <div className="max-w-5xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-12 space-y-4">
                        <p className="text-white/40 uppercase tracking-[0.3em] font-black text-sm">
                            {category?.title}
                        </p>
                        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter">
                            {title}
                        </h1>
                    </div>

                    {/* Media Section (Hero + Videos) */}
                    <div className="space-y-32 mb-24">
                        {/* Hero Thumbnail (Image or Video) */}
                        {heroThumbnail && (heroThumbnail.videoUrl || heroThumbnail.image) && (
                            <Card className="bg-slate-900/50 border-white/5 rounded-none overflow-hidden">
                                <CardContent className="p-8 space-y-12">
                                    {heroThumbnail.videoUrl ? (
                                        <div className="space-y-12">
                                            {/* Header Info for Hero Video */}
                                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                                <div className="space-y-1">
                                                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
                                                        {title}
                                                    </h2>
                                                </div>
                                            </div>

                                            {/* Hero Video Player */}
                                            {(() => {
                                                const videoData = getVideoData(heroThumbnail.videoUrl);
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
                                                src={heroThumbnail.image?.asset ? urlFor(heroThumbnail.image.asset).url() : (heroThumbnail.image?.externalUrl || "/placeholder.jpg")}
                                                alt={title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* Regular Videos Section */}
                        {videos && videos.length > 0 && videos.map((video: any, idx: number) => {
                            const videoUrls = video.urls || [video.url]; // Backward compatibility if needed, but schema now uses urls
                            return (
                                <Card key={idx} className="bg-slate-900/50 border-white/5 rounded-none overflow-hidden">
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
                                                    {video.title || title}
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
                                                    {videoItems.map((item: { url: string; data: any }, vIdx: number) => {
                                                        const isVertical = item.data?.isVertical;
                                                        return (
                                                            <div key={vIdx} className={cn(
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
                    </div>

                    {/* Top-Level Project Galleries */}
                    {galleries && galleries.length > 0 && (
                        <div className="space-y-24 mt-24">
                            {galleries.map((gallery: any, gIdx: number) => (
                                <WorkGallery
                                    key={gIdx}
                                    images={gallery.images}
                                    title={gallery.title || "Project Gallery"}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
