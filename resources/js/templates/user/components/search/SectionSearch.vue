<template>
    <div class="container py-4 px-4 md:px-6 lg:px-8 xl:px-10 w-full min-h-[50vh]">

        <h1 class="text-xl lg:text-2xl font-bold text-dark truncate mb-2">{{ $t('common.searchResult') }} {{
            query }}</h1>

        <!-- Search Result -->
        <div class="space-y-8">
            <!-- Nothing Found -->
            <div v-if="!artists.length && !albums.length && !songs.length"
                class="flex justify-center items-center gap-2 h-[30svh]">
                <div class="bg-red-200 w-fit p-2 rounded-full">
                    <svg class="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <p class="text-base lg:text-lg font-normal text-dark truncate">
                    {{ $t('error.searchResultNotFound') }}
                </p>
            </div>

            <!-- Artist Section -->
            <div v-if="artists.length" class="mb-4">
                <h2 class="text-xl md:text-2xl text-dark font-bold mb-1">{{ $t('common.artists') }}</h2>
                <div class="space-y-2">
                    <ArtistCardSearch v-for="artist in artists" :key="artist.id" :artist="artist" />
                </div>
            </div>

            <!-- Albums Section -->
            <div v-if="albums.length" class="mb-4">
                <h2 class="text-xl md:text-2xl  text-dark font-bold mb-1">{{ $t('common.albums') }}</h2>
                <div class="space-y-2">
                    <AlbumCardSearch v-for="album in albums" :key="album.id" :album="album" />
                </div>
            </div>

            <!-- Songs Section -->
            <div v-if="songs.length" class="mb-4">
                <h2 class="text-xl md:text-2xl  text-dark font-bold mb-1">{{ $t('common.songs') }}</h2>
                <div class="space-y-2">
                    <SongCardSearch v-for="song in songs" :key="song.id" :song="song" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import ArtistCardSearch from '../../../shared/cards/ArtistCardSearch.vue';
import AlbumCardSearch from '../../../shared/cards/AlbumCardSearch.vue';
import SongCardSearch from '../../../shared/cards/SongCardSearch.vue';

// Reactive state variables
const query = ref('');
const artists = ref([]);
const albums = ref([]);
const songs = ref([]);
const loading = ref(true);
const error = ref(null);

// Use the route to access query parameters
const route = useRoute();

// Methods
const performSearch = async () => {
    try {
        loading.value = true;

        const searchPromise = await axios.get(`/api/search?query=${query.value}`);

        // Menunggu semua API selesai
        const [searchResponse] = await Promise.all([searchPromise]);

        // Cek apakah status respons adalah 200
        if (searchResponse.status === 200 && searchResponse.data.success) {
            artists.value = searchResponse.data.data.artists;
            albums.value = searchResponse.data.data.albums;
            songs.value = searchResponse.data.data.songs;
        } else {
            error.value = 'Error fetching data'; // Replace with translation if necessary
        }
    } catch (err) {
        error.value = 'Error fetching data'; // Replace with translation if necessary
    } finally {
        loading.value = false;
    }
};

// Watch for query changes in the route
watch(() => route.query.q, (newQuery) => {
    query.value = newQuery;
    if (query.value !== '') {
        performSearch();
    }
});

// Mounted lifecycle hook
onMounted(() => {
    query.value = route.query.q;
    if (query.value !== '') {
        performSearch();
    }
});
</script>
