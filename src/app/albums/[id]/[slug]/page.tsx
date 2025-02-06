export const dynamic = "force-dynamic";

import AlbumInfo from "@/components/album/album-info";
import AlbumInfoShimmer from "@/components/album/album-info-shimmer";
import AlbumSongs from "@/components/album/album-songs";
import AlbumSongsShimmer from "@/components/album/album-songs-shimmer";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { Metadata } from "next";

const siteUrl = process.env.NEXT_SITE_URL;
const siteName = process.env.NEXT_SITE_NAME
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;

    const album = await fetchAlbum(id);

    return {
        title: `${album.title} by ${album.artist.name} - Lyrics & Translations | TransLyrics`,
        description: `Explore the album "${album.title}" by ${album.artist.name}, featuring lyrics with translations to English, Romaji, and Indonesian.`,
        openGraph: {
            title: `${album.title} by ${album.artist.name} - Lyrics & Translations | TransLyrics`,
            description: `Find information about the album "${album.title}" by ${album.artist.name}, including lyrics and translations into English, Romaji, and Indonesian.`,
            url: `${siteUrl}/albums/${album.id}/${album.slug}`,
            images: album.image ? `${backendUrl}${album.image}` : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
            siteName: `${siteName}`
        },
        twitter: {
            card: 'summary_large_image',
            title: `${album.title} by ${album.artist.name} - Lyrics & Translations | TransLyrics`,
            description: `Discover the album "${album.title}" by ${album.artist.name}, featuring lyrics and translations in multiple languages. Explore now!`,
            images: album.image ? `${backendUrl}${album.image}` : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
        },
        metadataBase: new URL(`${siteUrl}/albums/${album.id}/${album.slug}`)
    }
}

const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

async function fetchAlbum(id: string) {

    try {
        // Delay fetch simulation
        // await new Promise(resolve => setTimeout(resolve, 3000));

        const res = await fetch(`${backendApiUrl}/albums?id=${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch album: ${res.status} ${res.statusText}`);
        }

        const jsonResponse = await res.json();
        const album = jsonResponse.data;

        if (!album) {
            throw new Error("Can't find the album you are looking for");
        }

        return album;
    } catch {
        throw new Error("An unexpected error occurred.");
    }

}

async function AlbumPageComponent({
    id,
    slug
}: {
    id: string;
    slug: string;
}) {
    const album = await fetchAlbum(id);

    // Redirect if slug not match
    if (slug !== album.slug) {
        redirect(`/albums/${id}/${album.slug}`);
    }

    return (
        <div className="container min-h-[50vh]">
            {/* Album Information */}
            <AlbumInfo album={album} />

            {/* Album Songs */}
            <Suspense fallback={<AlbumSongsShimmer />}>
                <AlbumSongs id={id} />
            </Suspense>
        </div>
    );
}

export default async function AbumPage({
    params,
}: {
    params: Promise<{ id: string; slug: string }>;
}) {
    const { id, slug } = await params;

    return (
        <Suspense fallback={<AlbumInfoShimmer />}>
            <AlbumPageComponent id={id} slug={slug} />
        </Suspense>
    );
}