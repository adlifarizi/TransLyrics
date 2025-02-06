export default function SongPlatform({ song }: { song: any }) {
    const hasPlatformLinks = Boolean(
        song.youtube_embed ||
        song.link_youtube_music ||
        song.link_spotify ||
        song.link_apple_music
    )

    return (
        <section className="relative items-start gap-6 w-full lg:w-3/4 py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
            <h2 className="text-xl lg:text-2xl font-medium text-dark truncate mb-2">
                Listen In
            </h2>

            {!hasPlatformLinks && (
                <div className="flex items-center gap-2">
                    <div className="bg-red-200 w-fit p-2 rounded-full">
                        <svg
                            className="h-4 w-4 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <p className="text-base lg:text-lg font-normal text-dark truncate">
                        No music platform found
                    </p>
                </div>
            )}

            {/* Embed YouTube Video */}
            {song.youtube_embed && (
                <div className="w-full aspect-video mt-4">
                    <iframe
                        src={song.youtube_embed}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    />
                </div>
            )}

            <div className="flex flex-row gap-2 mt-4">
                {song.link_youtube_music && (
                    <div className="bg-light py-2 px-4 rounded flex items-center w-fit">
                        <a
                            href={song.link_youtube_music}
                            target="_blank"
                        >
                            <img
                                src="/images/youtube_music_badge.png"
                                alt="YouTube Music"
                                className="w-24 h-auto rounded object-cover"
                            />
                        </a>
                    </div>
                )}

                {song.link_spotify && (
                    <div className="bg-light py-2 px-4 rounded flex items-center w-fit">
                        <a
                            href={song.link_spotify}
                            target="_blank"
                        >
                            <img
                                src="/images/spotify_badge.png"
                                alt="Spotify"
                                className="w-24 h-auto rounded object-cover"
                            />
                        </a>
                    </div>
                )}

                {song.link_apple_music && (
                    <div className="bg-light py-2 px-4 rounded flex items-center w-fit">
                        <a
                            href={song.link_apple_music}
                            target="_blank"
                        >
                            <img
                                src="/images/apple_music_badge.png"
                                alt="Apple Music"
                                className="w-24 h-auto rounded object-cover"
                            />
                        </a>
                    </div>
                )}
            </div>
        </section>
    )
}