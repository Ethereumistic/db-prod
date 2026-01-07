// utils/mediaField.ts (or just copy this object where needed)
import { defineField } from "sanity";

export const flexibleMediaField = defineField({
    name: 'media',
    title: 'Media Asset',
    type: 'object',
    fields: [
        {
            name: 'asset',
            title: 'Sanity Upload',
            type: 'image',
            description: 'Drag and drop an image here. Use the "Edit" button to Crop/Hotspot.',
            options: { hotspot: true }, // This enables the cropping/focal point UI
        },
        {
            name: 'externalUrl',
            title: 'External CDN URL',
            type: 'url',
            description: 'Alternatively, paste a direct link to an image (e.g., https://mycdn.com/image.jpg)',
        },
    ],
    // Helper to show the image in the studio preview
    preview: {
        select: {
            media: 'asset',
            external: 'externalUrl'
        },
        prepare({ media, external }) {
            return {
                title: 'Media Asset',
                media: media,
                subtitle: external ? 'External URL used' : 'Sanity Asset used'
            }
        }
    }
});