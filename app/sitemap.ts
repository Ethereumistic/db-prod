import type { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'

const BASE_URL = 'https://dbproductions.net'

async function getCategories() {
    return client.fetch(`*[_type == "projectCategory"]{ slug { current } }`)
}

async function getProjects() {
    return client.fetch(`*[_type == "work"]{
    slug { current },
    category->{ slug { current } }
  }`)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ]

    // Dynamic category pages from Sanity
    const categories = await getCategories()
    const categoryPages: MetadataRoute.Sitemap = categories
        .filter((cat: any) => cat.slug?.current)
        .map((category: any) => ({
            url: `${BASE_URL}/${category.slug.current}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))

    // Dynamic project pages from Sanity
    const projects = await getProjects()
    const projectPages: MetadataRoute.Sitemap = projects
        .filter((project: any) => project.slug?.current && project.category?.slug?.current)
        .map((project: any) => ({
            url: `${BASE_URL}/${project.category.slug.current}/${project.slug.current}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }))

    return [...staticPages, ...categoryPages, ...projectPages]
}
