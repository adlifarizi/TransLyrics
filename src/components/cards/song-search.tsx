export default function SongSearchCard({ song }: { song: any }) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    return (
        <div className="flex flex-row gap-2 overflow-hidden py-2 w-full">
            <a
                href={`/songs/${song.id}/${song.slug}`}
                className="group flex w-full overflow-hidden cursor-pointer relative items-start">

                {/* Cover Image */}
                <img
                    src={song.image ? `${backendUrl}${song.image}` : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'}
                    alt={song.title}
                    className="w-12 h-12 lg:w-16 lg:h-16 rounded-sm object-cover"
                />

                {/* Song Detail */}
                <div className="flex flex-col px-2">
                    <h3 className="text-base md:text-lg font-medium text-dark line-clamp-1 group-hover:text-blue-500">
                        {song.title }
                    </h3>
                    <h2 className="text-sm md:text-base font-normal text-gray-500 line-clamp-1">
                        {song.artist.name}
                    </h2>
                </div>
            </a>
        </div>
    );
};