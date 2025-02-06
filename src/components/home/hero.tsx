export default function Hero() {
    return (
        <section className="relative w-full hero-background py-8 px-8 sm:px-10 md:px-12 lg:px-14 xl:px-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {/* Logo Section */}
                    <div className="hidden sm:block sm:w-20 md:w-32 lg:w-36 xl:w-40 flex-shrink-0">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="aspect-square relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <img
                                        src="/images/translyrics-logo.png"
                                        alt="TransLyrics"
                                        className="w-8 sm:w-10 md:w-14 lg:w-16 xl:w-20"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-light">
                            Welcome to Trans<span className="text-blue-500">Lyrics</span>
                        </h1>

                        <div className="space-y-4 text-light text-sm md:text-base">
                            Welcome to TransLyrics, your go-to platform for song lyric
                            translations. Enjoy your favorite Japanese songs with translations
                            in Romaji, English, and Indonesian, making it easier to understand
                            and connect with the music.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
