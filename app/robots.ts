import type { MetadataRoute } from 'next'

import { BASE_URL } from '@/lib/env'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/studio', '/studio/', '/api', '/api/'],
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
    }
}
