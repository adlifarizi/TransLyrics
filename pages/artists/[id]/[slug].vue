<script setup>
const route = useRoute();
const id = route.params.id;
const slug = route.params.slug;
const config = useRuntimeConfig();
const baseUrl = config.public.baseUrl;
const backendUrl = config.public.backendUrl;

const { statusArtist, data: artist } = await useAPI('/artists', {
    query: {
        id: id,
    },
});

const { statusAlbums, data: albums } = await useAPI('/albums', {
    query: {
        artist_id: id,
        sort_by: "release_date",
        direction: "desc"
    },
    lazy: true,
});

const { statusSongs, data: songs } = await useAPI('/songs', {
    query: {
        artist_id: id,
        sort_by: "release_date",
        direction: "desc"
    },
    lazy: true,
});

if (!artist.value?.data) {
    throw createError({
        statusCode: 404,
        message: "Artist Not Found",
    })
}

if (artist.value.data.slug !== slug) {
    // Perbarui URL tanpa reload halaman
    navigateTo({
        path: `/artists/${id}/${artist.value.data.slug}`,
    });
}

// SEO Meta
useSeoMeta({
    title: () =>
        `${artist.value.data.name} - Lyrics & Translations | TransLyrics`,
    keywords: () =>
        `${artist.value.data.name}, Japanese songs, song translations, song lyrics, lyrics translations, English translations, Romaji translations, Indonesian translations, TransLyrics`,
    description: () =>
        `Explore ${artist.value.data.name}'s songs and albums, featuring lyrics with translations to English, Romaji, and Indonesian. Discover the beauty of Japanese music with accurate translations.`,
    ogTitle: () =>
        `${artist.value.data.name} - Lyrics & Translations | TransLyrics`,
    ogDescription: () =>
        `Find detailed information about ${artist.value.data.name}'s songs and albums, including lyrics and translations into English, Romaji, and Indonesian.`,
    ogImage: () =>
        `${backendUrl}${artist.value.data.image}` || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg',
    ogUrl: () =>
        `${baseUrl}/artists/${id}/${slug}`,
    twitterCard:
        'summary_large_image',
    twitterTitle: () =>
        `${artist.value.data.name} - Lyrics & Translations | TransLyrics`,
    twitterDescription: () =>
        `Discover ${artist.value.data.name}'s music, featuring lyrics and translations in multiple languages. Explore now!`,
    twitterImage: () =>
        `${backendUrl}${artist.value.data.image}` || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg',
    canonical: () =>
        `${baseUrl}/artists/${artist.value.data.id}/${artist.value.data.slug}`,
});

</script>

<template>
    <div class="container min-h-[50vh]">

        <!-- Artist Information -->
        <div>
            <ArtistDetailSectionInformationShimmer v-if="statusArtist === 'pending'" />
            <ArtistDetailSectionInformation v-if="artist?.data" :key="artist.data.id" :artist="artist.data" />
        </div>

        <!-- Albums List -->
        <div>
            <ArtistDetailSectionAlbums v-if="albums?.data" :albums="albums.data" />
        </div>

        <!-- Songs List -->
        <div>
            <ArtistDetailSectionSongs v-if="songs?.data" :songs="songs.data" />
        </div>
    </div>
</template>
