const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function AlbumInfo({ album }: { album: any }) {
    return (
        <section className="w-full py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
            {/* Album Image and Info Container */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
                {/* Album Image */}
                <div className="flex-shrink-0">
                    <img
                        src={album.image ? `${backendUrl}${album.image}` : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"}
                        alt={album.title}
                        className="w-36 md:h-36 lg:w-48 lg:h-48 rounded object-cover"
                    />
                </div>

                {/* Album Info */}
                <div className="flex flex-col flex-1 w-fit">
                    {/* Album Title */}
                    <h1 className="text-xl lg:text-2xl font-bold text-dark line-clamp-2 mb-1">{album.title}</h1>

                    {/* Stats */}
                    <div className="grid grid-cols-[92px_min-content_auto] md:grid-cols-[auto_min-content_auto] gap-x-3 gap-y-2 w-fit h-fit">
                        {album.original_title && (
                            <>
                                <p className="text-dark">Original Title</p>
                                <p className="text-dark">:</p>
                                <p className="text-dark">{album.original_title}</p>
                            </>
                        )}
                        {album.romanized_title && (
                            <>
                                <p className="text-dark">Romanized Title</p>
                                <p className="text-dark">:</p>
                                <p className="text-dark">{album.romanized_title}</p>
                            </>
                        )}
                        {album.artist?.name && (
                            <>
                                <p className="text-dark">Artist</p>
                                <p className="text-dark">:</p>
                                <a href={`/artists/${album.artist.id}/${album.artist.slug}`}>
                                    <p className="text-blue-500 hover:text-blue-600">{album.artist.name}</p>
                                </a>
                            </>
                        )}
                        {album.release_date && (
                            <>
                                <p className="text-dark">Released</p>
                                <p className="text-dark">:</p>
                                <p className="text-dark">{album.release_date.slice(0, 4)}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
