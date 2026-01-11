import { defineField, defineType } from 'sanity';
import { Handshake } from 'lucide-react';

export const partners = defineType({
    name: 'partners',
    title: 'ПАРТНЬОРИ',
    type: 'document',
    icon: Handshake,
    fields: [
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
            initialValue: 'Доверие, изградено с екипи като Вашият',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'logos',
            title: 'Partner Logos',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'partner',
                    title: 'Partner',
                    fields: [
                        {
                            name: 'name',
                            title: 'Partner Name',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'logo',
                            title: 'Logo Source',
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
                                    description: 'Paste a direct link to a logo on your CDN',
                                },
                            ],
                        },
                        {
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string',
                            description: 'Text for accessibility (defaults to Name if empty)',
                        },
                        {
                            name: 'logoType',
                            title: 'Logo Shape/Type',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Square / Compact', value: 'square' },
                                    { title: 'Horizontal / Wide', value: 'horizontal' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'horizontal',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'zoomLevel',
                            title: 'Zoom Adjustment',
                            type: 'string',
                            description: 'Optional CSS scale adjustment (e.g., scale-125, scale-110)',
                            options: {
                                list: [
                                    { title: '100% (Normal)', value: 'scale-100' },
                                    { title: '110%', value: 'scale-110' },
                                    { title: '115%', value: 'scale-115' },
                                    { title: '125%', value: 'scale-125' },
                                    { title: '150%', value: 'scale-150' },
                                ],
                            },
                            initialValue: 'scale-100',
                        }
                    ],
                    preview: {
                        select: {
                            title: 'name',
                            media: 'logo.asset',
                            externalLogo: 'logo.externalUrl',
                        },
                        prepare({ title, media, externalLogo }) {
                            return {
                                title,
                                subtitle: externalLogo ? 'External URL' : 'Sanity Upload',
                                media: media || undefined,
                            };
                        },
                    },
                },
            ],
            description: 'Drag and drop to reorder logos.',
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                title: title || 'Partner Logos Configuration',
                subtitle: 'Manage all partner logos here',
            };
        },
    },
});
