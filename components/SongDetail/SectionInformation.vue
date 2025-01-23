<script setup>
const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl;

const props = defineProps({
    song: {
        type: Object,
        required: true,
        validator(song) {
            return song &&
                typeof song.title === 'string' &&
                typeof song.id !== 'undefined' &&
                typeof song.slug !== 'undefined';
        }
    },
});
</script>

<template>
    <section class="w-full py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
        <!-- Song Image and Info Container -->
        <div class="flex flex-col md:flex-row items-start gap-4 w-full">
            <!-- Album Image -->
            <div class="flex-shrink-0 self-center">
                <img :src="`${backendUrl}${song.image}` || 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'"
                    :alt="song.title" class="w-48 h-48 rounded object-cover" />
            </div>

            <!-- Song Info -->
            <div class="flex flex-col flex-1 w-full">
                <!-- Song Title -->
                <h1 class="text-xl lg:text-2xl font-bold text-dark line-clamp-2 mb-1">{{ song.title }}</h1>

                <!-- Stats -->
                <div class="grid grid-cols-1 md:grid-cols-2">
                    <!-- Info 1 -->
                    <div class="space-y-1">
                        <div v-if="song.original_title" class="flex justify-between w-full">
                            <span class="text-dark w-40 md:w-48 xl:w-40">Original Title</span>
                            <span class="text-dark w-5/6">: {{ song.original_title }}</span>
                        </div>
                        <div v-if="song.romanized_title" class="flex justify-between w-full">
                            <span class="text-dark w-40 md:w-48 xl:w-40">Romanized Title</span>
                            <span class="text-dark w-5/6">: {{ song.romanized_title }}</span>
                        </div>
                        <div v-if="song.artist" class="flex justify-between w-full">
                            <span class="text-dark w-40 md:w-48 xl:w-40">Artist</span>
                            <NuxtLink :to="`/artists/${song.artist.id}/${song.artist.slug}`"
                                class="text-blue-600 w-5/6 hover:underline">: {{ song.artist.name }}
                            </NuxtLink>
                        </div>
                        <div v-if="song.release_date" class="flex justify-between w-full">
                            <span class="text-dark w-40 md:w-48 xl:w-40">Release</span>
                            <span class="text-dark w-5/6">: {{ song.release_date.slice(0, 10) }}</span>
                        </div>
                        <div v-if="song.album" class="flex justify-between w-full">
                            <span class="text-dark w-40 md:w-48 xl:w-40">Album</span>
                            <NuxtLink :to="`/albums/${song.album.id}/${song.album.slug}`"
                                class="text-blue-600 w-5/6 hover:underline">: {{ song.album.title }}
                            </NuxtLink>
                        </div>
                    </div>

                    <!-- Info 2 -->
                    <div class="space-y-1">
                        <div v-if="song.vocal" class="flex justify-between w-full">
                            <span class="text-dark w-40 md:w-48 xl:w-40">Vocal</span>
                            <span class="text-dark w-5/6">: {{ song.vocal }}</span>
                        </div>
                        <div v-if="song.lyricist" class="flex justify-between w-full">
                            <span class="text-dark w-40 md:w-48 xl:w-40">Lyricist</span>
                            <span class="text-dark w-5/6">: {{ song.lyricist }}</span>
                        </div>
                        <div v-if="song.composer" class="flex justify-between w-full">
                            <span class="text-dark w-40 md:w-48 xl:w-40">Composer</span>
                            <span class="text-dark w-5/6">: {{ song.composer }}</span>
                        </div>
                        <div v-if="song.arrangement" class="flex justify-between w-full">
                            <span class="text-dark w-40 md:w-48 xl:w-40">Arrangement</span>
                            <span class="text-dark w-5/6">: {{ song.arrangement }}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>
