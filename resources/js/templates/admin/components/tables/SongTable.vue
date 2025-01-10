<template>
    <div class="w-full min-h-[80svh] py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
        <!-- Title -->
        <div class="flex justify-between items-center mt-2 mb-1">
            <p class="text-lg md:text-xl lg:text-2xl font-bold text-dark truncate mb-4">{{ $t('common.songList') }}
            </p>
            <div class="flex items-center gap-2">
                <input type="text" v-model="searchQuery" :placeholder="`${ $t('admin.searchSongPlaceholder') }`"
                    class="px-3 py-1.5 w-44 sm:w-64 border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500" />
                <button @click="$router.push({ name: 'AddSong' })"
                    class="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-center text-light p-2 rounded-lg transition duration-200 whitespace-nowrap">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto mt-4">
            <table class="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr class="bg-light">
                        <th @click="sort('title')"
                            class="cursor-pointer border border-gray-300 px-4 py-2 text-left text-dark">
                            {{ $t('common.title') }}
                            <i :class="getSortIcon('title')" class="ml-1"></i>
                        </th>
                        <th @click="sort('artist')"
                            class="cursor-pointer border border-gray-300 px-4 py-2 text-left text-dark w-64">
                            {{ $t('common.artist') }}
                            <i :class="getSortIcon('artist')" class="ml-1"></i>
                        </th>
                        <th @click="sort('views')"
                            class="cursor-pointer border border-gray-300  py-2 text-center text-dark w-24">
                            {{ $t('common.views') }}
                            <i :class="getSortIcon('views')" class="ml-1"></i>
                        </th>
                        <th class="border border-gray-300 px-4 py-2 text-center text-dark w-40">
                            {{ $t('common.Translyrics') }}
                        </th>
                        <th class="border border-gray-300 px-4 py-2 text-center text-dark w-32">
                            {{ $t('admin.action') }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Check if artists is empty -->
                    <tr v-if="sortedSongs.length === 0">
                        <td colspan="5" class="border border-gray-300 px-4 py-2 text-center text-gray-500">{{
                            $t('error.songNotAvailable') }}</td>
                    </tr>
                    <tr v-for="(song, index) in sortedSongs" :key="index" class="odd:bg-gray-200 even:bg-light">
                        <td class="border border-gray-300 px-4 py-2 text-left text-dark">{{ song.title }}</td>
                        <td class="border border-gray-300 px-4 py-2 text-left text-dark">{{ song.artist.name }}</td>
                        <td class="border border-gray-300 px-4 py-2 text-center text-dark">{{ song.views }}</td>
                        <td class="border border-gray-300 px-4 py-2 text-left">
                            <ul class="flex space-x-2 justify-center">
                                <li v-for="(lyric, index) in song.lyrics.filter(lyric => lyric.type === 'translyrics')"
                                    :key="index" class="bg-blue-500 p-2 rounded text-light">
                                    {{ lyric.language }}
                                </li>
                            </ul>
                        </td>
                        <td class="border border-gray-300 px-4 py-2 text-center text-dark flex gap-2 justify-center">
                            <button @click="$router.push({ name: 'LyricsEditor', params: { id: song.id } })"
                                class="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-center text-light p-2 rounded-lg transition duration-200 whitespace-nowrap">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto" viewBox="0 0 64 64"
                                    fill="currentColor">
                                    <path d="M17.7514 40.0812V20.513H11V16H30.46V20.513H23.6002V40.0812H17.7514Z" />
                                    <path d="M26.6811 47.6149V23.5337H32.5299V43.0297H43V47.6149H26.6811Z" />
                                    <path
                                        d="M48.3465 20.5865L46.8324 22.1006L50.8993 26.1672L52.4134 24.6531C53.1955 23.8711 53.1955 22.6042 52.4134 21.8222L51.1808 20.5865C50.3987 19.8045 49.1317 19.8045 48.3496 20.5865H48.3465ZM46.1253 22.8075L38.833 30.1024C38.5077 30.4277 38.2699 30.8313 38.1385 31.2723L37.0311 35.0355C36.9529 35.3014 37.0248 35.5861 37.2188 35.78C37.4127 35.9739 37.6974 36.0459 37.9602 35.9708L41.7237 34.8635C42.1648 34.7321 42.5683 34.4943 42.8937 34.169L50.1923 26.8741L46.1253 22.8075Z" />
                                </svg>
                            </button>

                            <button @click="$router.push({ name: 'EditSong', params: { id: song.id } })"
                                class="w-10 h-10 bg-green-500 hover:bg-green-600 text-center text-light p-2 rounded-lg transition duration-200 whitespace-nowrap">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button @click="openDeleteModal(song.id)"
                                class="w-10 h-10 bg-red-500 hover:bg-red-600 text-center text-light p-2 rounded-lg transition duration-200 whitespace-nowrap">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal Konfirmasi Penghapusan -->
        <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div class="bg-white p-6 rounded-lg shadow-lg w-96 text-dark">
                <h3 class="text-lg font-bold mb-4">{{ $t('admin.confirmDelete') }}</h3>
                <p>{{ $t('admin.confirmDeleteMessage') }}</p>
                <div class="mt-4 flex justify-end gap-4">
                    <button @click="closeDeleteModal" class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-dark rounded-lg">{{ $t('common.cancel') }}</button>
                    <button @click="deleteSong(selectedDeleteId)" class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">{{ $t('admin.delete') }}</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const songs = ref([]);
const loading = ref(true);
const error = ref(null);
const sortKey = ref(null); // Current sorting key
const sortOrder = ref('asc'); // Sorting order: 'asc' or 'desc'
const searchQuery = ref(''); // Query for search
const showDeleteModal = ref(false);
const selectedDeleteId = ref(null);

// Fungsi untuk mengambil data lagu
const fetchData = async () => {
    try {
        loading.value = true;
        error.value = null;

        const token = localStorage.getItem('token');

        const songsPromise = axios.get(`/api/admin/songs`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Menunggu API selesai
        const [songsResponse] = await Promise.all([songsPromise]);

        if (songsResponse.status === 200 && songsResponse.data.success) {
            songs.value = songsResponse.data.data;
        }
    } catch (err) {
        error.value = 'Error fetching data'; // Sesuaikan dengan pesan error yang sesuai
    } finally {
        loading.value = false;
    }
};

// Sorting berdasarkan key
const sortedSongs = computed(() => {
    let filteredSongs = songs.value;

    // Filter berdasarkan searchQuery
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filteredSongs = filteredSongs.filter(song =>
            song.title.toLowerCase().includes(query)
        );
    }

    // Sorting data
    if (!sortKey.value) return filteredSongs;

    return [...filteredSongs].sort((a, b) => {
        const valueA = a[sortKey.value];
        const valueB = b[sortKey.value];

        if (sortOrder.value === 'asc') {
            return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
        } else {
            return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
        }
    });
});

// Fungsi untuk membuka modal delete
const openDeleteModal = (commentId) => {
    selectedDeleteId.value = commentId;
    showDeleteModal.value = true;
};

// Fungsi untuk menutup modal delete
const closeDeleteModal = () => {
    showDeleteModal.value = false;
    selectedDeleteId.value = null;
};

// Fungsi untuk menghapus lagu
const deleteSong = async (id) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.delete(`/api/admin/songs/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.data.success) {
            fetchData();
            closeDeleteModal();
        }
    } catch (err) {
        console.error(err);
    }
};

// Fungsi untuk mengubah urutan sort
const sort = (key) => {
    if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortKey.value = key;
        sortOrder.value = 'asc';
    }
};

// Fungsi untuk mendapatkan ikon urutan sort
const getSortIcon = (key) => {
    if (sortKey.value !== key) return 'fa-solid fa-sort';
    return sortOrder.value === 'asc' ? 'fa-solid fa-sort-up' : 'fa-solid fa-sort-down';
};

// Mengambil data saat komponen dipasang
onMounted(() => {
    fetchData();
});
</script>