<template>
    <div class="container py-4 px-4 md:px-6 lg:px-8 xl:px-10">

        <h1 class="text-lg md:text-xl lg:text-2xl font-bold text-dark truncate mb-2">{{ $t('common.artistList') }}</h1>

        <!-- Alphabet Navigation -->
        <div class="flex flex-wrap gap-2 py-4 mb-4">
            <button v-for="letter in ['#', ...alphabet]" :key="letter" @click="scrollToSection(letter)"
                class="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-sm md:text-base bg-dark hover:bg-gray-900 text-light rounded ">
                {{ letter }}
            </button>
        </div>

        <!-- Artist List Sections -->
        <div class="space-y-8">
            <!-- Special characters section -->
            <div :id="'section-#'" class="scroll-mt-24">
                <h2 class="text-xl text-dark font-bold mb-1">##</h2>
                <div v-if="getArtistsBySection('#').length" class="space-y-2">
                    <ArtistCardSearch v-for="artist in getArtistsBySection(letter)" :key="artist.id" :artist="artist" />
                </div>
                <p v-else class="text-gray-500">{{ $t('error.artistNotAvailable') }}</p>
            </div>

            <!-- Alphabet sections -->
            <div v-for="letter in alphabet" :key="letter" :id="'section-' + letter" class="scroll-mt-24">
                <h2 class="text-xl text-dark font-bold mb-1">#{{ letter }}</h2>
                <div v-if="getArtistsBySection(letter).length" class="space-y-2">
                    <ArtistCardSearch v-for="artist in getArtistsBySection(letter)" :key="artist.id" :artist="artist" />
                </div>
                <p v-else class="text-gray-500">{{ $t('error.artistNotAvailable') }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ArtistCardSearch from '../../../shared/cards/ArtistCardSearch.vue';

const artists = ref([]);
const alphabet = ref('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
const loading = ref(true);
const error = ref(null);

const fetchArtists = async () => {
    try {
        loading.value = true;

        const artistsPromise = axios.get(`/api/artists?sort_by=name`);

        // Menunggu semua API selesai
        const [artistsResponse] = await Promise.all([artistsPromise]);

        // Cek apakah status respons adalah 200
        if (artistsResponse.status === 200 && artistsResponse.data.success) {
            artists.value = artistsResponse.data.data;
        } else {
            error.value = 'errorGetData'; // Gantilah dengan fungsi untuk mendapatkan pesan error
        }
    } catch (err) {
        error.value = 'errorGetData'; // Gantilah dengan fungsi untuk mendapatkan pesan error
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

const getArtistsBySection = (letter) => {
    if (letter === '#') {
        return artists.value.filter(artist => {
            const firstChar = artist.name.charAt(0).toUpperCase();
            return !alphabet.value.includes(firstChar);
        });
    }

    return artists.value.filter(artist =>
        artist.name.charAt(0).toUpperCase() === letter
    ).sort((a, b) => a.name.localeCompare(b.name));
};

// Memanggil fetchArtists saat komponen dimuat
onMounted(() => {
    fetchArtists();
});
</script>
