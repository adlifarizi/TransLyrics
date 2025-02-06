export default function AlbumCard({ album }: { album: any }) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    return (
        <a
            href={`/albums/${album.id}/${album.slug}`}
            className="group flex flex-col w-full overflow-hidden cursor-pointer">

            {/* Cover Image */}
            <div className="w-full aspect-square">
                <img
                    src={album.image ? `${backendUrl}${album.image}` : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'}
                    alt={album.title}
                    className="w-full h-full object-cover rounded"
                />
            </div>

            {/* Album Info */}
            <div className="py-1 flex flex-col">
                <h3 className="text-base md:text-lg font-medium text-dark line-clamp-2 group-hover:text-blue-500">
                    {album.title}
                </h3>
                <p className="text-sm md:text-base font-normal text-gray-500 line-clamp-1">
                    {(album.songs.length) + " songs"}
                </p>
            </div>

        </a>
    );
}