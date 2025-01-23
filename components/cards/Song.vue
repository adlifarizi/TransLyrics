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
    }
});
</script>

<template>
    <NuxtLink :to="`/songs/${song.id}/${song.slug}`"
        class="group flex bg-white rounded shadow-sm w-full overflow-hidden cursor-pointer relative">

        <!-- Cover Image -->
        <img :src="`${backendUrl}${song.image}` || 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'"
            :alt="song.title" class="w-16 md:h-16 lg:w-20 lg:h-20 object-cover" />

        <!-- Song Info -->
        <div class="flex flex-col px-2 py-1">
            <h3 class="text-base md:text-lg font-medium text-dark line-clamp-2 group-hover:underline">
                {{ song.title }}
            </h3>
            <p class="text-sm md:text-base font-normal text-gray-500 line-clamp-1">
                {{ song.artist.name }}
            </p>
        </div>
    </NuxtLink>
</template>
