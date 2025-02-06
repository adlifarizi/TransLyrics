export const dynamic = "force-dynamic";

import ArtistAlbums from "@/components/artist/artist-albums";
import ArtistAlbumsShimmer from "@/components/artist/artist-albums-shimmer";
import ArtistInfo from "@/components/artist/artist-info";
import ArtistInfoShimmer from "@/components/artist/artist-info-shimmer";
import ArtistSongs from "@/components/artist/artist-songs";
import ArtistSongsShimmer from "@/components/artist/artist-songs-shimmer";
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

    const artist = await fetchArtist(id);

    return {
        title: `${artist.name} - Lyrics & Translations | TransLyrics`,
        description: `Explore ${artist.name}'s songs and albums, featuring lyrics with translations to English, Romaji, and Indonesian.`,
        openGraph: {
            title: `${artist.name} - Lyrics & Translations | TransLyrics`,
            description: `Find detailed information about ${artist.name}'s songs and albums, including lyrics and translations into English, Romaji, and Indonesian.`,
            url: `${siteUrl}/artists/${artist.id}/${artist.slug}`,
            images: artist.image ? `${backendUrl}${artist.image}` : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg',
            siteName: `${siteName}`
        },
        twitter: {
            card: 'summary_large_image',
            title: `${artist.name} - Lyrics & Translations | TransLyrics`,
            description: `Discover ${artist.name}'s music, featuring lyrics and translations in multiple languages. Explore now!`,
            images: artist.image ? `${backendUrl}${artist.image}` : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg',
        },
        metadataBase: new URL(`${siteUrl}/artists/${artist.id}/${artist.slug}`)
    }
}

const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

async function fetchArtist(id: string) {

    try {
        // Delay fetch simulation
        // await new Promise(resolve => setTimeout(resolve, 3000));

        const res = await fetch(`${backendApiUrl}/artists?id=${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch artist: ${res.status} ${res.statusText}`);
        }

        const jsonResponse = await res.json();
        const artist = jsonResponse.data;

        if (!artist) {
            throw new Error("Can't find the artist you are looking for");
        }

        return artist;
    } catch {
        throw new Error("An unexpected error occurred.");
    }

}

async function ArtistPageComponent({
    id,
    slug
}: {
    id: string;
    slug: string;
}) {
    const artist = await fetchArtist(id);

    // Redirect if slug not match
    if (slug !== artist.slug) {
        redirect(`/artists/${id}/${artist.slug}`);
    }

    return (
        <div className="container min-h-[50vh]">
            {/* Artist Information */}
            <ArtistInfo artist={artist} />

            {/* Artist Albums */}
            <Suspense fallback={<ArtistAlbumsShimmer />}>
                <ArtistAlbums id={id} />
            </Suspense>

            {/* Artist Songs */}
            <Suspense fallback={<ArtistSongsShimmer />}>
                <ArtistSongs id={id} />
            </Suspense>
        </div>
    );
}

export default async function ArtistPage({
    params,
}: {
    params: Promise<{ id: string; slug: string }>;
}) {
    const { id, slug } = await params;

    return (
        <Suspense fallback={<ArtistInfoShimmer />}>
            <ArtistPageComponent id={id} slug={slug} />
        </Suspense>
    );
}