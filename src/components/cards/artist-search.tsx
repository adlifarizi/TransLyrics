export default function ArtistSearchCard({ artist }: { artist: any }) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    return (
        <div className="flex flex-row gap-2 overflow-hidden py-2 w-full">
            {/* Profile Info */}
            <a
                href={`/artists/${artist.id}/${artist.slug}`}
                className="group flex w-full overflow-hidden cursor-pointer relative items-start">

                {/* Cover Image */}
                <img
                    src={artist.image ? `${backendUrl}${artist.image}` : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'}
                    alt={artist.name}
                    className="w-12 h-12 lg:w-16 lg:h-16 rounded-sm object-cover"
                />

                {/* Artist Name */}
                <div className="flex flex-col px-2">
                    <h3 className="text-base md:text-lg font-medium text-dark line-clamp-1 group-hover:text-blue-500">
                        {artist.name}
                    </h3>
                </div>
            </a>
        </div>
    );
};