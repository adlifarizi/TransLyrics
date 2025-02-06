export const dynamic = "force-dynamic";

import SongInfo from "@/components/song/song-info";
import SongInfoShimmer from "@/components/song/song-info-shimmer";
import SongLyrics from "@/components/song/song-lyrics";
import SongPlatform from "@/components/song/song-platform";
import { Suspense } from "react";
import { redirect } from "next/navigation";

const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

async function fetchSong(id: string) {

    try {
        // Delay fetch simulation
        // await new Promise(resolve => setTimeout(resolve, 3000));

        const res = await fetch(`${backendApiUrl}/songs?id=${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch song: ${res.status} ${res.statusText}`);
        }

        const jsonResponse = await res.json();
        const song = jsonResponse.data;

        if (!song) {
            throw new Error("Can't find the song you are looking for");
        }

        return song;
    } catch {
        throw new Error("An unexpected error occurred.");
    }

}

async function SongPageComponent({
    id,
    slug
}: {
    id: string;
    slug: string;
}) {
    const song = await fetchSong(id);

    // Redirect if slug not match
    if (slug !== song.slug) {
        redirect(`/songs/${id}/${song.slug}`);
    }

    return (
        <div className="container min-h-[50vh]">
            {/* Song Information */}
            <SongInfo song={song} />

            {/* Song Lyrics & Platform */}
            <div className="flex flex-col lg:flex-row">
                <SongLyrics lyrics={song.lyrics} />
                <SongPlatform song={song} />
            </div>
        </div>
    );
}

export default async function SongPage({
    params,
}: {
    params: Promise<{ id: string; slug: string }>;
}) {
    const { id, slug } = await params;

    return (
        <Suspense fallback={<SongInfoShimmer />}>
            <SongPageComponent id={id} slug={slug} />
        </Suspense>
    );
}
