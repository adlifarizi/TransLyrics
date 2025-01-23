<script setup>
const props = defineProps({
    albums: {
        type: Array,
        required: true,
        validator: (arr) => arr.every(album => album.title && typeof album.title === 'string'),
    },
});
</script>

<template>
    <section class="relative items-start gap-6 w-full py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">

        <h2 class="text-xl lg:text-2xl font-bold text-dark truncate mb-2">Albums</h2>

        <!-- Album Card -->
        <div v-if="albums && albums.length > 0" class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-2">
            <CardsAlbum v-for="album in albums" :key="album.id" :album="album" class="w-full" />
        </div>

        <!-- Empty Message -->
        <div v-else class="text-center text-xs md:text-sm lg:text-base text-gray-500 p-4">
            No album available at this time
        </div>
    </section>
</template>
