import { defineField, defineType } from 'sanity';
import { Tag } from 'lucide-react'; // Optional: nice icon for the studio

// We inline the media field structure here for simplicity, 
// or you can import the variable from step 1 if you separated it.
const flexibleMediaField = {
    name: 'media',
    title: 'Category Cover Media',
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
        },
    ],
};

export const projectCategory = defineType({
    name: 'projectCategory',
    title: 'Project Categories',
    type: 'document',
    icon: Tag,
    fields: [
        defineField({
            name: 'title',
            title: 'Category Name',
            type: 'string',
            description: 'e.g., Ads, Documentaries, UGC, TikTok',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (Rule) => Rule.required(),
        }),
        // LINK TO GRANDPARENT
        defineField({
            name: 'service',
            title: 'Belongs to Service',
            type: 'reference',
            to: [{ type: 'service' }],
            description: 'Which main service does this category belong to? (e.g., "Ads" belongs to "Video Production")',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
        defineField(flexibleMediaField), // Using the reusable structure
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'service.title', // Shows "Ads (Video Production)" in the list
            media: 'media.asset',
        },
    },
});