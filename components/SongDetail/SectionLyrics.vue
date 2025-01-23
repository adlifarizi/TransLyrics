<script setup>
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
    <section class="relative items-start gap-6 w-full py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">

        <h2 class="text-xl lg:text-2xl font-medium text-dark truncate mb-2">
            Lyrics
        </h2>

        <SongDetailSectionLyricsTab v-if="song.lyrics" :key="song.id" :lyrics="song.lyrics" />

    </section>
</template>
