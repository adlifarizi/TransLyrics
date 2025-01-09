<template>
    <section
        class="grid grid-cols-1 gap-0 md:gap-1 lg:gap-2 xl:gap-3 w-full py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
        <!-- Artist Image and Info Container -->
        <div class="flex items-start gap-4">
            <!-- Artist Image -->
            <div class="flex-shrink-0">
                <img :src="artist.image ? `${artist.image}` : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'"
                    :alt="artist.name" class="w-36 md:h-36 lg:w-48 lg:h-48 rounded object-cover" />
            </div>

            <!-- Artist Info -->
            <div class="flex flex-col flex-1">
                <!-- Artist Name -->
                <h1 class="text-xl lg:text-2xl font-bold text-dark line-clamp-2 mb-1">{{ artist.name }}</h1>

                <!-- Stats -->
                <div class="space-y-1 mb-4 w-fit">
                    <div class="grid grid-cols-2 gap-4">
                        <span class=" text-dark">{{ $t('common.albums') }}</span>
                        <span class="text-dark">: {{ artist.albums.length }}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <span class=" text-dark">{{ $t('common.songs') }}</span>
                        <span class="text-dark">: {{ artist.songs.length }}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <span class=" text-dark">{{ $t('common.debut') }}</span>
                        <span class="text-dark">: {{ artist.debut_year ? artist.debut_year : "-" }}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <span class=" text-dark">{{ $t('common.availableTranslyrics') }}</span>
                        <span class="text-dark">: {{ artist.translyrics_count }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Social Media Links -->
        <div class="flex space-x-2 text-center">
            <a :href="`${artist.social_x}`" target="_blank" v-if="artist.social_x"
                class="p-1 bg-light shadow-sm w-8 h-8 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
                <i class="fa-brands fa-x-twitter text-sm text-dark"></i>
            </a>
            <a :href="`${artist.social_instagram}`" target="_blank" v-if="artist.social_instagram"
                class="p-1 bg-light shadow-sm w-8 h-8 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
                <i class='bx bxl-instagram-alt text-base text-dark'></i>
            </a>
            <a :href="`${artist.social_youtube}`" target="_blank" v-if="artist.social_youtube"
                class="p-1 bg-light shadow-sm w-8 h-8 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
                <i class='bx bxl-youtube text-base text-dark'></i>
            </a>
            <a :href="`${artist.social_spotify}`" target="_blank" v-if="artist.social_spotify"
                class="p-1 bg-light shadow-sm w-8 h-8 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
                <i class='bx bxl-spotify text-base text-dark'></i>
            </a>
        </div>
    </section>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    artist: {
        type: Object,
        required: true,
        validator: (obj) => obj.name && typeof obj.name === 'string',
    },
});
</script>
