<script setup>
const config = useRuntimeConfig();
const baseUrl = config.public.baseUrl;

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const { status, data: artists } = await useAPI('/artists', {
    query: {
        sort_by: 'name',
        direction: "asc",
    },
});

const scrollToSection = (letter) => {
    const element = document.getElementById(`section-${letter}`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

const getArtistsBySection = (letter) => {
    if (letter === '#') {
        return artists.value.data.filter(artist => {
            const firstChar = artist.name.charAt(0).toUpperCase();
            return !alphabet.includes(firstChar);
        });
    }

    return artists.value.data.filter(artist =>
        artist.name.charAt(0).toUpperCase() === letter
    ).sort((a, b) => a.name.localeCompare(b.name));
};

useSeoMeta({
    title: () => `Artists - TransLyrics`,
    keywords: () =>
        `all artists, Japanese artists, Japanese songs, song translations, song lyrics, lyrics translations, English translations, Romaji translations, Indonesian translations, TransLyrics`,
    description: () =>
        `Discover all the Japanese artists featured on TransLyrics, along with their songs and lyrics translations in English, Romaji, and Indonesian.`,
    ogTitle: () => `Artists - TransLyrics`,
    ogDescription: () =>
        `Explore all the artists on TransLyrics, featuring their songs and lyrics translations into English, Romaji, and Indonesian.`,
    ogUrl: () => `${baseUrl}/artists`,
    twitterCard: 'summary_large_image',
    twitterTitle: () => `Artists - TransLyrics`,
    twitterDescription: () =>
        `Find all the Japanese artists featured on TransLyrics, with their songs and translations in multiple languages.`,
    canonical: () => `${baseUrl}/artists`,
});

</script>

<template>
    <div class="container py-4 px-4 md:px-6 lg:px-8 xl:px-10">

        <h1 class="text-xl lg:text-2xl font-bold text-dark truncate mb-2">Artist List</h1>

        <!-- Alphabet Navigation -->
        <div class="flex flex-wrap gap-2 py-4 mb-4">
            <button v-for="letter in ['#', ...alphabet]" :key="letter" @click="scrollToSection(letter)"
                class="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-sm md:text-base bg-dark hover:bg-gray-900 text-light rounded ">
                {{ letter }}
            </button>
        </div>

        <!-- Artist List Sections -->
        <div class="space-y-8">
            <!-- Special characters section -->
            <div :id="'section-#'" class="scroll-mt-24">
                <h2 class="text-xl text-dark font-bold mb-1">##</h2>
                <div v-if="getArtistsBySection('#').length" class="space-y-2">
                    <CardsArtistSearch v-for="artist in getArtistsBySection('#')" :key="artist.id"
                        :artist="artist" />
                </div>
                <p v-else class="text-gray-500">No artist available at this time</p>
            </div>

            <!-- Alphabet sections -->
            <div v-for="letter in alphabet" :key="letter" :id="'section-' + letter" class="scroll-mt-24">
                <h2 class="text-xl text-dark font-bold mb-1">#{{ letter }}</h2>
                <div v-if="getArtistsBySection(letter).length" class="space-y-2">
                    <CardsArtistSearch v-for="artist in getArtistsBySection(letter)" :key="artist.id"
                        :artist="artist" />
                </div>
                <p v-else class="text-gray-500">No artist available at this time</p>
            </div>
        </div>
    </div>
</template>
