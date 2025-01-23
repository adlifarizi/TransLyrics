<script setup>
const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl;

defineProps({
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
    <NuxtLink :to="`/albums/${album.id}/${album.slug}`"
        class="group flex w-full overflow-hidden cursor-pointer relative items-center">
        <!-- Cover Image -->
        <img :src="`${backendUrl}${album.image}` || 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'"
            :alt="album.title" class="w-10 h-10 lg:w-12 lg:h-12 rounded-sm object-cover" />

        <!-- Album Title + Artist Name -->
        <div class="flex flex-col px-2">
            <h3 class="text-base md:text-lg font-medium text-dark line-clamp-1 group-hover:underline">
                {{ album.title }}
            </h3>
            <h2 class="text-sm md:text-base font-normal text-gray-500 line-clamp-1">
                {{ album.artist.name }}
            </h2>
        </div>
    </NuxtLink>
</template>