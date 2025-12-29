import { defineField, defineType } from 'sanity';

export const project = defineType({
    name: 'project',
    title: 'Projects',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'services',
            title: 'Related Services',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'service' }],
                },
            ],
            description: 'Select one or more services that this project is connected to.',
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: 'image',
            title: 'Project Image',
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
            description: 'Upload an image or paste a URL from your CDN.',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'services.0.title',
            media: 'image.asset',
        },
    },
});
