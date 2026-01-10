import { defineField, defineType } from 'sanity';
import { Video } from 'lucide-react';

export const service = defineType({
    name: 'service',
    title: 'УСЛУГИ',
    type: 'document',
    icon: Video,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'URL Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'icon',
            title: 'Lucide Icon Name',
            type: 'string',
            description: 'Enter the name of the Lucide icon to use (e.g., Video, Camera, Scissors, Film)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'route',
            title: 'Route',
            type: 'string',
            description: 'Optional URL or route for the service page (e.g., /services/video-production)',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'object',
            fields: [
                {
                    name: 'asset',
                    title: 'Sanity Upload',
                    type: 'image',
                    options: { hotspot: true },
                },
                {
                    name: 'externalUrl',
                    title: 'External CDN URL',
                    type: 'url',
                    description: 'Paste a direct link to an image on your CDN (e.g., https://mycdn.com/image.jpg)',
                },
            ],
            description: 'Upload an image or paste a URL from your CDN. If both are provided, the upload will usually take priority.',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'description',
            media: 'image.asset',
        },
    },
});
