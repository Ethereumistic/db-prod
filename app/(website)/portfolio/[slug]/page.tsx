import { client } from "@/lib/sanity/client";
import { projectBySlugQuery } from "@/lib/sanity/queries";
import { ProjectDetail } from "@/components/sections/project-detail";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = await client.fetch(projectBySlugQuery, { slug });

    if (!project) return { title: "Project Not Found" };

    return {
        title: `${project.title} | Daniel Rusev Portfolio`,
        description: `Detailed view of ${project.title} - ${project.service?.title}`,
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = await client.fetch(projectBySlugQuery, { slug });

    if (!project) {
        notFound();
    }

    return <ProjectDetail project={project} />;
}
