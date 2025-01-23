<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// Reactive state variables
const query = ref('');
const artists = ref([]);
const albums = ref([]);
const songs = ref([]);
const fetchStatus = ref('');

// Use the route to access query parameters
const route = useRoute();

// Fetch initial data using useAPI
const { status, data: results } = await useAPI('/search', {
    query: {
        query: query.value,
    },
});

fetchStatus.value = status.value;

artists.value = results?.value?.data?.artists;
albums.value = results?.value?.data?.albums;
songs.value = results?.value?.data?.songs;

// Watch for query changes in the route
watch(
    () => route.query.q,
    async (newQuery) => {
        query.value = newQuery || ''; // Handle null/undefined case
        if (query.value) {
            fetchStatus.value = 'pending';
            try {
                const results = await $fetch('/search', {
                    baseURL: useRuntimeConfig().public.backendApiUrl,
                    params: {
                        query: query.value,
                    },
                });
                artists.value = results?.data?.artists || [];
                albums.value = results?.data?.albums || [];
                songs.value = results?.data?.songs || [];
                fetchStatus.value = 'success';
            } catch (error) {
                console.error(error);
                fetchStatus.value = 'error';
            }
        } else {
            // Reset state when no query
            artists.value = [];
            albums.value = [];
            songs.value = [];
            fetchStatus.value = '';
        }
    },
    { immediate: true } // Trigger immediately on component initialization
);
</script>


<template>
    <div class="container py-4 px-4 md:px-6 lg:px-8 xl:px-10 w-full min-h-[50vh]">

        <h1 v-if="query" class="text-xl lg:text-2xl font-bold text-dark truncate mb-2">
            Search result for: {{ query }}
        </h1>

        <div v-if="!query"
            class="flex justify-center items-center gap-2 h-[30svh]">
            <div class="bg-blue-200 w-fit p-2 rounded-full">
                <svg class="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>
            <p class="text-base lg:text-lg font-normal text-dark truncate">
                Search songs, albums, or artists
            </p>
        </div>

        <!-- Search Result -->
        <div v-if="fetchStatus === 'pending'">
            <div class="animate-spin rounded-full h-8 w-4 md:h-8 md:w-8 lg:h-12 lg:w-12 border-b-2 border-gray-500">
            </div>
        </div>

        <div v-else class="space-y-8">

            <!-- Nothing Found -->
            <div v-if="query && !artists.length && !albums.length && !songs.length"
                class="flex justify-center items-center gap-2 h-[30svh]">
                <div class="bg-red-200 w-fit p-2 rounded-full">
                    <svg class="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <p class="text-base lg:text-lg font-normal text-dark truncate">
                    Sorry, we couldn't find what you were looking for
                </p>
            </div>

            <!-- Artist Section -->
            <div v-if="artists.length" class="mb-6">
                <h2 class="text-xl md:text-2xl text-dark font-bold mb-1">Artists</h2>
                <div class="space-y-2">
                    <CardsArtistSearch v-for="artist in artists" :key="artist.id" :artist="artist" />
                </div>
            </div>

            <!-- Albums Section -->
            <div v-if="albums.length" class="mb-6">
                <h2 class="text-xl md:text-2xl  text-dark font-bold mb-1">Albums</h2>
                <div class="space-y-2">
                    <CardsAlbumSearch v-for="album in albums" :key="album.id" :album="album" />
                </div>
            </div>

            <!-- Songs Section -->
            <div v-if="songs.length" class="mb-6">
                <h2 class="text-xl md:text-2xl  text-dark font-bold mb-1">Songs</h2>
                <div class="space-y-2">
                    <CardsSongSearch v-for="song in songs" :key="song.id" :song="song" />
                </div>
            </div>
        </div>
    </div>
</template>
