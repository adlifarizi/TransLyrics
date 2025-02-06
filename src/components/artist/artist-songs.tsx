import SongCard from "../cards/song";

const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

// Komponen utama
export default async function ArtistSongs({ id }: { id: string }) {
    if (!id) throw new Error("Can't find the artist songs you are looking for");

    try {
        // Delay fetch simulation
        // await new Promise(resolve => setTimeout(resolve, 3000));

        const res = await fetch(`${backendApiUrl}/songs?artist_id=${id}&sort_by=release_date&direction=desc`, {
            cache: "no-store", // No cache for fresh results
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch artist songs: ${res.status} ${res.statusText}`);
        }

        const jsonResponse = await res.json();
        const songs = await jsonResponse.data;

        if (!songs) {
            throw new Error("Can't find the artist songs you are looking for");
        }

        return (
            <section className="relative items-start gap-6 w-full py-2 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
                <h2 className="text-xl lg:text-2xl font-bold text-dark truncate mb-2">Songs</h2>

                {/* Menampilkan daftar lagu atau pesan kosong */}
                {songs.length > 0 ? (
                    <div className="grid grid-cols-1 gap-x-4 gap-y-2">
                        {songs.map((song: any) => (
                            <SongCard key={song.id} song={song} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-xs md:text-sm lg:text-base text-gray-500 p-4">
                        No song available at this time
                    </div>
                )}
            </section >
        )
    } catch {
        throw new Error("An unexpected error occurred.");
    }

}
