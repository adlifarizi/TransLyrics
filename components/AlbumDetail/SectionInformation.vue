<script setup>
const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl;

const props = defineProps({
    album: {
        type: Object,
        required: true,
        validator(album) {
            return album &&
                typeof album.title === 'string' &&
                typeof album.id !== 'undefined' &&
                typeof album.slug !== 'undefined';
        }
    },
});
</script>

<template>
    <section class="w-screen py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
        <!-- Album Image and Info Container -->
        <div class="flex flex-col md:flex-row items-start gap-4">
            <!-- Album Image -->
            <div class="flex-shrink-0 self-center">
                <img :src="`${backendUrl}${album.image}` || 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'"
                    :alt="album.title" class="w-48 h-48 rounded object-cover" />
            </div>

            <!-- Album Info -->
            <div class="flex flex-col flex-1 w-full">
                <!-- Album Title -->
                <h1 class="text-xl lg:text-2xl font-bold text-dark line-clamp-2 mb-1">{{ album.title }}</h1>

                <!-- Stats -->
                <div class="space-y-1">
                    <div v-if="album.original_title" class="flex justify-between w-full">
                        <span class="text-dark w-48 xl:w-40">Original Title</span>
                        <span class="text-dark w-5/6">: {{ album.original_title }}</span>
                    </div>
                    <div v-if="album.romanized_title" class="flex justify-between w-full">
                        <span class="text-dark w-48 xl:w-40">Romanized Title</span>
                        <span class="text-dark w-5/6">: {{ album.romanized_title }}</span>
                    </div>
                    <div v-if="album.artist.name" class="flex justify-between w-full">
                        <span class="text-dark w-48 xl:w-40">Artist</span>
                        <NuxtLink :to="`/artists/${album.artist.id}/${album.artist.slug}`"
                            class="text-blue-600 w-5/6 hover:underline">: {{ album.artist.name }}
                        </NuxtLink>
                    </div>
                    <div v-if="album.release_date" class="flex justify-between w-full">
                        <span class="text-dark w-48 xl:w-40">Released</span>
                        <span class="text-dark w-5/6">: {{ album.release_date.slice(0,4) }}</span>
                    </div>
                    <div class="flex justify-between w-full">
                        <span class="text-dark w-48 xl:w-40">Songs</span>
                        <span class="text-dark w-5/6">: {{ album.songs.length }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
