<template>
    <!-- Navbar -->
    <Navbar />

    <div class="container min-h-[50vh]">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
            <div class="animate-spin rounded-full h-8 w-4 md:h-8 md:w-8 lg:h-12 lg:w-12 border-b-2 border-gray-500">
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error">
            <ErrorComponent type="not-found" :title="$t('error.songNotFound')"
                :message="$t('error.songNotFoundMessage')" />
        </div>

        <!-- Success State -->
        <div v-else class="text-dark">
            <SectionSongInformation v-if="song" :key="song.id" :song="song" />

            <div class="flex flex-col lg:flex-row">
                <SectionSongLyrics v-if="song" :key="song.id" :song="song" />
                <SectionSongListen v-if="song" :key="song.id" :song="song" />
            </div>
        </div>
    </div>

    <!-- Footer -->
    <Footer />

</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useHead } from '@vueuse/head';

import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import SectionSongInformation from '../components/songDetail/SectionSongInformation.vue';
import SectionSongLyrics from '../components/songDetail/SectionSongLyrics.vue';
import SectionSongListen from '../components/songDetail/SectionSongListen.vue';
import ErrorComponent from '../../shared/ErrorComponent.vue';

const baseUrl = import.meta.env.VITE_BASE_URL;
const song = ref(null);
const loading = ref(true);
const error = ref(null);

const songId = computed(() => {
    return useRoute().params.id; // Mengambil parameter ID dari URL
});

const fetchData = async () => {
    try {
        loading.value = true;
        error.value = null;

        const songPromise = axios.get(`/api/songs?id=${songId.value}`);
        const [songResponse] = await Promise.all([songPromise]);

        if (songResponse.status === 200 && songResponse.data.success) {
            song.value = songResponse.data.data;
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
    fetchData();
});

watch(song, (newSong) => {
    if (newSong) {
        useHead({
            title: `${newSong.title} by ${newSong.artist.name} - TransLyrics`,
            meta: [
                {
                    name: 'description',
                    content: `Discover the singable translation of "${newSong.title}" by ${newSong.artist.name}. Available in English, Indonesian, and original languages. | Temukan terjemahan lagu "${newSong.title}" oleh ${newSong.artist.name} yang bisa dinyanyikan. Tersedia dalam Bahasa Indonesia, Inggris, dan bahasa aslinya.`,
                },
                {
                    name: 'keywords',
                    content: `${newSong.title}, ${newSong.artist.name}, song translations, singable translations, lyrics translation, terjemahan lagu, terjemahan lirik, TransLyrics`,
                },
                {
                    property: 'og:title',
                    content: `${newSong.title} by ${newSong.artist.name} - Song Translations | TransLyrics`,
                },
                {
                    property: 'og:description',
                    content: `Explore the singable translation of "${newSong.title}" by ${newSong.artist.name}. Available in multiple languages including English and Indonesian.`,
                },
                {
                    property: 'og:image',
                    content: newSong.cover || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg',
                },
                {
                    property: 'og:url',
                    content: `${baseUrl}/songs/${newSong.id}/${newSong.slug}`,
                },
                {
                    name: 'twitter:card',
                    content: 'summary_large_image',
                },
                {
                    name: 'twitter:title',
                    content: `${newSong.title} by ${newSong.artist.name} - Song Translations | TransLyrics`,
                },
            ],
            link: [
                {
                    rel: 'canonical',
                    href: `${baseUrl}/songs/${newSong.id}/${newSong.slug}`,
                },
            ],
        });
    }
}, { immediate: true });
</script>
