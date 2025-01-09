<template>
    <section class="relative items-start gap-6 w-3/4 py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
        <h2 class="text-lg md:text-xl lg:text-2xl font-medium text-dark truncate mb-2">
            {{ $t('common.listenIn') }}
        </h2>

        <div v-if="!hasValidLinks" class="flex items-center gap-2">
            <div class="bg-red-200 w-fit p-2 rounded-full">
                <svg class="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>
            <p class="text-base lg:text-lg font-normal text-dark truncate">
                {{ $t('error.musicPlatformNotFound') }}
            </p>
        </div>



        <!-- Embed YouTube Video -->
        <div v-if="song.youtube_embed" class="w-full aspect-video mt-4">
            <iframe :src="song.youtube_embed" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen class="w-full h-full">
            </iframe>
        </div>

        <div class="flex flex-row gap-2 mt-4">
            <div v-if="song.link_youtube_music" class="bg-light py-2 px-4 rounded flex items-center w-fit">
                <a :href="`${song.link_youtube_music}`" target="_blank">
                    <img :src="`${baseUrl}/storage/images/youtube_music_badge.png`" class="w-24 rounded object-cover" />
                </a>
            </div>

            <div v-if="song.link_spotify" class="bg-light py-2 px-4 rounded flex items-center w-fit">
                <a :href="`${song.link_spotify}`" target="_blank">
                    <img :src="`${baseUrl}/storage/images/spotify_badge.png`"
                        class="w-24 h-auto rounded object-cover" />
                </a>
            </div>

            <div v-if="song.link_apple_music" class="bg-light py-2 px-4 rounded flex items-center w-fit">
                <a :href="`${song.link_apple_music}`" target="_blank">
                    <img :src="`${baseUrl}/storage/images/apple_music_badge.png`"
                        class="w-24 h-auto rounded object-cover" />
                </a>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    song: {
        type: Object,
        required: true,
        validator: (obj) => obj.title && typeof obj.title === 'string',
    },
});

const baseUrl = import.meta.env.VITE_BASE_URL;

const hasValidLinks = computed(() => {
    return (
        props.song.youtube_embed ||
        props.song.link_youtube_music ||
        props.song.link_spotify ||
        props.song.link_apple_music
    );
});
</script>
