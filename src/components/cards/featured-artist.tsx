export default function FeaturedArtistCard({ artist }: { artist: any }) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    return (
        <div className="flex flex-row gap-2 overflow-hidden py-2 w-full">
            {/* Profile Info */}
            <a
                href={`/artists/${artist.id}/${artist.slug}`}
                className="group w-3/4 bg-gray-50 border border-light hover:border-gray-200 rounded-lg shadow-sm cursor-pointer overflow-hidden flex-shrink-0">

                <div className="w-full relative px-4 mt-4">
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                        <div className="w-full h-[2px] bg-gray-100 group-hover:bg-gray-200"></div>
                    </div>

                    {/* Image */}
                    <div className="z-10 h-16 w-16 lg:h-20 lg:w-20 relative rounded-full overflow-hidden">
                        <img
                            src={artist.image ? `${backendUrl}${artist.image}` : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'}
                            alt={artist.name}
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                </div>

                {/* Artist Name */}
                <div className="space-y-1 p-4">
                    <h3 className="text-lg md:text-xl font-medium text-dark truncate w-full group-hover:text-blue-500">
                        {artist.name}
                    </h3>
                </div>
            </a>

            {/* Social Media Links */}
            <div className="flex flex-col space-y-2 flex-shrink-0 w-1/4 text-center">
                {artist.social_x && (
                    <a
                        href={artist.social_x}
                        target="_blank"
                        className="p-1 bg-gray-50 border border-light hover:border-gray-200 w-8 h-8 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
                        <i className="fa-brands fa-x-twitter text-sm text-dark"></i>
                    </a>
                )}
                {artist.social_instagram && (
                    <a
                        href={artist.social_instagram}
                        target="_blank"
                        className="p-1 bg-gray-50 border border-light hover:border-gray-200 w-8 h-8 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
                        <i className="bx bxl-instagram-alt text-base text-dark"></i>
                    </a>
                )}
                {artist.social_youtube && (
                    <a
                        href={artist.social_youtube}
                        target="_blank"
                        className="p-1 bg-gray-50 border border-light hover:border-gray-200 w-8 h-8 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
                        <i className="bx bxl-youtube text-base text-dark"></i>
                    </a>
                )}
                {artist.social_spotify && (
                    <a
                        href={artist.social_spotify}
                        target="_blank"
                        className="p-1 bg-gray-50 border border-light hover:border-gray-200 w-8 h-8 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
                        <i className="bx bxl-spotify text-base text-dark"></i>
                    </a>
                )}
            </div>
        </div>
    );
};