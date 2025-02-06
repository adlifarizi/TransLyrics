export default function FeaturedArtistShimmer() {
    return (
        <div className="flex flex-row gap-2 overflow-hidden py-2 w-full">
            {/* Profile Info */}
            <div className="w-3/4 bg-gray-50 rounded shadow-sm overflow-hidden flex-shrink-0">

                <div className="w-full relative px-4 mt-4">
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                        <div className="w-full h-1 bg-gray-100 animate-pulse"></div>
                    </div>

                    {/* Image */}
                    <div className="z-10 h-16 w-16 lg:h-20 lg:w-20 relative rounded-full overflow-hidden">
                        <div className="w-full h-full rounded-full object-cover bg-gray-200 animate-pulse"
                        />
                    </div>
                </div>

                {/* Artist Name */}
                <div className="space-y-1 p-4">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse mb-2"></div>
                </div>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-col space-y-2 flex-shrink-0 w-1/4 text-center">
                <div className="p-1 bg-gray-100 animate-pulse shadow-sm w-8 h-8 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"></div>
                <div className="p-1 bg-gray-100 animate-pulse shadow-sm w-8 h-8 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"></div>
                <div className="p-1 bg-gray-100 animate-pulse shadow-sm w-8 h-8 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"></div>
            </div>
        </div>
    );
};