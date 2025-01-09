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
            <ErrorComponent type="not-found" :title="$t('error.artistNotFound')"
                :message="$t('error.artistNotFoundMessage')" />
        </div>

        <!-- Success State -->
        <div v-else class="text-dark">
            <SectionArtistInformation v-if="artist" :key="artist.id" :artist="artist" />
            <SectionArtistAlbums v-if="albums.length" :key="artist.id" :albums="albums" />
            <SectionArtistSongs v-if="songs.length" :key="artist.id" :songs="songs" />
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
import SectionArtistInformation from '../components/artistDetail/SectionArtistInformation.vue';
import SectionArtistAlbums from '../components/artistDetail/SectionArtistAlbums.vue';
import SectionArtistSongs from '../components/artistDetail/SectionArtistSongs.vue';
import Footer from '../components/Footer.vue';
import ErrorComponent from '../../shared/ErrorComponent.vue';

const baseUrl = import.meta.env.VITE_BASE_URL;
const artist = ref(null);
const albums = ref([]);
const songs = ref([]);
const loading = ref(true);
const error = ref(null);

const artistId = computed(() => {
    return useRoute().params.id; // Mengambil parameter ID dari URL
});

const fetchData = async () => {
    try {
        loading.value = true;
        error.value = null;

        const artistIdValue = artistId.value;
        const artistPromise = axios.get(`/api/artists?id=${artistIdValue}`);
        const albumsPromise = axios.get(`/api/albums?artist_id=${artistIdValue}`);
        const songsPromise = axios.get(`/api/songs?artist_id=${artistIdValue}&sort_by=release_date`);

        // Menunggu semua API selesai
        const [artistResponse, albumsResponse, songsResponse] = await Promise.all([artistPromise, albumsPromise, songsPromise]);

        // Cek apakah status respons adalah 200
        if (artistResponse.status === 200 && artistResponse.data.success) {
            artist.value = artistResponse.data.data;
        } else {
            error.value = 'errorGetData'; // Gantilah dengan fungsi untuk mendapatkan pesan error
        }

        // Menyimpan data album dan lagu
        if (albumsResponse.status === 200 && albumsResponse.data.success) {
            albums.value = albumsResponse.data.data;
        }

        if (songsResponse.status === 200 && songsResponse.data.success) {
            songs.value = songsResponse.data.data;
        }
    } catch (err) {
        error.value = 'errorGetData'; // Gantilah dengan fungsi untuk mendapatkan pesan error
    } finally {
        loading.value = false;
    }
};

// Watch untuk mengubah head ketika artist berubah
watch(artist, (newArtist) => {
    if (newArtist) {
        useHead({
            title: `${newArtist.name} - TransLyrics`,
            meta: [
                {
                    name: 'description',
                    content: `Find singable song translations from ${newArtist.name}. Discover lyrics in English, Indonesian, and original languages. | Temukan terjemahan lagu ${newArtist.name} yang bisa dinyanyikan. Tersedia dalam Bahasa Indonesia, Inggris, dan bahasa aslinya.`
                },
                {
                    name: 'keywords',
                    content: `${newArtist.name}, song translations, singable translations, Japanese songs, lyrics translation, terjemahan lagu, terjemahan lirik, TransLyrics`
                },
                {
                    property: 'og:title',
                    content: `${newArtist.name} - Song Translations | TransLyrics`
                },
                {
                    property: 'og:description',
                    content: `Discover singable song translations from ${newArtist.name}. Available in multiple languages including English and Indonesian.`
                },
                {
                    property: 'og:image',
                    content: newArtist.image || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
                },
                {
                    property: 'og:url',
                    content: `${baseUrl}/artists/${newArtist.id}/${newArtist.slug}`
                },
                {
                    name: 'twitter:card',
                    content: 'summary_large_image'
                },
                {
                    name: 'twitter:title',
                    content: `${newArtist.name} - Song Translations | TransLyrics`
                }
            ],
            link: [
                {
                    rel: 'canonical',
                    href: `${baseUrl}/artists/${newArtist.id}/${newArtist.slug}`
                }
            ]
        });
    }
}, { immediate: true });

// Mengambil data saat komponen dimuat
onMounted(() => {
    fetchData();
});
</script>
