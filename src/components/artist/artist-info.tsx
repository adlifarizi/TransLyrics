const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function ArtistInfo({ artist }: { artist: any }) {
    return (
        <section className="grid grid-cols-1 gap-2 xl:gap-2 w-full py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
            {/*  Artist Image and Info Container */}
            <div className="flex items-start gap-4">
                {/*  Artist Image */}
                <div className="flex-shrink-0">
                    <img
                        src={artist.image ? `${backendUrl}${artist.image}` : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'}
                        alt={artist.name}
                        className="w-36 md:h-36 lg:w-48 lg:h-48 rounded object-cover" />
                </div>

                {/*  Artist Info */}
                <div className="flex flex-col flex-1">
                    {/*  Artist Name */}
                    <h1 className="text-xl lg:text-2xl font-bold text-dark line-clamp-2 mb-1">{artist.name}</h1>

                    {/*  Stats */}
                    <div className="grid grid-cols-[92px_min-content_auto] md:grid-cols-[auto_min-content_auto] gap-x-3 gap-y-2 w-fit h-fit">
                        <>
                            <p className="text-dark">Albums</p>
                            <p className="text-dark">:</p>
                            <p className="text-dark">{artist.albums.length}</p>
                        </>
                        <>
                            <p className="text-dark">Songs</p>
                            <p className="text-dark">:</p>
                            <p className="text-dark">{artist.songs.length}</p>
                        </>
                        <>
                            <p className="text-dark">Debut Year</p>
                            <p className="text-dark">:</p>
                            <p className="text-dark">{artist.debut_year ?? "-"}</p>
                        </>
                    </div>
                </div>
            </div>

            {/*  Social Media Links */}
            <div className="flex space-x-1 text-center">
                {artist.social_x && (
                    <a
                        href={artist.social_x}
                        target="_blank"
                        className="flex items-center justify-center p-1 w-10 h-10 rounded hover:bg-gray-100"
                    >
                        <i className="fa-brands fa-x-twitter text-lg text-dark self-center"></i>
                    </a>
                )}

                {artist.social_instagram && (
                    <a
                        href={artist.social_instagram}
                        target="_blank"
                        className="flex items-center justify-center p-1 w-10 h-10 rounded hover:bg-gray-100"
                    >
                        <i className='bx bxl-instagram-alt text-lg text-dark self-center'></i>
                    </a>
                )}

                {artist.social_youtube && (
                    <a
                        href={artist.social_youtube}
                        target="_blank"
                        className="flex items-center justify-center p-1 w-10 h-10 rounded hover:bg-gray-100"
                    >
                        <i className='bx bxl-youtube text-lg text-dark self-center'></i>
                    </a>
                )}

                {artist.social_spotify && (
                    <a
                        href={artist.social_spotify}
                        target="_blank"
                        className="flex items-center justify-center p-1 w-10 h-10 rounded hover:bg-gray-100"
                    >
                        <i className='bx bxl-spotify text-lg text-dark self-center'></i>
                    </a>
                )}
            </div >
        </section >
    )
}