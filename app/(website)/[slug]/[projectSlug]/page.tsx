import { client } from "@/lib/sanity/client";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity/image";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { getVideoData } from "@/lib/utils/video";
import type { Metadata } from "next";

import { Card, CardContent } from "@/components/ui/card";
import { WorkGallery } from "@/components/portfolio/work-gallery";

import { BackButton } from "@/components/ui/back-button";
import { ScrollToTopButton } from "@/components/ui/scroll-to-top-button";
import { VideoObjectSchema, BreadcrumbSchema } from "@/components/seo/structured-data";

const BASE_URL = 'https://dbproductions.net';

// Fetch project metadata
async function getProjectMeta(slug: string) {
    return client.fetch(
        `*[_type == "work" && slug.current == $slug][0]{
            title,
            videos[0]{ title, description, date },
            heroThumbnail { image { asset, externalUrl }, videoUrl },
            mainImage { asset, externalUrl },
            category->{ title, slug { current } }
        }`,
        { slug }
    );
}

// Generate dynamic metadata for project pages
export async function generateMetadata({ params }: { params: Promise<{ slug: string, projectSlug: string }> }): Promise<Metadata> {
    const { slug, projectSlug } = await params;
    const project = await getProjectMeta(projectSlug);

    if (!project) {
        return { title: "Проект не е намерен" };
    }

    const title = `${project.title}${project.category?.title ? ` | ${project.category.title}` : ''}`;
    const description = project.videos?.[0]?.description ||
        `${project.title} - видео продукция от db Productions. Професионално заснемане и монтаж в България.`;

    // Get OG image
    let ogImage = "/og-image.jpg";
    if (project.heroThumbnail?.image?.asset) {
        ogImage = urlFor(project.heroThumbnail.image.asset).width(1200).height(630).url();
    } else if (project.mainImage?.asset) {
        ogImage = urlFor(project.mainImage.asset).width(1200).height(630).url();
    } else if (project.heroThumbnail?.image?.externalUrl) {
        ogImage = project.heroThumbnail.image.externalUrl;
    } else if (project.mainImage?.externalUrl) {
        ogImage = project.mainImage.externalUrl;
    }

    return {
        title,
        description,
        alternates: {
            canonical: `${BASE_URL}/${slug}/${projectSlug}`,
        },
        openGraph: {
            title: `${project.title} | db Productions`,
            description,
            url: `${BASE_URL}/${slug}/${projectSlug}`,
            siteName: "db Productions",
            images: [{ url: ogImage, width: 1200, height: 630, alt: project.title }],
            locale: "bg_BG",
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: `${project.title} | db Productions`,
            description,
            images: [ogImage],
        },
    };
}

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

    // Get thumbnail URL for VideoObject schema
    const thumbnailUrl = heroThumbnail?.image?.asset
        ? urlFor(heroThumbnail.image.asset).width(1200).height(630).url()
        : heroThumbnail?.image?.externalUrl || `${BASE_URL}/og-image.jpg`;

    // Get first video URL for schema
    const firstVideoUrl = heroThumbnail?.videoUrl || videos?.[0]?.urls?.[0];
    const videoData = firstVideoUrl ? getVideoData(firstVideoUrl) : null;

    return (
        <main className="bg-black min-h-screen py-28 text-white">
            {/* Breadcrumb Schema for SEO */}
            <BreadcrumbSchema items={[
                { name: 'Начало', url: BASE_URL },
                { name: category?.title || 'Портфолио', url: `${BASE_URL}/${slug}` },
                { name: title, url: `${BASE_URL}/${slug}/${projectSlug}` },
            ]} />

            {/* VideoObject Schema for video content */}
            {videoData && (
                <VideoObjectSchema
                    name={title}
                    description={videos?.[0]?.description || `${title} - видео от db Productions`}
                    thumbnailUrl={thumbnailUrl}
                    uploadDate={videos?.[0]?.date || undefined}
                    embedUrl={videoData.embedUrl}
                />
            )}

            <div className="container mx-auto px-4">
                <div className="relative flex items-center justify-center mb-16 min-h-[60px] md:min-h-[100px]">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <BackButton href={`/${slug}`} />
                    </div>
                    <div className="flex flex-col items-center text-center space-y-2 md:space-y-4 px-12 md:px-0">
                        {category?.title && (
                            <p className="text-white/40 uppercase tracking-[0.3em] font-black text-[10px] md:text-sm">
                                {category.title}
                            </p>
                        )}
                        <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                            {title}
                        </h1>
                        <div className="w-24 h-1 bg-white/20" />
                    </div>
                </div>

                <div className="max-w-5xl mx-auto">
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
            <ScrollToTopButton />
        </main>
    );
}
