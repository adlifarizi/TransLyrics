export default function CallToAction() {
    return (
        <section className="relative w-full py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">

            <h2 className="text-xl lg:text-2xl font-bold text-dark truncate mb-2 select-none">Looking for more?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2 gap-y-2">
                {/* Browse Song */}
                <div
                    className="text-sm lg:text-base rounded-xl bg-gradient-to-b from-blue-400 to-blue-500 p-6 relative h-24 md:h-40 lg:h-48">
                    <div className="absolute top-3 md:top-4 right-4 text-xl md:text-4xl lg:text-6xl text-light">
                        <i className="fa-solid fa-music"></i>
                    </div>

                    <div className="absolute bottom-4 left-0 right-0 px-4 md:px-6 flex justify-between items-end">
                        <div className="max-w-[60%]">
                            <p className="text-light select-none">
                                Discover lyrics across different languages.
                            </p>
                        </div>

                        <a
                            href="/songs"
                            className="bg-blue-700 hover:bg-blue-800 font-medium text-light p-2 rounded-lg transition duration-200 whitespace-nowrap select-none">
                            Browse Songs
                        </a>
                    </div>
                </div>

                {/* Browse Albums */}
                <div
                    className="text-sm lg:text-base rounded-xl bg-gradient-to-b from-gray-400 to-gray-500 p-6 relative  h-24 md:h-40 lg:h-48">
                    <div className="absolute top-3 md:top-4 right-4 text-xl md:text-4xl lg:text-6xl text-light">
                        <i className="fa-solid fa-record-vinyl"></i>
                    </div>

                    <div className="absolute bottom-4 left-0 right-0 px-4 md:px-6 flex justify-between items-end">
                        <div className="max-w-[60%]">
                            <p className="text-light select-none">
                                Explore albums and enjoy new music.
                            </p>
                        </div>

                        <a
                            href="/albums"
                            className="bg-gray-700 hover:bg-gray-800 font-medium text-light p-2 rounded-lg transition duration-200 whitespace-nowrap select-none">
                            Browse Albums
                        </a>
                    </div>
                </div>

                {/* Browse Artists */}
                <div
                    className="text-sm lg:text-base rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 p-6 relative h-24 md:h-40 lg:h-48">
                    <div className="absolute top-3 md:top-4 right-4 text-xl md:text-4xl lg:text-6xl text-light">
                        <i className="fa-solid fa-users"></i>
                    </div>

                    <div className="absolute bottom-4 left-0 right-0 px-4 md:px-6 flex justify-between items-end">
                        <div className="max-w-[60%]">
                            <p className="text-light select-none">
                                Discover your favorite artists to find hidden gems
                            </p>
                        </div>

                        <a
                            href="/artists"
                            className="bg-blue-500 hover:bg-blue-600 font-medium text-light p-2 rounded-lg transition duration-200 whitespace-nowrap select-none">
                            Browse Artists
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}