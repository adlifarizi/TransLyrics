<template>
    <section class="relative w-full py-2 bg-transparent
    px-4 md:px-6 lg:px-8 xl:px-10">

        <div class="flex justify-between items-center mt-2 mb-1">
            <h2 class="text-xl lg:text-2xl font-bold text-dark truncate">{{ $t('home.featuredArtists') }}
            </h2>
            <a href="/artists" class="text-sm md:text-base text-blue-500 hover:underline">{{
                $t('home.seeAll') }}</a>
        </div>


        <div class="container">
            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
                <div class="animate-spin rounded-full h-8 w-4 md:h-8 md:w-8 lg:h-12 lg:w-12 border-b-2 border-gray-500">
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="text-center text-xs md:text-sm lg:text-base text-red-600  p-4">
                {{ error }}
            </div>

            <!-- No Artists Found -->
            <div v-else-if="!loading && artists.length === 0"
                class="text-center text-xs md:text-sm lg:text-base text-gray-500 p-4">
                {{ $t('error.artistNotFound') }}
            </div>

            <!-- Success State -->
            <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-x-2 md:gap-x-6 gap-y-0">
                <ArtistCard v-for="artist in artists" :key="artist.id" :artist="artist" class="w-full" />
            </div>
        </div>
    </section>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ArtistCard from '../../../shared/cards/ArtistCard.vue';

// Reactive state variables
const artists = ref([]);
const loading = ref(true);
const error = ref(null);

// Method to fetch featured artists
const fetchFeaturedArtists = async () => {
    try {
        loading.value = true;
        error.value = null;

        const response = await axios.get('/api/artists?sort_by=views');

        // Check if the response is successful and contains valid data
        if (response.status === 200 && response.data.success && Array.isArray(response.data.data)) {
            artists.value = response.data.data.slice(0, 4);
        } else {
            error.value = 'Error fetching data'; // You can replace this with a translation key if needed
        }
    } catch (err) {
        error.value = 'Error fetching data'; // You can replace this with a translation key if needed
    } finally {
        loading.value = false;
    }
};

// Mounted lifecycle hook
onMounted(() => {
    fetchFeaturedArtists();
});
</script>
