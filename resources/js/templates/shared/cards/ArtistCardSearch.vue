<template>
    <a :href="`/artists/${artist.id}/${artist.slug}`"
        class="group flex w-full overflow-hidden cursor-pointer relative items-center">
        <!-- Cover Image -->
        <img :src="artist.image || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'"
            :alt="artist.name" class="w-10 h-10 lg:w-12 lg:h-12 rounded-sm object-cover" />

        <!-- Artist Name -->
        <div class="flex flex-col px-2">
            <h3 class="text-base md:text-lg font-medium text-dark line-clamp-1 group-hover:underline">
                {{ artist.name }}
            </h3>
        </div>
    </a>
</template>

<script setup>
defineProps({
    artist: {
        type: Object,
        required: true,
        validator: (obj) => obj.name && typeof obj.name === 'string',
    },
});
</script>
