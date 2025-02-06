export default function AlbumInfoShimmer() {
    return (
        <section className="w-screen py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
            {/* Album Image and Info Container */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
                {/* Album Image */}
                <div className="flex-shrink-0">
                    <div className="w-36 h-36 lg:w-48 lg:h-48 rounded object-cover bg-gray-200 animate-pulse" />
                </div>

                {/* Album Info */}
                <div className="flex flex-col flex-1 w-fit">
                    {/* Album Title */}
                    <div className="h-6 bg-gray-200 rounded w-28 animate-pulse mb-2" />

                    {/* Stats - Menggunakan Grid agar tetap sejajar */}
                    <div className="flex flex-col gap-x-3 gap-y-2 w-fit">
                        <div className="h-4 bg-gray-200 rounded w-36 animate-pulse mb-1" />
                        <div className="h-4 bg-gray-200 rounded w-36 animate-pulse mb-1" />
                        <div className="h-4 bg-gray-200 rounded w-36 animate-pulse mb-1" />
                        <div className="h-4 bg-gray-200 rounded w-36 animate-pulse mb-1" />
                    </div>
                </div>
            </div>
        </section>
    );
}
