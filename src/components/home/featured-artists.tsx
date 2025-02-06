import { Suspense } from "react";
import FeaturedArtistCard from "../cards/featured-artist";
import FeaturedArtistShimmer from "../cards/featured-artist-shimmer";

const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

async function ArtistList() {
    try {
        // Delay fetch simulation
        // await new Promise(resolve => setTimeout(resolve, 3000));

        const res = await fetch(`${backendApiUrl}/artists?sort_by=views&direction=desc`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch featured artists: ${res.status} ${res.statusText}`);
        }

        const artists = await res.json();

        const totalArtists = artists?.data?.length || 0;
        let sliceCount = 0;

        if (totalArtists >= 4) {
            sliceCount = 4;
        } else if (totalArtists >= 2) {
            sliceCount = 2;
        } else {
            sliceCount = totalArtists; // Bisa 0 atau 1
        }

        return totalArtists ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 md:gap-x-6 gap-y-0">
                {artists.data.slice(0, sliceCount).map((artist: any) => (
                    <FeaturedArtistCard key={artist.id} artist={artist} />
                ))}
            </div>
        ) : (
            <div className="text-center text-xs md:text-sm lg:text-base text-gray-500 p-4">
                No artist available at this time
            </div>
        );
    } catch {
        throw new Error("An unexpected error occurred.");
    }

}

// Komponen utama
export default function FeaturedArtists() {
    return (
        <section className="relative w-full py-2 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
            <div className="flex justify-between items-center mt-2 mb-1">
                <h2 className="text-xl lg:text-2xl font-bold text-dark truncate">
                    Featured Artists
                </h2>
                <a
                    href="/artists"
                    className="text-sm md:text-base text-blue-500 hover:underline">
                    See all
                </a>
            </div>

            <div className="container">
                <Suspense
                    fallback={
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 md:gap-x-6 gap-y-0">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className={index > 1 ? "hidden md:block" : ""}>
                                    <FeaturedArtistShimmer />
                                </div>
                            ))}
                        </div>
                    }
                >
                    <ArtistList />
                </Suspense>
            </div>
        </section>
    );
}
