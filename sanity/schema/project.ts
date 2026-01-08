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
            title: 'Main Project Image / Thumbnail',
            type: 'object',
            group: ['main', 'video', 'social'],
            description: 'Used for the portfolio grid and as the primary visual on the project page if no main video is provided.',
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
            description: 'Optional: If left empty, the project will display the Featured Image or Main Image at the top.',
            hidden: ({ document }) => (document as any)?.projectType !== 'video',
        }),
        defineField({
            name: 'featuredImage',
            title: 'Featured Detail Image',
            type: 'object',
            group: 'video',
            description: 'Optional: A different image to show at the top of the detail page. Falls back to Main Project Image if empty.',
            hidden: ({ document }) => (document as any)?.projectType !== 'video',
            fields: [
                { name: 'asset', type: 'image', options: { hotspot: true } },
                { name: 'externalUrl', type: 'url' },
            ],
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
                    { name: 'url', type: 'url', title: 'Video URL' },
                    { name: 'summary', type: 'text', title: 'Video Summary', rows: 3 }
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

        // --- 7. GALLERY (BOTH TYPES) ---
        defineField({
            name: 'gallery',
            title: 'Project Gallery',
            type: 'object',
            group: ['video', 'social'],
            description: 'Optional image gallery to showcase additional project visuals.',
            fields: [
                {
                    name: 'gridStyle',
                    title: 'Gallery Grid Style',
                    type: 'string',
                    options: {
                        list: [
                            { title: '3×3 Grid (9 images max)', value: '3x3' },
                            { title: '3×2 Grid (6 images max)', value: '3x2' },
                            { title: '2×2 Grid (4 images max)', value: '2x2' },
                            { title: '3×1 Row (3 images)', value: '3x1' },
                            { title: '2×1 Row (2 images)', value: '2x1' },
                        ],
                        layout: 'radio'
                    },
                    initialValue: '3x2',
                },
                {
                    name: 'images',
                    title: 'Gallery Images',
                    type: 'array',
                    of: [{
                        type: 'object',
                        title: 'Image',
                        fields: [
                            {
                                name: 'asset',
                                title: 'Upload Image',
                                type: 'image',
                                options: { hotspot: true },
                                description: 'Upload image directly to Sanity'
                            },
                            {
                                name: 'externalUrl',
                                title: 'Or External Image URL',
                                type: 'url',
                                description: 'Paste a CDN link (e.g., jsdelivr, cloudinary)'
                            },
                            {
                                name: 'alt',
                                title: 'Alt Text',
                                type: 'string',
                                description: 'Optional description for accessibility'
                            }
                        ],
                        preview: {
                            select: {
                                media: 'asset',
                                externalUrl: 'externalUrl',
                                alt: 'alt'
                            },
                            prepare({ media, externalUrl, alt }) {
                                return {
                                    title: alt || (externalUrl ? 'External Image' : 'Gallery Image'),
                                    media: media,
                                    subtitle: externalUrl || undefined
                                };
                            }
                        }
                    }],
                    description: 'Add images via Sanity upload or paste CDN links',
                }
            ]
        }),

        // --- 8. EXTERNAL LINKS (ALL TYPES) ---
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