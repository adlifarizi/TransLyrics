import { Suspense } from "react";
import SongCard from "../cards/song";
import SongShimmer from "../cards/song-shimmer";

const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

async function SongList() {
    try {
        // Delay fetch simulation
        // await new Promise(resolve => setTimeout(resolve, 3000));

        const res = await fetch(`${backendApiUrl}/songs?sort_by=created_at&direction=desc`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch featured artists: ${res.status} ${res.statusText}`);
        }

        const songs = await res.json();

        const totalSongs = songs?.data?.length || 0;
        let sliceCount = 0;

        if (totalSongs > 6) {
            sliceCount = 6;
        } else if (totalSongs >= 4) {
            sliceCount = 4;
        } else if (totalSongs >= 2) {
            sliceCount = 2;
        } else {
            sliceCount = totalSongs; // Bisa 0 atau 1
        }

        return totalSongs ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                {songs.data.slice(0, sliceCount).map((song: any) => (
                    <SongCard
                        key={song.id}
                        song={song}
                    />
                ))}
            </div>
        ) : (
            <div className="text-center text-xs md:text-sm lg:text-base text-gray-500 p-4">
                No song available at this time
            </div>
        );
    } catch {
        throw new Error("An unexpected error occurred.");
    }

}

export default function NewlyAdded() {
    return (
        <section className="relative w-full py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">

            <h2 className="text-xl lg:text-2xl font-bold text-dark truncate mb-2">
                Newly Added
            </h2>

            <div className="container">
                <Suspense
                    fallback={
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className={index > 1 ? "hidden md:block" : ""}>
                                    <SongShimmer />
                                </div>
                            ))}
                        </div>
                    }
                >
                    <SongList />
                </Suspense>
            </div>
        </section>
    );
}