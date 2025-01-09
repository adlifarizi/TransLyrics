<template>
    <!-- Navbar -->
    <Sidebar class="pl-16">

        <!-- Top Bar -->
        <Header />

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
            <div class="animate-spin rounded-full h-8 w-4 md:h-8 md:w-8 lg:h-12 lg:w-12 border-b-2 border-gray"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error">
            <ErrorComponent type="not-found" :title="$t('songDetailNotFoundTitle')"
                :message="$t('songDetailNotFoundMessage')" />
        </div>

        <!-- Success State -->
        <div v-else class="text-dark">
            <div class="flex flex-col">
                <SectionSongInformation v-if="song" :key="song.id" :song="song" />
                <SectionLyricsEditor v-if="song" :key="song.id" :song="song" />
            </div>
        </div>

        <!-- Footer -->
        <Footer />

    </Sidebar>




</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

import Sidebar from '../components/Sidebar.vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import SectionSongInformation from '../components/lyrics/SectionSongInformation.vue';
import SectionLyricsEditor from '../components/lyrics/SectionLyricsEditor.vue';
import ErrorComponent from '../../shared/ErrorComponent.vue';

// Reactive references
const song = ref(null);
const loading = ref(true);
const error = ref(null);

// Access the route using useRoute
const route = useRoute();

// Computed property for songId
const songId = computed(() => route.params.id); // Mengambil parameter ID dari URL

// Fetch data function
const fetchData = async () => {
    try {
        loading.value = true;
        error.value = null;

        const songPromise = axios.get(`/api/songs?id=${songId.value}`);

        // Menunggu semua API selesai
        const [songResponse] = await Promise.all([songPromise]);

        if (songResponse.status === 200 && songResponse.data.success) {
            song.value = songResponse.data.data;
        } else {
            error.value = $t('errorGetData');
        }
    } catch (err) {
        error.value = $t('errorGetData');
    } finally {
        loading.value = false;
    }
};

// Fetch data on mounted
onMounted(() => {
    fetchData();
});
</script>