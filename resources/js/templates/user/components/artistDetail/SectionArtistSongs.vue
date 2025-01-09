<template>
    <section class="relative items-start gap-6 w-full py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">

        <h2 class="text-lg md:text-xl lg:text-2xl font-bold text-dark truncate mb-2">{{ $t('common.songs') }}</h2>

        <!-- Song Card -->
        <div v-if="songs && songs.length > 0" class="grid grid-cols-1 gap-x-4 gap-y-2">
            <!-- Loop untuk menampilkan SongCard jika songs ada dan tidak kosong -->
            <SongCard v-for="song in songs" :key="song.id" :song="song" class="w-full" />
        </div>

        <!-- Menampilkan pesan jika tidak ada album -->
        <div v-else class="text-center text-xs md:text-sm lg:text-base text-gray-500 p-4">
            {{ $t('error.songNotFound') }}
        </div>
    </section>
</template>

<script setup>
import { defineProps } from 'vue';
import SongCard from '../../../shared/cards/SongCard.vue';

const props = defineProps({
    songs: {
        type: Array,
        required: true,
        validator: (arr) => arr.every(song => song.title && typeof song.title === 'string'),
    },
});
</script>
