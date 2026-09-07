import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { Settings } from 'lucide-react';
import { schemaTypes } from './sanity/schema';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';

export default defineConfig({
    basePath: '/studio',
    name: 'default',
    title: 'db Productions АДМИН ПАНЕЛ',
    projectId,
    dataset,
    schema: {
        types: schemaTypes,
    },
    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title('Съдържание')
                    .items([
                        // Singleton: Portfolio category ordering
                        S.listItem()
                            .title('ПОРТФОЛИО Подредба')
                            .icon(Settings)
                            .child(
                                S.document()
                                    .schemaType('portfolioSettings')
                                    .documentId('portfolioSettings')
                            ),
                        S.divider(),
                        // All other document types, excluding the singleton
                        ...S.documentTypeListItems().filter(
                            (item) => item.getId() !== 'portfolioSettings'
                        ),
                    ]),
        }),
        visionTool({ defaultApiVersion: apiVersion }),
    ],
});
