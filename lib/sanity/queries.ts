import { groq } from 'next-sanity';

export const servicesQuery = groq`*[_type == "service"] | order(_createdAt asc) {
    _id,
    title,
    description,
    icon,
    route,
    image {
        asset,
        externalUrl
    }
}`;

export const categoriesQuery = groq`*[_type == "projectCategory"] | order(title asc) {
    _id,
    title,
    slug { current },
    "serviceId": service._ref,
    description,
    media {
        asset,
        externalUrl
    }
}`;

export const projectsQuery = groq`*[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    slug { current },
    projectType,
    "serviceId": service._ref,
    "categoryIds": categories[]._ref,
    mainImage {
        asset,
        externalUrl
    },
    videoUrl,
    skills,
    platform,
    metrics,
    projectDate,
    summary,
    additionalVideos,
    externalLinks
}`;

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug { current },
    projectType,
    "service": service-> {
        title,
        icon
    },
    "categories": categories[]-> {
        _id,
        title,
        slug { current }
    },
    mainImage {
        asset,
        externalUrl
    },
    featuredImage {
        asset,
        externalUrl
    },
    videoUrl,
    additionalVideos,
    skills,
    platform,
    metrics,
    projectDate,
    summary,
    externalLinks,
    _createdAt
}`;

export const relatedProjectsQuery = groq`*[_type == "project" && references($categoryIds) && slug.current != $currentSlug] | order(_createdAt desc) {
    _id,
    title,
    slug { current },
    projectType,
    "serviceId": service._ref,
    "categoryIds": categories[]._ref,
    mainImage {
        asset,
        externalUrl
    },
    videoUrl,
    skills,
    platform,
    metrics,
    projectDate,
    summary
}`;
