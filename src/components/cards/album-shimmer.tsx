export default function AlbumShimmer() {
    return (
        <div className="flex flex-col bg-white w-full overflow-hidden">

            {/* Cover Image */}
            <div className="w-full aspect-square">
                <div className="w-full h-full object-cover rounded bg-gray-200 animate-pulse" />
            </div>

            {/* Album Info */}
            <div className="py-1 flex flex-col">
                <div className="h-4 md:h-6 bg-gray-200 rounded w-full animate-pulse mb-1" />
                <div className="h-2 md:h-4 bg-gray-200 rounded w-1/2 animate-pulse mb-1" />
            </div>

        </div>
    );
}