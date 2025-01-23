<script setup>
const route = useRoute();
const id = route.params.id;
const slug = route.params.slug;
const config = useRuntimeConfig();
const baseUrl = config.public.baseUrl;
const backendUrl = config.public.backendUrl;

const { statusAlbum, data: album } = await useAPI('/albums', {
    query: {
        id: id,
    },
});

const { statusSongs, data: songs } = await useAPI('/songs', {
    query: {
        album_id: id,
        sort_by: "album_order",
        direction: "asc"
    },
    lazy: true,
});

if (!album.value?.data) {
    throw createError({
        statusCode: 404,
        message: "Album Not Found",
    })
}

if (album.value.data.slug !== slug) {
    // Perbarui URL tanpa reload halaman
    navigateTo({
        path: `/albums/${id}/${album.value.data.slug}`,
    });
}

// SEO Meta
useSeoMeta({
    title: () =>
        `${album.value.data.title} by ${album.value.data.artist.name} - Lyrics & Translations | TransLyrics`,
    keywords: () =>
        `${album.value.data.title}, ${album.value.data.original_title}, ${album.value.data.artist.name}, Japanese albums, song translations, album lyrics, lyrics translations, English translations, Romaji translations, Indonesian translations, TransLyrics`,
    description: () =>
        `Explore the album "${album.value.data.title}" by ${album.value.data.artist.name}, featuring lyrics with translations to English, Romaji, and Indonesian. Discover the beauty of Japanese music with accurate translations.`,
    ogTitle: () =>
        `${album.value.data.title} by ${album.value.data.artist.name} - Lyrics & Translations | TransLyrics`,
    ogDescription: () =>
        `Find information about the album "${album.value.data.title}" by ${album.value.data.artist.name}, including lyrics and translations into English, Romaji, and Indonesian.`,
    ogImage: () =>
        `${backendUrl}${album.value.data.image}` || 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
    ogUrl: () =>
        `${baseUrl}/albums/${album.value.data.id}/${album.value.data.slug}`,
    twitterCard:
        'summary_large_image',
    twitterTitle: () =>
        `${album.value.data.title} by ${album.value.data.artist.name} - Lyrics & Translations | TransLyrics`,
    twitterDescription: () =>
        `Discover the album "${album.value.data.title}" by ${album.value.data.artist.name}, featuring lyrics and translations in multiple languages. Explore now!`,
    twitterImage: () =>
        `${backendUrl}${album.value.data.image}` || 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg',
    canonical: () => `${baseUrl}/albums/${album.value.data.id}/${album.value.data.slug}`,
});

</script>

<template>
    <div class="container min-h-[50vh]">

        <!-- Album Information -->
        <div>
            <AlbumDetailSectionInformationShimmer v-if="statusAlbum === 'pending'" />
            <AlbumDetailSectionInformation v-if="album?.data" :key="album.data.id" :album="album.data" />
        </div>

        <!-- Songs List -->
        <div>
            <AlbumDetailSectionSongs v-if="songs?.data" :songs="songs.data" />
        </div>

    </div>
</template>
