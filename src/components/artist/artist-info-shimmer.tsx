export default function ArtistInfoShimmer() {
    return (
        <section className="grid grid-cols-1 gap-2 xl:gap-3 w-full py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
            {/*  Artist Image and Info Container */}
            <div className="flex items-start gap-4">
                {/*  Artist Image */}
                <div className="flex-shrink-0">
                    <div className="w-36 h-36 lg:w-48 lg:h-48 rounded object-cover bg-gray-200 animate-pulse" />
                </div>

                {/*  Artist Info */}
                <div className="flex flex-col flex-1">
                    {/*  Artist Name */}
                    <div className="h-6 bg-gray-200 rounded w-28 animate-pulse mb-2" />

                    {/*  Stats */}
                    <div className="space-y-1 mb-4 w-fit">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse mb-1" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse mb-1" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse mb-1" />
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}