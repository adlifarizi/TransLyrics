<script setup>
const config = useRuntimeConfig();
const baseUrl = config.public.baseUrl;

// SEO Meta for Home
useSeoMeta({
    title: () => `TransLyrics - Japanese Song Lyrics & Translations`,
    keywords: () =>
        `Japanese songs, song translations, song lyrics, lyrics translations, English translations, Romaji translations, Indonesian translations, Japanese music, TransLyrics`,
    description: () =>
        `Discover Japanese songs with accurate lyrics and translations to English, Romaji, and Indonesian. Explore albums, artists, and songs with detailed information on TransLyrics.`,
    ogTitle: () => `TransLyrics - Japanese Song Lyrics & Translations`,
    ogDescription: () =>
        `Find Japanese songs, artists, and albums with lyrics and translations into English, Romaji, and Indonesian. TransLyrics brings the beauty of Japanese music closer to you.`,
    ogUrl: () => `${baseUrl}`,
    twitterCard: 
        'summary_large_image',
    twitterTitle: () => 
        `TransLyrics - Japanese Song Lyrics & Translations`,
    twitterDescription: () =>
        `Explore Japanese music with lyrics and translations in multiple languages. Find your favorite songs, albums, and artists on TransLyrics.`,
    canonical: () => `${baseUrl}`,
});
</script>

<template>
    <div>
        <!-- Hero -->
        <HomeSectionHero />
        <!-- Featured Artist Section -->
        <HomeSectionFeaturedArtist />
        <!-- Newly Added Section -->
        <HomeSectionNewlyAdded />
        <!-- CTA Section -->
        <HomeSectionCTA />
    </div>
</template>