<template>
    <section class="w-fit py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
        <!-- Song Image and Info Container -->
        <div class="flex flex-col md:flex-row items-start gap-4 w-full">
            <!-- Album Image -->
            <div class="flex-shrink-0">
                <img :src="song.image ? `${song.image}` : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'"
                    :alt="song.title" class="w-24 h-24 rounded object-cover" />
            </div>

            <!-- Song Info -->
            <div class="flex flex-col flex-1 w-full">
                <!-- Song Title -->
                <p class="text-xl lg:text-2xl font-bold text-dark line-clamp-2 mb-1">{{ song.title }}</p>

                <div v-if="song.artist.name" class="flex justify-between w-full">
                    <span class="text-dark w-40 md:w-48 xl:w-40">{{ $t('common.artist') }}</span>
                    <span class="text-dark w-5/6">: {{ song.artist.name }}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    song: {
        type: Object,
        required: true,
        validator: (obj) => obj.title && typeof obj.title === 'string',
    },
});
</script>
