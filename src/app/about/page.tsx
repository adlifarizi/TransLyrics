import { Metadata } from "next";

const siteUrl = process.env.NEXT_SITE_URL;
const siteName = process.env.NEXT_SITE_NAME

export const metadata: Metadata = {
    title: 'About TransLyrics - Japanese Song Lyrics & Translations',
    description: 'Learn more about TransLyrics, a platform dedicated to providing accurate Japanese song lyrics and translations in Romaji, English, and Indonesian. Explore the mission to bridge cultural gaps through music and lyrics.',
    openGraph: {
        title: 'About TransLyrics - Japanese Song Lyrics & Translations',
        description: 'Discover the story behind TransLyrics, a platform that offers accurate translations of Japanese songs in Romaji, English, and Indonesian. Connect with songs from different cultures through precise translations.',
        url: `${siteUrl}/about`,
        siteName: `${siteName}`
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About TransLyrics - Japanese Song Lyrics & Translations',
        description: 'Find out about TransLyrics, a platform offering accurate translations of Japanese songs in Romaji, English, and Indonesian. Explore the cultural connection through music.',
    },
    metadataBase: new URL(`${siteUrl}/about`)
};

export default function AboutPage() {
    return (
        <div className="relative w-full py-8 px-8 sm:px-10 md:px-12 lg:px-14 xl:px-16">
            <div className="container">
                <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">

                    {/* Logo Section */}
                    <div className="hidden sm:block sm:w-20 md:w-32 lg:w-36 xl:w-40 flex-shrink-0">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="aspect-square relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <img
                                        src="/images/translyrics-logo.png"
                                        alt="TransLyrics"
                                        className="w-8 sm:w-10 md:w-14 lg:w-16 xl:w-20 select-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 text-left md:text-left">
                        {/* About TransLyrics */}
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 text-dark select-none">
                            About TransLyrics
                        </h1>
                        <p className="text-base md:text-lg mb-6 text-dark">
                            TransLyrics is a platform that showcases song lyrics alongside their translations in various
                            languages. Focused on Japanese songs, it provides translations in Romaji, English, and
                            Indonesian, helping music enthusiasts explore and understand the meaning behind their favorite
                            songs across cultures.
                        </p>

                        {/* Why Translyrics */}
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-1 text-dark select-none">
                            Why TransLyrics?
                        </h2>

                        <ul className="list-disc pl-6 mb-6">
                            {/* Why TransLyrics - Accurate Translations */}
                            <li className="mb-4">
                                <h3 className="text-base md:text-lg font-medium text-dark">
                                    Accurate Translations
                                </h3>
                                <p className="text-base md:text-lg text-dark">
                                    We provide precise translations that stay true to the original meaning of the lyrics.
                                </p>
                            </li>

                            {/* Why TransLyrics - Multilingual */}
                            <li className="mb-4">
                                <h3 className="text-base md:text-lg font-medium text-dark">
                                    Multilingual
                                </h3>
                                <p className="text-base md:text-lg text-dark">
                                    Explore your favorite songs in multiple languages, including Romaji, English, and
                                    Indonesian.
                                </p>
                            </li>

                            {/* Why TransLyrics - Cultural Connection */}
                            <li className="mb-4">
                                <h3 className="text-base md:text-lg font-medium text-dark">
                                    Cultural Connection
                                </h3>
                                <p className="text-base md:text-lg text-dark">
                                    Our translations help bridge the gap between languages, allowing you to connect with
                                    songs from different cultures.
                                </p>
                            </li>
                        </ul>

                        {/* About the Creator */}
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-1 text-dark select-none">
                            About Creator
                        </h2>
                        <p className="text-base md:text-lg text-dark">
                            TransLyrics was created by Adli/Kayoi.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}