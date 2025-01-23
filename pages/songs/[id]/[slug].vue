<script setup>
const route = useRoute();
const id = route.params.id;
const slug = route.params.slug;
const config = useRuntimeConfig();
const baseUrl = config.public.baseUrl;
const backendUrl = config.public.backendUrl;

const { statusSong, data: song } = await useAPI('/songs', {
    query: {
        id: id,
    },

});

if (!song.value?.data) {
    throw createError({
        statusCode: 404,
        message: "Song Not Found",
    })
}

if (song.value.data.slug !== slug) {
    // Perbarui URL tanpa reload halaman
    navigateTo({
        path: `/songs/${id}/${song.value.data.slug}`,
    });
}

// SEO Meta
useSeoMeta({
    title: () =>
        `${song.value.data.title} by ${song.value.data.artist.name} - Lyrics & Translations | TransLyrics`,
    keywords: () =>
        `${song.value.data.title}, ${song.value.data.original_title}, ${song.value.data.artist.name}, Japanese songs, song translations, song lyrics, lyrics translations, English translations, Romaji translations, Indonesian translations, TransLyrics`,
    description: () =>
        `Explore the song "${song.value.data.title}" by ${song.value.data.artist.name}${song.value.data.album?.title ? ` from the album "${song.value.data.album.title}"` : ''
        }. Find lyrics with translations to English, Romaji, and Indonesian. Discover the beauty of Japanese music with accurate translations.`,
    ogTitle: () =>
        `${song.value.data.title} by ${song.value.data.artist.name} - Lyrics & Translations | TransLyrics`,
    ogDescription: () =>
        `Find information about the song "${song.value.data.title}" by ${song.value.data.artist.name}${song.value.data.album?.title ? ` from the album "${song.value.data.album.title}"` : ''
        }, including lyrics and translations into English, Romaji, and Indonesian.`,
    ogImage: () =>
        `${backendUrl}${song.value.data.image}` || 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
    ogUrl: () =>
        `${baseUrl}/songs/${song.value.data.id}/${song.value.data.slug}`,
    twitterCard:
        'summary_large_image',
    twitterTitle: () =>
        `${song.value.data.title} by ${song.value.data.artist.name} - Lyrics & Translations | TransLyrics`,
    twitterDescription: () =>
        `Discover the song "${song.value.data.title}" by ${song.value.data.artist.name}${song.value.data.album?.title ? ` from the album "${song.value.data.album.title}"` : ''
        }, featuring lyrics and translations in multiple languages. Explore now!`,
    twitterImage: () =>
        `${backendUrl}${song.value.data.image}` || 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
    canonical: () =>
        `${baseUrl}/songs/${song.value.data.id}/${song.value.data.slug}`,
});

</script>

<template>
    <div class="container min-h-[50vh]">

        <p>{{ statusSong }}</p>
        <!-- Song Information -->
        <div>
            <SongDetailSectionInformationShimmer v-if="statusSong === 'pending'" />
            <SongDetailSectionInformation v-if="song?.data" :key="song.data.id" :song="song.data" />
        </div>

        <!-- Lyrics and Listen Platform -->
        <div class="flex flex-col lg:flex-row">
            <SongDetailSectionLyrics v-if="song?.data" :key="song.data.id" :song="song.data" />
            <SongDetailSectionListenPlatform v-if="song?.data" :key="song.data.id" :song="song.data" />
        </div>

    </div>
</template>
