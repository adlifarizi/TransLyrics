export default function SongInfoShimmer() {
    return (
        <section className="w-full py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
            {/* Album Image and Info Container */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
                {/* Album Image */}
                <div className="flex-shrink-0">
                    <div className="w-36 h-36 lg:w-48 lg:h-48 rounded object-cover bg-gray-200 animate-pulse" />
                </div>

                {/* Song Info */}
                <div className="flex flex-col flex-1 w-fit">
                    {/* Song Title */}
                    <div className="h-6 bg-gray-200 rounded w-28 animate-pulse mb-2" />

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-6 space-y-2">
                        {/* Stats 1 */}
                        <div className="flex flex-col gap-x-3 gap-y-2 w-fit h-fit">
                            <div className="h-4 bg-gray-200 rounded w-36 animate-pulse mb-1" />
                            <div className="h-4 bg-gray-200 rounded w-36 animate-pulse mb-1" />
                            <div className="h-4 bg-gray-200 rounded w-36 animate-pulse mb-1" />
                            <div className="h-4 bg-gray-200 rounded w-36 animate-pulse mb-1" />
                        </div>

                        {/* Stats 2 */}
                        <div className="flex flex-col gap-x-3 gap-y-2 w-fit h-fit">
                            <div className="h-4 bg-gray-200 rounded w-36 animate-pulse mb-1" />
                            <div className="h-4 bg-gray-200 rounded w-36 animate-pulse mb-1" />
                            <div className="h-4 bg-gray-200 rounded w-36 animate-pulse mb-1" />
                            <div className="h-4 bg-gray-200 rounded w-36 animate-pulse mb-1" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
