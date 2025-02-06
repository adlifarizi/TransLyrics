const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function SongInfo({ song }: { song: any }) {
    return (
        <section className="w-full py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
            {/* Album Image and Info Container */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
                {/* Album Image */}
                <div className="flex-shrink-0">
                    <img
                        src={song.image ? `${backendUrl}${song.image}` : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"}
                        alt={song.title}
                        className="w-36 md:h-36 lg:w-48 lg:h-48 rounded object-cover"
                    />
                </div>

                {/* Song Info */}
                <div className="flex flex-col flex-1 w-fit">
                    {/* Song Title */}
                    <h1 className="text-xl lg:text-2xl font-bold text-dark line-clamp-2 mb-1">{song.title}</h1>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-6 space-y-2">
                        {/* Stats 1 */}
                        <div className="grid grid-cols-[92px_min-content_auto] md:grid-cols-[auto_min-content_auto] gap-x-3 gap-y-2 w-fit h-fit">
                            {song.original_title && (
                                <>
                                    <p className="text-dark">Original Title</p>
                                    <p className="text-dark">:</p>
                                    <p className="text-dark">{song.original_title}</p>
                                </>
                            )}
                            {song.romanized_title && (
                                <>
                                    <p className="text-dark">Romanized Title</p>
                                    <p className="text-dark">:</p>
                                    <p className="text-dark">{song.romanized_title}</p>
                                </>
                            )}
                            {song.artist?.name && (
                                <>
                                    <p className="text-dark">Artist</p>
                                    <p className="text-dark">:</p>
                                    <a href={`/artists/${song.artist.id}/${song.artist.slug}`}>
                                        <p className="text-blue-500 hover:text-blue-600">{song.artist.name}</p>
                                    </a>
                                </>
                            )}
                            {song.album?.title && (
                                <>
                                    <p className="text-dark">Album</p>
                                    <p className="text-dark">:</p>
                                    <a href={`/albums/${song.album.id}/${song.album.slug}`}>
                                        <p className="text-blue-500 hover:text-blue-600">{song.album.title}</p>
                                    </a>
                                </>
                            )}
                            {song.release_date && (
                                <>
                                    <p className="text-dark">Released</p>
                                    <p className="text-dark">:</p>
                                    <p className="text-dark">{song.release_date.slice(0, 4)}</p>
                                </>
                            )}
                        </div>

                        {/* Stats 2 */}
                        <div className="grid grid-cols-[92px_min-content_auto] md:grid-cols-[auto_min-content_auto] gap-x-3 gap-y-2 w-fit h-fit">
                            {song.vocal && (
                                <>
                                    <p className="text-dark">Vocal</p>
                                    <p className="text-dark">:</p>
                                    <p className="text-dark">{song.vocal}</p>
                                </>
                            )}
                            {song.lyricist && (
                                <>
                                    <p className="text-dark">Lyricist</p>
                                    <p className="text-dark">:</p>
                                    <p className="text-dark">{song.lyricist}</p>
                                </>
                            )}
                            {song.composer && (
                                <>
                                    <p className="text-dark">Composer</p>
                                    <p className="text-dark">:</p>
                                    <p className="text-dark">{song.composer}</p>
                                </>
                            )}
                            {song.arrangement && (
                                <>
                                    <p className="text-dark">Arrangement</p>
                                    <p className="text-dark">:</p>
                                    <p className="text-dark">{song.arrangement}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
