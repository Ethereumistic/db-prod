import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { OrganizationSchema, LocalBusinessSchema, WebsiteSchema, ServiceSchema } from "@/components/seo/structured-data";

const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = 'https://dbproductions.net';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "db Productions | Видео Продукция и Дигитална Агенция в България",
    template: "%s | db Productions",
  },
  description: "Професионална видео продукция в София, България. Създаваме реклами, YouTube серии, корпоративни видеа, TikTok и съдържание за социални мрежи. Свържете се с нас за вашия следващ проект.",
  keywords: [
    "видео продукция",
    "видео продукция България",
    "видео продукция София",
    "рекламни видеа",
    "дигитална агенция България",
    "YouTube серии продукция",
    "корпоративни видеа",
    "TikTok видеа България",
    "Facebook реклами видео",
    "съдържание за социални мрежи",
    "video production Bulgaria",
    "db Productions",
  ],
  authors: [{ name: "db Productions" }],
  creator: "db Productions",
  publisher: "db Productions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: BASE_URL,
    siteName: "db Productions",
    title: "db Productions | Видео Продукция и Дигитална Агенция в България",
    description: "Професионална видео продукция в София, България. Реклами, YouTube серии, корпоративни видеа и съдържание за социални мрежи.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "db Productions | Професионална Видео Продукция",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "db Productions | Видео Продукция България",
    description: "Професионална видео продукция в София. Реклами, YouTube серии, корпоративни видеа.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
  verification: {
    // Add Google Search Console verification when available
    // google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
  category: "video production",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className={outfit.variable + ' dark'} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="geo.region" content="BG" />
        <meta name="geo.placename" content="София" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <OrganizationSchema />
        <LocalBusinessSchema />
        <WebsiteSchema />
        <ServiceSchema />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-black text-white selection:bg-white selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}