import { defineField, defineType } from 'sanity';
import { Briefcase } from 'lucide-react';

export const work = defineType({
    name: 'work',
    title: 'Work / Prototype',
    type: 'document',
    icon: Briefcase,
    fields: [
        defineField({
            name: 'title',
            title: 'Main Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
            // Users wants this based on category, but in Studio V3 hidden logic 
            // is async. For prototype, making it clear in description.
            description: 'Required if Category is MULTI. Optional/Ignored if SOLO.',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'projectCategory' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Thumbnail Image',
            type: 'object',
            description: 'Thumbnail for the grid.',
            fields: [
                { name: 'asset', type: 'image', options: { hotspot: true } },
                { name: 'externalUrl', type: 'url' },
            ],
        }),
        defineField({
            name: 'heroThumbnail',
            title: 'Hero Thumbnail Image / Video',
            type: 'object',
            description: 'Main media for the detail page. If set, it will be rendered first.',
            fields: [
                {
                    name: 'image',
                    title: 'Hero Image',
                    type: 'object',
                    fields: [
                        { name: 'asset', type: 'image', options: { hotspot: true } },
                        { name: 'externalUrl', type: 'url' },
                    ],
                },
                {
                    name: 'videoUrl',
                    title: 'Hero Video URL',
                    type: 'url',
                },
            ],
        }),
        defineField({
            name: 'videos',
            title: 'Videos',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'videoItem',
                    title: 'Video Item',
                    fields: [
                        { name: 'title', title: 'Video Title', type: 'string' },
                        {
                            name: 'urls',
                            title: 'Video URLs',
                            type: 'array',
                            of: [{ type: 'url' }],
                            validation: (Rule) => Rule.required().min(1),
                            description: 'Add one or more YouTube/Vimeo URLs. Multiple videos will be rendered in a grid.'
                        },
                        { name: 'description', title: 'Video Description', type: 'text', rows: 3 },
                        { name: 'date', title: 'Release Date', type: 'date' },
                        {
                            name: 'galleries',
                            title: 'Video Galleries',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    title: 'Gallery Section',
                                    fields: [
                                        { name: 'title', title: 'Gallery Title', type: 'string' },
                                        {
                                            name: 'images',
                                            title: 'Images',
                                            type: 'array',
                                            of: [
                                                {
                                                    type: 'object',
                                                    fields: [
                                                        { name: 'asset', type: 'image', options: { hotspot: true } },
                                                        { name: 'externalUrl', type: 'url' },
                                                        { name: 'alt', type: 'string' },
                                                    ],
                                                },
                                            ],
                                        }
                                    ]
                                }
                            ],
                        }
                    ],
                }
            ],
            description: 'Add one or more videos. Each can have its own titled galleries.',
        }),
        defineField({
            name: 'galleries',
            title: 'Main Project Galleries',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Gallery Section',
                    fields: [
                        { name: 'title', title: 'Gallery Title', type: 'string' },
                        {
                            name: 'images',
                            title: 'Images',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    fields: [
                                        { name: 'asset', type: 'image', options: { hotspot: true } },
                                        { name: 'externalUrl', type: 'url' },
                                        { name: 'alt', type: 'string' },
                                    ],
                                },
                            ],
                        }
                    ]
                }
            ],
            description: 'Galleries that belong to the overall project.',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'category.title',
            media: 'mainImage.asset',
        },
    },
});
