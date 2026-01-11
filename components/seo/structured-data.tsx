// SEO Structured Data Components for db Productions
// JSON-LD Schema.org markup for enhanced Google search results

interface OrganizationSchemaProps {
    url?: string
}

export function OrganizationSchema({ url = 'https://dbproductions.net' }: OrganizationSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'db Productions',
        alternateName: 'ДИ БИ БРАДЪРС ООД',
        url: url,
        logo: `${url}/android-chrome-512x512.png`,
        description: 'Професионална видео продукция и дигитална агенция в България. Създаваме реклами, YouTube серии, корпоративни видеа и съдържание за социални мрежи.',
        foundingDate: '2020',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'ул. Граф Игнатиев 44',
            addressLocality: 'София',
            addressCountry: 'BG',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'video@dbproductions.net',
            contactType: 'customer service',
            availableLanguage: ['Bulgarian', 'English'],
        },
        sameAs: [
            'https://www.facebook.com/dbproductions.bg',
            'https://www.instagram.com/dbproductions.bg',
            'https://www.youtube.com/@dbproductions',
            'https://www.tiktok.com/@dbproductions.bg',
        ],
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

export function LocalBusinessSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://dbproductions.net/#localbusiness',
        name: 'db Productions',
        image: 'https://dbproductions.net/og-image.jpg',
        description: 'Видео продукция и дигитална агенция в София, България. Професионално заснемане на реклами, корпоративни видеа, YouTube серии и съдържание за социални мрежи.',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'ул. Граф Игнатиев 44',
            addressLocality: 'София',
            postalCode: '1000',
            addressCountry: 'BG',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 42.6977,
            longitude: 23.3219,
        },
        url: 'https://dbproductions.net',
        email: 'video@dbproductions.net',
        priceRange: '$$',
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
        },
        areaServed: {
            '@type': 'Country',
            name: 'Bulgaria',
        },
        serviceType: [
            'Видео продукция',
            'Рекламни видеа',
            'YouTube серии',
            'Корпоративни видеа',
            'Съдържание за социални мрежи',
            'TikTok видеа',
            'Facebook реклами',
        ],
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

interface VideoObjectSchemaProps {
    name: string
    description?: string
    thumbnailUrl?: string
    uploadDate?: string
    embedUrl?: string
    duration?: string
}

export function VideoObjectSchema({
    name,
    description,
    thumbnailUrl,
    uploadDate,
    embedUrl,
    duration,
}: VideoObjectSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: name,
        description: description || `${name} - видео продукция от db Productions`,
        thumbnailUrl: thumbnailUrl || 'https://dbproductions.net/og-image.jpg',
        uploadDate: uploadDate || new Date().toISOString(),
        embedUrl: embedUrl,
        duration: duration,
        publisher: {
            '@type': 'Organization',
            name: 'db Productions',
            logo: {
                '@type': 'ImageObject',
                url: 'https://dbproductions.net/android-chrome-512x512.png',
            },
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

interface BreadcrumbItem {
    name: string
    url: string
}

interface BreadcrumbSchemaProps {
    items: BreadcrumbItem[]
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

export function WebsiteSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'db Productions',
        alternateName: 'db Productions Bulgaria',
        url: 'https://dbproductions.net',
        description: 'Професионална видео продукция и дигитална агенция в България',
        inLanguage: 'bg-BG',
        publisher: {
            '@type': 'Organization',
            name: 'db Productions',
            logo: {
                '@type': 'ImageObject',
                url: 'https://dbproductions.net/android-chrome-512x512.png',
            },
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

// Service schema for video production services
export function ServiceSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Video Production',
        provider: {
            '@type': 'Organization',
            name: 'db Productions',
            url: 'https://dbproductions.net',
        },
        areaServed: {
            '@type': 'Country',
            name: 'Bulgaria',
        },
        description: 'Професионална видео продукция в България - реклами, YouTube серии, корпоративни видеа, съдържание за социални мрежи',
        offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'BGN',
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
