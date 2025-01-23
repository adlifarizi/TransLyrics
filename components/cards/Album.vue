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
    }
});
</script>

<template>
    <NuxtLink :to="`/albums/${album.id}/${album.slug}`"
        class="group flex flex-col bg-white rounded shadow-sm w-full overflow-hidden cursor-pointer">
        <!-- Cover Image -->
        <div class="w-full aspect-square">
            <img :src="`${backendUrl}${album.image}` || 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'"
                :alt="album.title" class="w-full h-full object-cover" />
        </div>

        <!-- Album Info -->
        <div class="p-2 flex flex-col justify-between flex-grow">
            <h3 class="text-base md:text-lg font-medium text-dark line-clamp-2 group-hover:underline">
                {{ album.title }}
            </h3>
            <p class="text-sm md:text-base font-normal text-gray-500 line-clamp-1">
                {{ (album.songs.length) + " songs" }}
            </p>
        </div>
    </NuxtLink>
</template>
