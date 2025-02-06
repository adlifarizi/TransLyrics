export const dynamic = "force-dynamic";

import AlbumInfo from "@/components/album/album-info";
import AlbumInfoShimmer from "@/components/album/album-info-shimmer";
import AlbumSongs from "@/components/album/album-songs";
import AlbumSongsShimmer from "@/components/album/album-songs-shimmer";
import { redirect } from "next/navigation";
import { Suspense } from "react";

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