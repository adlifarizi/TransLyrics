<template>
    <!-- Navbar -->
    <Navbar />

    <div class="container min-h-[50vh]">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
            <div class="animate-spin rounded-full h-8 w-4 md:h-8 md:w-8 lg:h-12 lg:w-12 border-b-2 border-gray"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error">
            <ErrorComponent type="not-found" :title="$t('error.albumNotFound')"
                :message="$t('error.albumNotFoundMessage')" />
        </div>

        <!-- Success State -->
        <div v-else class="text-dark">
            <SectionAlbumInformation v-if="album" :key="album.id" :album="album" />
            <SectionAlbumSong v-if="songs.length" :key="album.id" :songs="songs" />
        </div>
    </div>

    <!-- Footer -->
    <Footer />

</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import { useHead } from '@vueuse/head';
import { useRoute } from 'vue-router';

import Navbar from '../components/Navbar.vue';
import SectionAlbumInformation from '../components/albumDetail/SectionAlbumInformation.vue';
import SectionAlbumSong from '../components/albumDetail/SectionAlbumSong.vue';
import Footer from '../components/Footer.vue';
import ErrorComponent from '../../shared/ErrorComponent.vue';

const baseUrl = import.meta.env.VITE_BASE_URL;
const album = ref(null);
const songs = ref([]);
const loading = ref(true);
const error = ref(null);

const albumId = computed(() => {
    return useRoute().params.id; // Mengambil parameter ID dari URL
});

const fetchData = async () => {
    try {
        loading.value = true;
        error.value = null;

        const albumPromise = axios.get(`/api/albums?id=${albumId.value}`);
        const songsPromise = axios.get(`/api/songs?album_id=${albumId.value}&sort_by=release_date`);

        const [albumResponse, songsResponse] = await Promise.all([albumPromise, songsPromise]);

        if (albumResponse.status === 200 && albumResponse.data.success) {
            album.value = albumResponse.data.data;
        } else {
            error.value = 'Error fetching album data';
        }

        if (songsResponse.status === 200 && songsResponse.data.success) {
            songs.value = songsResponse.data.data;
        }
    } catch (err) {
        error.value = 'Error fetching data';
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchData();
});

watch(album, (newAlbum) => {
    if (newAlbum) {
        useHead({
            title: `${newAlbum.title} by ${newAlbum.artist.name} - TransLyrics`,
            meta: [
                {
                    name: 'description',
                    content: `Explore the singable song translations from the album "${newAlbum.title}" by ${newAlbum.artist.name}. Discover lyrics in English, Indonesian, and original languages. | Jelajahi terjemahan lagu dari album "${newAlbum.title}" oleh ${newAlbum.artist.name} yang bisa dinyanyikan. Tersedia dalam Bahasa Indonesia, Inggris, dan bahasa aslinya.`
                },
                {
                    name: 'keywords',
                    content: `${newAlbum.title}, ${newAlbum.artist.name}, album translations, singable translations, song lyrics, lyrics translation, terjemahan lagu, terjemahan lirik, TransLyrics`
                },
                {
                    property: 'og:title',
                    content: `${newAlbum.title} by ${newAlbum.artist.name} - Album Translations | TransLyrics`
                },
                {
                    property: 'og:description',
                    content: `Discover singable song translations from the album "${newAlbum.title}" by ${newAlbum.artist.name}. Available in multiple languages including English and Indonesian.`
                },
                {
                    property: 'og:image',
                    content: newAlbum.cover || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
                },
                {
                    property: 'og:url',
                    content: `${baseUrl}/albums/${newAlbum.id}/${newAlbum.slug}`
                },
                {
                    name: 'twitter:card',
                    content: 'summary_large_image'
                },
                {
                    name: 'twitter:title',
                    content: `${newAlbum.title} by ${newAlbum.artist.name} - Album Translations | TransLyrics`
                }
            ],
            link: [
                {
                    rel: 'canonical',
                    href: `${baseUrl}/albums/${newAlbum.id}/${newAlbum.slug}`
                }
            ]
        });
    }
}, { immediate: true });
</script>
