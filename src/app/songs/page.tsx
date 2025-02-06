export const dynamic = "force-dynamic";

import SongSearchCard from "@/components/cards/song-search";
import AlphabetNavigation from "@/components/search/alphabet-navigation";
import { Suspense } from "react";

async function SongList() {
    const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    try {
        // Delay fetch simulation
        // await new Promise(resolve => setTimeout(resolve, 3000));

        const res = await fetch(`${backendApiUrl}/songs?sort_by=title&direction=asc`,
            { cache: 'no-store' }
        );

        if (!res.ok) {
            throw new Error(`Failed to fetch songs: ${res.status} ${res.statusText}`);
        }

        const jsonResponse = await res.json();
        const songs = jsonResponse.data || [];

        const getAlbumsBySection = (letter: string) => {
            if (!songs) return [];
            if (letter === "#") {
                return songs.filter((song: any) => {
                    const firstChar = song.title.charAt(0).toUpperCase();
                    return !alphabet.includes(firstChar);
                });
            }
            return songs
                .filter((song: any) => song.title.charAt(0).toUpperCase() === letter)
                .sort((a: any, b: any) => a.title.localeCompare(b.title));
        };

        return (
            <div className="container py-4 px-4 md:px-6 lg:px-8 xl:px-10">
                <h1 className="text-xl lg:text-2xl font-bold text-dark truncate mb-2">Song List</h1>

                {/* Client Component untuk navigasi */}
                <AlphabetNavigation alphabet={alphabet} />

                {/* Song List Sections */}
                <div className="space-y-8">
                    {/* Special characters section */}
                    <div id="section-#" className="scroll-mt-24">
                        <h2 className="text-xl text-dark font-bold mb-1">##</h2>
                        {getAlbumsBySection("#").length > 0 ? (
                            <div className="space-y-2">
                                {getAlbumsBySection("#").map((song: any) => (
                                    <SongSearchCard key={song.id} song={song} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No song available at this time</p>
                        )}
                    </div>

                    {/* Alphabet sections */}
                    {alphabet.map((letter) => (
                        <div key={letter} id={`section-${letter}`} className="scroll-mt-24">
                            <h2 className="text-xl text-dark font-bold mb-1">#{letter}</h2>
                            {getAlbumsBySection(letter).length > 0 ? (
                                <div className="space-y-2">
                                    {getAlbumsBySection(letter).map((song: any) => (
                                        <SongSearchCard key={song.id} song={song} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No song available at this time</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch {
        throw new Error("An unexpected error occurred.");
    }

}

export default function SongsPage() {
    return (
        <Suspense fallback={
            <div className="w-full min-h-[60vh] flex items-center justify-center text-blue-500 text-4xl">
                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-400 animate-spin fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            </div>
        }>
            <SongList />
        </Suspense>
    );
}
