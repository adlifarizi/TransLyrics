<script setup>
const config = useRuntimeConfig();
const baseUrl = config.public.baseUrl;

// SEO Meta for Home
useSeoMeta({
    title: () => `About TransLyrics - Japanese Song Lyrics & Translations`,
    keywords: () =>
        `about TransLyrics, Japanese songs, song translations, lyrics translations, Romaji translations, English translations, Indonesian translations, music translation site, cultural connection, TransLyrics creator`,
    description: () =>
        `Learn more about TransLyrics, a platform dedicated to providing accurate Japanese song lyrics and translations in Romaji, English, and Indonesian. Explore the mission to bridge cultural gaps through music and lyrics.`,
    ogTitle: () => `About TransLyrics - Japanese Song Lyrics & Translations`,
    ogDescription: () =>
        `Discover the story behind TransLyrics, a platform that offers accurate translations of Japanese songs in Romaji, English, and Indonesian. Connect with songs from different cultures through precise translations.`,
    ogUrl: () => `${baseUrl}/about`,
    twitterCard: 'summary_large_image',
    twitterTitle: () => `About TransLyrics - Japanese Song Lyrics & Translations`,
    twitterDescription: () =>
        `Find out about TransLyrics, a platform offering accurate translations of Japanese songs in Romaji, English, and Indonesian. Explore the cultural connection through music.`,
    canonical: () => `${baseUrl}/about`,
});

</script>

<template>
    <div class="relative w-full py-8 px-8 sm:px-10 md:px-12 lg:px-14 xl:px-16">
        <div class="container">
            <div class="flex flex-col md:flex-row items-start gap-8 md:gap-12">

                <!-- Logo Section -->
                <div class="hidden sm:block sm:w-20 md:w-32 lg:w-36 xl:w-40 flex-shrink-0">
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <div class="aspect-square relative">
                            <div class="absolute inset-0 flex items-center justify-center">
                                <img class="w-8 sm:w-10 md:w-14 lg:w-16 xl:w-20"
                                    src="~/assets/images/translyrics-logo.png" alt="TransLyrics">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Content Section -->
                <div class="flex-1 text-left md:text-left">
                    <!-- About TransLyrics -->
                    <h1 class="text-xl md:text-2xl lg:text-3xl font-bold mb-1 text-dark">
                        About TransLyrics
                    </h1>
                    <p class="text-base md:text-lg mb-6 text-dark">
                        TransLyrics is a platform that showcases song lyrics alongside their translations in various
                        languages. Focused on Japanese songs, it provides translations in Romaji, English, and
                        Indonesian, helping music enthusiasts explore and understand the meaning behind their favorite
                        songs across cultures.
                    </p>

                    <!-- Why Translyrics -->
                    <h2 class="text-xl md:text-2xl lg:text-3xl font-semibold mb-1 text-dark">
                        Why TransLyrics?
                    </h2>

                    <ul class="list-disc pl-6 mb-6">
                        <!-- Why TransLyrics - Accurate Translations -->
                        <li class="mb-4">
                            <h3 class="text-base md:text-lg font-medium text-dark">
                                Accurate Translations
                            </h3>
                            <p class="text-base md:text-lg text-dark">
                                We provide precise translations that stay true to the original meaning of the lyrics.
                            </p>
                        </li>

                        <!-- Why TransLyrics - Multilingual -->
                        <li class="mb-4">
                            <h3 class="text-base md:text-lg font-medium text-dark">
                                Multilingual
                            </h3>
                            <p class="text-base md:text-lg text-dark">
                                Explore your favorite songs in multiple languages, including Romaji, English, and
                                Indonesian.
                            </p>
                        </li>

                        <!-- Why TransLyrics - Cultural Connection -->
                        <li class="mb-4">
                            <h3 class="text-base md:text-lg font-medium text-dark">
                                Cultural Connection
                            </h3>
                            <p class="text-base md:text-lg text-dark">
                                Our translations help bridge the gap between languages, allowing you to connect with
                                songs from different cultures.
                            </p>
                        </li>
                    </ul>

                    <!-- About the Creator -->
                    <h2 class="text-xl md:text-2xl lg:text-3xl font-semibold mb-1 text-dark">
                        About Creator
                    </h2>
                    <p class="text-base md:text-lg text-dark">
                        TransLyrics was created by Adli/Kayoi.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>