import SongShimmer from "../cards/song-shimmer";

export default function ArtistSongsShimmer() {
    return (
        <section className="relative items-start gap-6 w-full py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse mb-2" />

            <div className="grid grid-cols-1 gap-x-4 gap-y-2">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index}>
                        <SongShimmer />
                    </div>
                ))}
            </div>
        </section >
    )
}
