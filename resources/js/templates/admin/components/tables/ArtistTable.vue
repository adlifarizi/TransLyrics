<template>
    <div class="w-full min-h-[80svh] py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
        <!-- Title -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mt-2 mb-1">
            <p class="text-lg md:text-xl lg:text-2xl font-bold text-dark truncate mb-4">{{ $t('common.artistList') }}
            </p>
            <div class="flex items-center gap-2">
                <input type="text" v-model="searchQuery" :placeholder="`${$t('admin.searchArtistPlaceholder')}`"
                    class="px-3 py-1.5 w-44 sm:w-64 border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500" />
                <button @click="$router.push({ name: 'AddArtist' })"
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
                        <th @click="sort('name')"
                            class="cursor-pointer border border-gray-300 px-4 py-2 text-left text-dark">
                            {{ $t('common.name') }}
                            <i :class="getSortIcon('name')" class="ml-1"></i>
                        </th>
                        <th @click="sort('albums')"
                            class="cursor-pointer border border-gray-300 py-2 text-center text-dark w-24">
                            {{ $t('common.albums') }}
                            <i :class="getSortIcon('albums')" class="ml-1"></i>
                        </th>
                        <th @click="sort('songs')"
                            class="cursor-pointer border border-gray-300 py-2 text-center text-dark w-24">
                            {{ $t('common.songs') }}
                            <i :class="getSortIcon('songs')" class="ml-1"></i>
                        </th>
                        <th @click="sort('views')"
                            class="cursor-pointer border border-gray-300 py-2 text-center text-dark w-24">
                            {{ $t('common.views') }}
                            <i :class="getSortIcon('views')" class="ml-1"></i>
                        </th>
                        <th class="border border-gray-300 px-4 py-2 text-center text-dark w-20">
                            {{ $t('admin.action') }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Check if data is empty -->
                    <tr v-if="sortedArtists.length === 0">
                        <td colspan="5" class="border border-gray-300 px-4 py-2 text-center text-gray-500">
                            {{ $t('error.artistNotAvailable') }}
                        </td>
                    </tr>
                    <tr v-for="(artist, index) in sortedArtists" :key="index" class="odd:bg-gray-200 even:bg-light">
                        <td class="border border-gray-300 px-4 py-2 text-left text-dark">{{ artist.name }}</td>
                        <td class="border border-gray-300 px-4 py-2 text-center text-dark">{{ artist.albums.length }}
                        </td>
                        <td class="border border-gray-300 px-4 py-2 text-center text-dark">{{ artist.songs.length }}
                        </td>
                        <td class="border border-gray-300 px-4 py-2 text-center text-dark">{{ artist.views }}</td>
                        <td class="border border-gray-300 px-4 py-2 text-center text-dark flex gap-2 justify-center">
                            <button @click="$router.push({ name: 'EditArtist', params: { id: artist.id } })"
                                class="w-10 h-10 bg-green-500 hover:bg-green-600 text-center text-light p-2 rounded-lg transition duration-200 whitespace-nowrap">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button @click="openDeleteModal(artist.id)"
                                class="w-10 h-10 bg-red-500 hover:bg-red-600 text-center text-light p-2 rounded-lg transition duration-200 whitespace-nowrap">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal Konfirmasi Penghapusan -->
        <div v-if="showDeleteModal"
            class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div class="bg-white p-6 rounded-lg shadow-lg w-96 text-dark">
                <h3 class="text-lg font-bold mb-4">{{ $t('admin.confirmDelete') }}</h3>
                <p>{{ $t('admin.confirmDeleteMessage') }}</p>
                <div class="mt-4 flex justify-end gap-4">
                    <button @click="closeDeleteModal"
                        class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-dark rounded-lg">{{ $t('common.cancel')
                        }}</button>
                    <button @click="deleteArtist(selectedDeleteId)"
                        class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">{{ $t('admin.delete')
                        }}</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const artists = ref([]);
const loading = ref(true);
const error = ref(null);
const sortKey = ref(null); // Current sorting key
const sortOrder = ref('asc'); // Sorting order: 'asc' or 'desc'
const searchQuery = ref(''); // Query for search
const showDeleteModal = ref(false);
const selectedDeleteId = ref(null);

// Fungsi untuk mengambil data artis
const fetchData = async () => {
    try {
        loading.value = true;
        error.value = null;

        const token = localStorage.getItem('token');

        const artistsPromise = axios.get(`/api/admin/artists`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Menunggu API selesai
        const [artistsResponse] = await Promise.all([artistsPromise]);

        if (artistsResponse.status === 200 && artistsResponse.data.success) {
            artists.value = artistsResponse.data.data;
        }
    } catch (err) {
        error.value = 'Error fetching data'; // Sesuaikan dengan pesan error yang sesuai
    } finally {
        loading.value = false;
    }
};

// Sorting dan filter berdasarkan searchQuery
const sortedArtists = computed(() => {
    let filteredArtists = artists.value;

    // Filter berdasarkan searchQuery
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filteredArtists = filteredArtists.filter(artist =>
            artist.name.toLowerCase().includes(query)
        );
    }

    // Sorting data
    if (!sortKey.value) return filteredArtists;

    return [...filteredArtists].sort((a, b) => {
        const valueA = sortKey.value === 'albums' || sortKey.value === 'songs' ? a[sortKey.value].length : a[sortKey.value];
        const valueB = sortKey.value === 'albums' || sortKey.value === 'songs' ? b[sortKey.value].length : b[sortKey.value];

        if (sortOrder.value === 'asc') {
            return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
        } else {
            return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
        }
    });
});

// Fungsi untuk membuka modal delete
const openDeleteModal = (artistId) => {
    selectedDeleteId.value = artistId;
    showDeleteModal.value = true;
};

// Fungsi untuk menutup modal delete
const closeDeleteModal = () => {
    showDeleteModal.value = false;
    selectedDeleteId.value = null;
};

// Fungsi untuk menghapus artis
const deleteArtist = async (id) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.delete(`/api/admin/artists/${id}`, {
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