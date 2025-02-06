export const dynamic = "force-dynamic";

import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_SITE_URL;
const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const fetchData = async (endpoint: string) => {
        try {
            const res = await fetch(`${backendApiUrl}/${endpoint}`, { cache: 'no-store' });
            if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
            const jsonResponse = await res.json();
            return jsonResponse.data || [];
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            return [];
        }
    };

    // Fetch data dari API
    const [artists, albums, songs] = await Promise.all([
        fetchData('artists'),
        fetchData('albums'),
        fetchData('songs'),
    ]);

    // URL statis
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
        { url: `${siteUrl}/artists`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: `${siteUrl}/albums`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: `${siteUrl}/songs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ];

    // URL dinamis
    const dynamicRoutes: MetadataRoute.Sitemap = [
        ...artists.map((artist: { id: string, slug: string }) => ({
            url: `${siteUrl}/artists/${artist.id}/${artist.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        })),
        ...albums.map((album: { id: string, slug: string }) => ({
            url: `${siteUrl}/albums/${album.id}/${album.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        })),
        ...songs.map((song: { id: string, slug: string }) => ({
            url: `${siteUrl}/songs/${song.id}/${song.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        })),
    ];

    return [...staticRoutes, ...dynamicRoutes];
}
