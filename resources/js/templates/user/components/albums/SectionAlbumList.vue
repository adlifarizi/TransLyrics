<template>
    <div class="container py-4 px-4 md:px-6 lg:px-8 xl:px-10">

        <h1 class="text-xl lg:text-2xl font-bold text-dark truncate mb-2">{{ $t('common.albumList') }}</h1>

        <!-- Alphabet Navigation -->
        <div class="flex flex-wrap gap-2 py-4 mb-4">
            <button v-for="letter in ['#', ...alphabet]" :key="letter" @click="scrollToSection(letter)"
                class="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-sm md:text-base bg-dark hover:bg-gray-900 text-light rounded ">
                {{ letter }}
            </button>
        </div>

        <!-- Album List Sections -->
        <div class="space-y-8">
            <!-- Special characters section -->
            <div :id="'section-#'" class="scroll-mt-24">
                <h2 class="text-xl text-dark font-bold mb-1">##</h2>
                <div v-if="getAlbumsBySection('#').length" class="space-y-2">
                    <AlbumCardSearch v-for="album in getAlbumsBySection(letter)" :key="album.id" :album="album" />
                </div>
                <p v-else class="text-gray-500">{{ $t('error.albumNotAvailable') }}</p>
            </div>

            <!-- Alphabet sections -->
            <div v-for="letter in alphabet" :key="letter" :id="'section-' + letter" class="scroll-mt-24">
                <h2 class="text-xl text-dark font-bold mb-1">#{{ letter }}</h2>
                <div v-if="getAlbumsBySection(letter).length" class="space-y-2">
                    <AlbumCardSearch v-for="album in getAlbumsBySection(letter)" :key="album.id" :album="album" />
                </div>
                <p v-else class="text-gray-500">{{ $t('error.albumNotAvailable') }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import AlbumCardSearch from '../../../shared/cards/AlbumCardSearch.vue';

const albums = ref([]);
const alphabet = ref('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
const loading = ref(true);
const error = ref(null);

const fetchAlbums = async () => {
    try {
        loading.value = true;

        const albumsPromise = axios.get(`/api/albums?sort_by=name`);

        const [albumsResponse] = await Promise.all([albumsPromise]);

        if (albumsResponse.status === 200 && albumsResponse.data.success) {
            albums.value = albumsResponse.data.data;
        } else {
            error.value = 'Error fetching albums data';
        }
    } catch (err) {
        error.value = 'Error fetching data';
    } finally {
        loading.value = false;
    }
};

const scrollToSection = (letter) => {
    const element = document.getElementById(`section-${letter}`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

const getAlbumsBySection = (letter) => {
    if (letter === '#') {
        return albums.value.filter(album => {
            const firstChar = album.title.charAt(0).toUpperCase();
            return !alphabet.value.includes(firstChar);
        });
    }

    return albums.value
        .filter(album => album.title.charAt(0).toUpperCase() === letter)
        .sort((a, b) => a.title.localeCompare(b.title));
};

onMounted(() => {
    fetchAlbums();
});
</script>
