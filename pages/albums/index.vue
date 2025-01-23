<script setup>
const config = useRuntimeConfig();
const baseUrl = config.public.baseUrl;

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const { status, data: albums } = await useAPI('/albums', {
    query: {
        sort_by: 'title',
        direction: "asc"
    },
});

const scrollToSection = (letter) => {
    const element = document.getElementById(`section-${letter}`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

const getAlbumsBySection = (letter) => {
    if (letter === '#') {
        return albums.value.data.filter(album => {
            const firstChar = album.title.charAt(0).toUpperCase();
            return !alphabet.includes(firstChar);
        });
    }

    return albums.value.data.filter(album => album.title.charAt(0).toUpperCase() === letter)
        .sort((a, b) => a.title.localeCompare(b.title));
};

useSeoMeta({
    title: () => `Albums - TransLyrics`,
    keywords: () =>
        `all albums, Japanese albums, album translations, song lyrics, lyrics translations, English translations, Romaji translations, Indonesian translations, TransLyrics`,
    description: () =>
        `Browse all the albums featured on TransLyrics, with lyrics translations in English, Romaji, and Indonesian.`,
    ogTitle: () => `Albums - TransLyrics`,
    ogDescription: () =>
        `Explore all the albums from various artists on TransLyrics, featuring songs with translations to English, Romaji, and Indonesian.`,
    ogUrl: () => `${baseUrl}/albums`,
    twitterCard: 'summary_large_image',
    twitterTitle: () => `Albums - TransLyrics`,
    twitterDescription: () =>
        `Discover all the albums on TransLyrics, with lyrics and translations in multiple languages.`,
    canonical: () => `${baseUrl}/albums`,
});

</script>


<template>
    <div class="container py-4 px-4 md:px-6 lg:px-8 xl:px-10">

        <h1 class="text-xl lg:text-2xl font-bold text-dark truncate mb-2">Album List</h1>

        <!-- Alphabet Navigation -->
        <div class="flex flex-wrap gap-2 py-4 mb-4">
            <button v-for="letter in ['#', ...alphabet]" :key="letter" @click="scrollToSection(letter)"
                class="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-sm md:text-base bg-dark hover:bg-gray-900 text-light rounded ">
                {{ letter }}
            </button>
        </div>

        <!-- Album List Sections -->
        <div class="space-y-8">
            <!-- Special characters section -->
            <div :id="'section-#'" class="scroll-mt-24">
                <h2 class="text-xl text-dark font-bold mb-1">##</h2>
                <div v-if="getAlbumsBySection('#').length" class="space-y-2">
                    <CardsAlbumSearch v-for="album in getAlbumsBySection('#')" :key="album.id" :album="album" />
                </div>
                <p v-else class="text-gray-500">No album available at this time</p>
            </div>

            <!-- Alphabet sections -->
            <div v-for="letter in alphabet" :key="letter" :id="'section-' + letter" class="scroll-mt-24">
                <h2 class="text-xl text-dark font-bold mb-1">#{{ letter }}</h2>
                <div v-if="getAlbumsBySection(letter).length" class="space-y-2">
                    <CardsAlbumSearch v-for="album in getAlbumsBySection(letter)" :key="album.id" :album="album" />
                </div>
                <p v-else class="text-gray-500">No album available at this time</p>
            </div>
        </div>
    </div>
</template>