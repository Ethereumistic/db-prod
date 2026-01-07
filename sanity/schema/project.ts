import { defineField, defineType } from 'sanity';
import { FolderGit2 } from 'lucide-react';

export const project = defineType({
    name: 'project',
    title: 'Projects / Portfolio',
    type: 'document',
    icon: FolderGit2,
    groups: [
        { name: 'main', title: 'Main Info' },
        { name: 'video', title: 'Video Specifics' },
        { name: 'social', title: 'Social Media Specifics' },
    ],
    fields: [
        // --- 1. THE SWITCH ---
        defineField({
            name: 'projectType',
            title: 'Project Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Video Production', value: 'video' },
                    { title: 'Social Media Management', value: 'social' }
                ],
                layout: 'radio'
            },
            description: 'Select this first to reveal the correct fields below.',
            group: 'main',
            validation: (Rule) => Rule.required(),
        }),

        // --- 2. COMMON FIELDS ---
        defineField({
            name: 'title',
            title: 'Project Title',
            type: 'string',
            group: 'main',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
            group: 'main',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'projectDate',
            title: 'Project Date',
            type: 'date',
            group: 'main',
            description: 'Optional: When was this project completed?',
        }),
        defineField({
            name: 'summary',
            title: 'Project Summary',
            type: 'text',
            rows: 4,
            group: 'main',
            description: 'A short description regarding the project, process, etc.',
        }),

        // --- 3. DYNAMIC RELATIONSHIPS ---
        defineField({
            name: 'service',
            title: 'Service Line',
            type: 'reference',
            to: [{ type: 'service' }],
            group: 'main',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'categories',
            title: 'Categories (Parents)',
            type: 'array',
            of: [{
                type: 'reference',
                to: [{ type: 'projectCategory' }],
                options: {
                    filter: ({ document }: { document: any }) => {
                        const serviceId = (document as any)?.service?._ref;
                        if (!serviceId) return { filter: '!defined(_id)' };
                        return {
                            filter: 'service._ref == $serviceId',
                            params: { serviceId }
                        };
                    }
                }
            }],
            group: 'main',
            validation: (Rule) => Rule.required(),
        }),

        // --- 4. MEDIA ---
        defineField({
            name: 'mainImage',
            title: 'Main Project Image',
            type: 'object',
            group: 'main',
            fields: [
                { name: 'asset', type: 'image', options: { hotspot: true } },
                { name: 'externalUrl', type: 'url' },
            ],
        }),

        defineField({
            name: 'skills',
            title: 'Project Skills / Tools',
            type: 'array',
            of: [{ type: 'string' }],
            group: 'main',
            description: 'Main skills or tools used (e.g., 3D Motion, Post-production)',
            options: {
                layout: 'tags'
            }
        }),

        // --- 5. CONDITIONAL FIELDS: VIDEO ---
        defineField({
            name: 'videoUrl',
            title: 'Main Video URL (Vimeo/YT)',
            type: 'url',
            group: 'video',
            hidden: ({ document }) => (document as any)?.projectType !== 'video',
        }),
        defineField({
            name: 'additionalVideos',
            title: 'Additional Videos',
            type: 'array',
            group: 'video',
            hidden: ({ document }) => (document as any)?.projectType !== 'video',
            of: [{
                type: 'object',
                fields: [
                    { name: 'title', type: 'string', title: 'Video Title (e.g. Behind the Scenes)' },
                    { name: 'url', type: 'url', title: 'Video URL' }
                ]
            }]
        }),

        // --- 6. CONDITIONAL FIELDS: SOCIAL ---
        defineField({
            name: 'platform',
            title: 'Platform',
            type: 'string',
            options: {
                list: ['Instagram', 'TikTok', 'OnlyFans', 'LinkedIn', 'Other']
            },
            group: 'social',
            hidden: ({ document }) => (document as any)?.projectType !== 'social',
        }),
        defineField({
            name: 'metrics',
            title: 'Key Metrics',
            type: 'text',
            rows: 2,
            group: 'social',
            hidden: ({ document }) => (document as any)?.projectType !== 'social',
        }),

        // --- 7. EXTERNAL LINKS (ALL TYPES) ---
        defineField({
            name: 'externalLinks',
            title: 'External Links',
            type: 'array',
            group: 'main',
            of: [{
                type: 'object',
                fields: [
                    { name: 'label', type: 'string', title: 'Link Label (e.g. View Website)' },
                    { name: 'url', type: 'url', title: 'URL' },
                    {
                        name: 'icon',
                        type: 'string',
                        title: 'Lucide Icon Name',
                        description: 'Default is ArrowRight',
                        initialValue: 'ArrowRight'
                    }
                ]
            }]
        }),
    ],

    preview: {
        select: {
            title: 'title',
            subtitle: 'projectType',
            media: 'mainImage.asset',
        },
    },
});