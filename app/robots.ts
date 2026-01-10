import type { MetadataRoute } from 'next'

const BASE_URL = 'https://dbproductions.net'

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
