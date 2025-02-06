import AlbumShimmer from "../cards/album-shimmer";

export default function ArtistAlbumsShimmer() {
    return (
        <section className="relative items-start gap-6 w-full py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse mb-2" />

            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className={index > 2 ? "hidden md:block" : ""}>
                        <AlbumShimmer />
                    </div>
                ))}
            </div>
        </section >
    )
}
