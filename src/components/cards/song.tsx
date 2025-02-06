export default function SongCard({ song }: { song: any }) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    return (
        <a href={`/songs/${song.id}/${song.slug}`}
            className="group flex w-full overflow-hidden cursor-pointer relative">

            {/* Cover Image */}
            <div className="w-full max-w-20 md:max-w-24 h-full max-h-20 md:max-h-24 aspect-square">
                <img
                    src={song.image ? `${backendUrl}${song.image}` : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'}
                    alt={song.title}
                    className="w-full h-full object-cover rounded"
                />
            </div>

            <div className="flex flex-col px-2 py-1">
                <h3 className="text-base md:text-lg font-medium text-dark line-clamp-2 group-hover:text-blue-500">
                    {song.title}
                </h3>
                <p className="text-sm md:text-base font-normal text-gray-500 line-clamp-1">
                    {song.artist.name}
                </p>
            </div>

        </a>
    );
}