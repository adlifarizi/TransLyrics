import AlbumCard from "../cards/album";

const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

// Komponen utama
export default async function ArtistAlbums({ id }: { id: string }) {
    if (!id) throw new Error("Can't find the artist albums you are looking for");

    try {
        // Delay fetch simulation
        // await new Promise(resolve => setTimeout(resolve, 3000));

        const res = await fetch(`${backendApiUrl}/albums?artist_id=${id}&sort_by=release_date&direction=desc`, {
            cache: "no-store", // No cache for fresh results
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch artist albums: ${res.status} ${res.statusText}`);
        }

        const jsonResponse = await res.json();
        const albums = await jsonResponse.data;

        if (!albums) {
            throw new Error("Can't find the artist albums you are looking for");
        }

        return (
            <section className="relative items-start gap-6 w-full py-2 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
                <h2 className="text-xl lg:text-2xl font-bold text-dark truncate mb-2">Albums</h2>

                {/* Menampilkan daftar album atau pesan kosong */}
                {albums.length > 0 ? (
                    <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-2">
                        {albums.map((album: any) => (
                            <AlbumCard key={album.id} album={album} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-xs md:text-sm lg:text-base text-gray-500 p-4">
                        No album available at this time
                    </div>
                )}
            </section >
        )
    } catch {
        throw new Error("An unexpected error occurred.");
    }

}
