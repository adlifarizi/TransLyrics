<script setup>
const config = useRuntimeConfig();
const baseUrl = config.public.baseUrl;

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const { status, data: songs } = await useAPI('/songs', {
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

const getSongsBySection = (letter) => {
    if (letter === '#') {
        return songs.value.data.filter(song => {
            const firstChar = song.title.charAt(0).toUpperCase();
            return !alphabet.includes(firstChar);
        });
    }

    return songs.value.data.filter(song =>
        song.title.charAt(0).toUpperCase() === letter
    ).sort((a, b) => a.title.localeCompare(b.title));
};

useSeoMeta({
    title: () => `Songs - TransLyrics`,
    keywords: () =>
        `all songs, Japanese songs, song translations, song lyrics, lyrics translations, English translations, Romaji translations, Indonesian translations, TransLyrics`,
    description: () =>
        `Explore all the songs featured on TransLyrics, with lyrics translations in English, Romaji, and Indonesian.`,
    ogTitle: () => `Songs - TransLyrics`,
    ogDescription: () =>
        `Find all the songs from various artists on TransLyrics, including lyrics and translations into English, Romaji, and Indonesian.`,
    ogUrl: () => `${baseUrl}/songs`,
    twitterCard: 'summary_large_image',
    twitterTitle: () => `Songs - TransLyrics`,
    twitterDescription: () =>
        `Discover all the songs on TransLyrics, with lyrics and translations in multiple languages.`,
    canonical: () => `${baseUrl}/songs`,
});

</script>


<template>
    <div class="container py-4 px-4 md:px-6 lg:px-8 xl:px-10">

        <h1 class="text-xl lg:text-2xl font-bold text-dark truncate mb-2">Song List</h1>

        <!-- Alphabet Navigation -->
        <div class="flex flex-wrap gap-2 py-4 mb-4">
            <button v-for="letter in ['#', ...alphabet]" :key="letter" @click="scrollToSection(letter)"
                class="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-sm md:text-base bg-dark hover:bg-gray-900 text-light rounded ">
                {{ letter }}
            </button>
        </div>

        <!-- Song List Sections -->
        <div class="space-y-8">
            <!-- Special characters section -->
            <div :id="'section-#'" class="scroll-mt-24">
                <h2 class="text-xl text-dark font-bold mb-1">##</h2>
                <div v-if="getSongsBySection('#').length" class="space-y-2">
                    <CardsSongSearch v-for="song in getSongsBySection('#')" :key="song.id" :song="song" />
                </div>
                <p v-else class="text-gray-500">No song available at this time</p>
            </div>

            <!-- Alphabet sections -->
            <div v-for="letter in alphabet" :key="letter" :id="'section-' + letter" class="scroll-mt-24">
                <h2 class="text-xl text-dark font-bold mb-1">#{{ letter }}</h2>
                <div v-if="getSongsBySection(letter).length" class="space-y-2">
                    <CardsSongSearch v-for="song in getSongsBySection(letter)" :key="song.id" :song="song" />
                </div>
                <p v-else class="text-gray-500">No song available at this time</p>
            </div>
        </div>
    </div>
</template>