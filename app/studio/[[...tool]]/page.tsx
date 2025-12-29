/**
 * This route is responsible for the built-in authoring environment of Sanity.
 * All routes under /studio will be handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { Studio } from './Studio';

// Ensure the Studio route is statically generated
export const dynamic = 'force-static';

// Set the title of the Studio tab
export const metadata = {
    title: 'Sanity Studio',
};

export default function StudioPage() {
    return <Studio />;
}
