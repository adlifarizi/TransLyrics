<template>
    <section class="relative w-full py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">

        <h2 class="text-lg md:text-xl lg:text-2xl font-bold text-dark truncate mb-2">{{ $t('home.newlyAdded') }}</h2>

        <div class="container">
            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
                <div class="animate-spin rounded-full h-8 w-4 md:h-8 md:w-8 lg:h-12 lg:w-12 border-b-2 border-gray-500">
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="text-center text-xs md:text-sm lg:text-base text-red-600 p-4">
                {{ error }}
            </div>

            <!-- No Songs Found -->
            <div v-else-if="!loading && songs.length === 0"
                class="text-center text-xs md:text-sm lg:text-base text-gray-500 p-4">
                {{ $t('error.songNotFound') }}
            </div>

            <!-- Success State -->
            <div v-else class="grid grid-cols-1 gap-x-4 gap-y-2">
                <SongCard v-for="song in songs" :key="song.id" :song="song" class="w-full" />
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SongCard from '../../../shared/cards/SongCard.vue';

const songs = ref([]); // Data lagu
const loading = ref(true); // Status loading
const error = ref(null); // Pesan error

const fetchNewlyAdded = async () => {
    try {
        loading.value = true;
        error.value = null;

        const response = await axios.get('/api/songs?sort_by=newest');
        // Pastikan respons valid
        if (response.status === 200 && response.data.success && Array.isArray(response.data.data)) {
            songs.value = response.data.data.slice(0, 5); // Isi data lagu
        } else {
            error.value = 'Error fetching data'; // Tampilkan pesan error
        }
    } catch (err) {
        error.value = 'Error fetching data'; // Tangani error
    } finally {
        loading.value = false; // Matikan status loading
    }
};

onMounted(() => {
    fetchNewlyAdded(); // Ambil data lagu saat komponen di-mount
});
</script>
