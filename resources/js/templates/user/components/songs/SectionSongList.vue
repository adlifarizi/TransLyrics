<template>
    <div class="container py-4 px-4 md:px-6 lg:px-8 xl:px-10">

        <h1 class="text-xl lg:text-2xl font-bold text-dark truncate mb-2">{{ $t('common.songList') }}</h1>

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
                    <SongCardSearch v-for="song in getSongsBySection(letter)" :key="song.id" :song="song" />
                </div>
                <p v-else class="text-gray-500">{{ $t('error.songNotAvailable') }}</p>
            </div>

            <!-- Alphabet sections -->
            <div v-for="letter in alphabet" :key="letter" :id="'section-' + letter" class="scroll-mt-24">
                <h2 class="text-xl text-dark font-bold mb-1">#{{ letter }}</h2>
                <div v-if="getSongsBySection(letter).length" class="space-y-2">
                    <SongCardSearch v-for="song in getSongsBySection(letter)" :key="song.id" :song="song" />
                </div>
                <p v-else class="text-gray-500">{{ $t('error.songNotAvailable') }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import SongCardSearch from '../../../shared/cards/SongCardSearch.vue';

const songs = ref([]);
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const loading = ref(true);
const error = ref(null);

const fetchSongs = async () => {
    try {
        loading.value = true;

        const songsPromise = axios.get(`/api/songs?sort_by=name`);

        const [songsResponse] = await Promise.all([songsPromise]);

        if (songsResponse.status === 200 && songsResponse.data.success) {
            songs.value = songsResponse.data.data;
        } else {
            error.value = 'Error fetching data'; // Atau bisa menggunakan i18n untuk terjemahan
        }
    } catch (err) {
        error.value = 'Error fetching data'; // Atau bisa menggunakan i18n untuk terjemahan
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchSongs();
});

const scrollToSection = (letter) => {
    const element = document.getElementById(`section-${letter}`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

const getSongsBySection = (letter) => {
    if (letter === '#') {
        return songs.value.filter(song => {
            const firstChar = song.title.charAt(0).toUpperCase();
            return !alphabet.includes(firstChar);
        });
    }

    return songs.value.filter(song =>
        song.title.charAt(0).toUpperCase() === letter
    ).sort((a, b) => a.title.localeCompare(b.title));
};
</script>
