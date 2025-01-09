<template>
    <a :href="`/songs/${song.id}/${song.slug}`"
        class="group flex bg-white rounded shadow-sm w-full overflow-hidden cursor-pointer relative">
        <!-- Translyrics Logo -->
        <div v-if="hasTranslyrics" class="absolute top-2 right-2 p-1">
            <img :src="`${baseUrl}/storage/images/translyrics-logo.png`" alt="TransLyrics"
                class="w-4 h-4 object-cover" />
        </div>

        <!-- Cover Image -->
        <img :src="song.image || 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'"
            :alt="song.title" class="w-16 md:h-16 lg:w-20 lg:h-20 object-cover" />

        <!-- Song Info -->
        <div class="flex flex-col px-2 py-1">
            <h3 class="text-sm md:text-base lg:text-lg font-medium text-dark line-clamp-2 group-hover:underline">
                {{ song.title }}
            </h3>
            <p class="text-xs md:text-sm lg:text-base font-normal text-gray-500 line-clamp-1">
                {{ song.artist.name }}
            </p>
        </div>
    </a>
</template>

<script setup>
import { computed } from 'vue';

// Define props
const props = defineProps({
    song: {
        type: Object,
        required: true,
        validator: (obj) => obj.title && typeof obj.title === 'string',
    },
});

// Define `baseUrl` as a reactive property
const baseUrl = import.meta.env.VITE_BASE_URL;

// Computed property to check if the song has translyrics
const hasTranslyrics = computed(() => {
    // Make sure song exists before accessing its properties
    return (
        props.song?.lyrics &&
        props.song.lyrics.some((lyric) => lyric.type === 'translyrics')
    );
});
</script>
