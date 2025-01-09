<template>
    <section class="relative items-start gap-6 w-full py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">

        <h2 class="text-xl lg:text-2xl font-medium text-dark truncate mb-2">{{
            $t('common.lyrics') }}</h2>

        <p class="text-base font-normal text-dark mb-2">
            <i class="fa-solid fa-circle-exclamation text-yellow-500"></i>
            {{ $t('warning.lyricsWarning') }}
        </p>

        <SectionLyricsTab v-if="song.lyrics" :key="song.id" :lyrics="song.lyrics" />

    </section>
</template>

<script setup>
import { defineProps } from 'vue';
import SectionLyricsTab from './SectionLyricsTab.vue';

const props = defineProps({
    song: {
        type: Object,
        required: true,
        validator: (obj) => obj.title && typeof obj.title === 'string',
    },
});
</script>
