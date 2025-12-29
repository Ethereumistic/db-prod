import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schema';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';

export default defineConfig({
    basePath: '/studio',
    name: 'default',
    title: 'Digital Agency Studio',
    projectId,
    dataset,
    schema: {
        types: schemaTypes,
    },
    plugins: [
        structureTool(),
        visionTool({ defaultApiVersion: apiVersion }),
    ],
});
