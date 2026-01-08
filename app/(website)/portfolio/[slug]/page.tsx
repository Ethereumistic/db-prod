import { client } from "@/lib/sanity/client";
import { projectBySlugQuery, relatedProjectsQuery, categoriesQuery } from "@/lib/sanity/queries";
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
        title: `${project.title} | db Productions Portfolio`,
        description: `Detailed view of ${project.title} - ${project.service?.title}`,
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;

    // Fetch project, all categories (for badges), and related projects in parallel
    const project = await client.fetch(projectBySlugQuery, { slug });

    if (!project) {
        notFound();
    }

    const categoryIds = project.categories?.map((cat: any) => cat._id) || [];

    const [relatedProjects, categories] = await Promise.all([
        client.fetch(relatedProjectsQuery, {
            categoryIds,
            currentSlug: slug
        }),
        client.fetch(categoriesQuery)
    ]);

    return (
        <ProjectDetail
            project={project}
            relatedProjects={relatedProjects}
            categories={categories}
        />
    );
}
