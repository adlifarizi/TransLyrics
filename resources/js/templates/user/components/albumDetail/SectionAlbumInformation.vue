<template>
    <section class="w-screen py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
        <!-- Album Image and Info Container -->
        <div class="flex flex-col md:flex-row items-start gap-4">
            <!-- Album Image -->
            <div class="flex-shrink-0 self-center">
                <img :src="album.image ? `${album.image}` : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'"
                    :alt="album.title" class="w-48 h-48 rounded object-cover" />
            </div>

            <!-- Album Info -->
            <div class="flex flex-col flex-1 w-full">
                <!-- Album Title -->
                <h1 class="text-xl lg:text-2xl font-bold text-dark line-clamp-2 mb-1">{{ album.title }}</h1>

                <!-- Stats -->
                <div class="space-y-1">
                    <div v-if="album.original_title" class="flex justify-between w-full">
                        <span class="text-dark w-48 xl:w-40">{{ $t('common.originalTitle') }}</span>
                        <span class="text-dark w-5/6">: {{ album.original_title }}</span>
                    </div>
                    <div v-if="album.alternate_title" class="flex justify-between w-full">
                        <span class="text-dark w-48 xl:w-40">{{ $t('common.alternateTitle') }}</span>
                        <span class="text-dark w-5/6">: {{ album.alternate_title }}</span>
                    </div>
                    <div v-if="album.artist.name" class="flex justify-between w-full">
                        <span class="text-dark w-48 xl:w-40">{{ $t('common.artist') }}</span>
                        <a :href="`/artists/${album.artist.id}/${album.artist.slug}`"
                            class="text-blue-600 w-5/6 hover:underline">: {{ album.artist.name }}</a>
                    </div>
                    <div v-if="album.release_year" class="flex justify-between w-full">
                        <span class="text-dark w-48 xl:w-40">{{ $t('common.released') }}</span>
                        <span class="text-dark w-5/6">: {{ album.release_year }}</span>
                    </div>
                    <div class="flex justify-between w-full">
                        <span class="text-dark w-48 xl:w-40">{{ $t('common.songs') }}</span>
                        <span class="text-dark w-5/6">: {{ album.songs.length }}</span>
                    </div>
                    <div class="flex justify-between w-full">
                        <span class="text-dark w-48 xl:w-40">{{ $t('common.availableTranslyrics') }}</span>
                        <span class="text-dark w-5/6">: {{ album.translyrics_count }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    album: {
        type: Object,
        required: true,
        validator: (obj) => obj.title && typeof obj.title === 'string',
    },
});
</script>
