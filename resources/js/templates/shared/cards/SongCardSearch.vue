<template>
    <a :href="`/songs/${song.id}/${song.slug}`"
        class="group flex w-full overflow-hidden cursor-pointer relative items-center">
        <!-- Cover Image -->
        <img :src="song.image || 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'"
            :alt="song.title" class="w-10 h-10 lg:w-12 lg:h-12 rounded-sm object-cover" />

        <!-- Song Title + Artist Name -->
        <div class="flex flex-col px-2">
            <h3 class="text-sm md:text-base lg:text-lg font-medium text-dark line-clamp-1 group-hover:underline">
                {{ song.title }}
            </h3>
            <p class="text-xs md:text-sm lg:text-base font-normal text-gray-500 line-clamp-1">
                {{ song.artist.name }}
            </p>
        </div>
    </a>
</template>

<script setup>
defineProps({
    song: {
        type: Object,
        required: true,
        validator: (obj) => obj.title && typeof obj.title === 'string',
    },
});
</script>
