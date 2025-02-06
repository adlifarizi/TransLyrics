export default function SongShimmer() {
    return (
        <div className="flex w-full overflow-hidden relative">

            {/* Cover Image */}
            <div className="w-full max-w-20 md:max-w-24 h-full max-h-20 md:max-h-24 aspect-square">
                <div className="w-full h-full object-cover rounded bg-gray-200 animate-pulse"/>
            </div>

            <div className="flex flex-col px-2 py-1 w-full">
                <div className="mb-1 h-6 rounded w-full bg-gray-200 animate-pulse"></div>
                <div className="mb-1 h-4 rounded w-1/2 bg-gray-200 animate-pulse"></div>
            </div>

        </div>
    );
}