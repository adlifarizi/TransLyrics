<template>
    <div class="w-full min-h-[60svh] py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
        <!-- Title -->
        <div class="flex justify-between items-center mt-2 mb-1">
            <p class="text-lg md:text-xl lg:text-2xl font-bold text-dark truncate mb-4">{{ $t('common.albumList') }}
            </p>
            <div class="flex items-center gap-2">
                <input type="text" v-model="searchQuery" :placeholder="`${$t('admin.searchAlbumPlaceholder')}`"
                    class="px-3 py-1.5 w-44 sm:w-64 border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500" />
                <button @click="$router.push({ name: 'AddAlbum' })"
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
                        <th @click="sort('songs')"
                            class="cursor-pointer border border-gray-300 py-2 text-center text-dark w-24">
                            {{ $t('common.songs') }}
                            <i :class="getSortIcon('songs')" class="ml-1"></i>
                        </th>
                        <th @click="sort('views')"
                            class="cursor-pointer border border-gray-300  py-2 text-center text-dark w-24">
                            {{ $t('common.views') }}
                            <i :class="getSortIcon('views')" class="ml-1"></i>
                        </th>
                        <th class="border border-gray-300 px-4 py-2 text-center text-dark w-32">
                            {{ $t('admin.action') }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Check if artists is empty -->
                    <tr v-if="sortedAlbums.length === 0">
                        <td colspan="5" class="border border-gray-300 px-4 py-2 text-center text-gray-500">{{
                            $t('error.albumNotAvailable') }}</td>
                    </tr>
                    <tr v-for="(album, index) in sortedAlbums" :key="index" class="odd:bg-gray-200 even:bg-light">
                        <td class="border border-gray-300 px-4 py-2 text-left text-dark">{{ album.title }}</td>
                        <td class="border border-gray-300 px-4 py-2 text-left text-dark">{{ album.artist.name }}</td>
                        <td class="border border-gray-300 px-4 py-2 text-center text-dark">{{ album.songs.length }}</td>
                        <td class="border border-gray-300 px-4 py-2 text-center text-dark">{{ album.views }}</td>
                        <td class="border border-gray-300 px-4 py-2 text-center text-dark flex gap-2 justify-center">
                            <button @click="$router.push({ name: 'EditAlbum', params: { id: album.id } })"
                                class="w-10 h-10 bg-green-500 hover:bg-green-600 text-center text-light p-2 rounded-lg transition duration-200 whitespace-nowrap">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button @click="openDeleteModal(album.id)"
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
                    <button @click="deleteAlbum(selectedDeleteId)"
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

const albums = ref([]);
const loading = ref(true);
const error = ref(null);
const sortKey = ref(null); // Current sorting key
const sortOrder = ref('asc'); // Sorting order: 'asc' or 'desc'
const searchQuery = ref(''); // Query for search
const showDeleteModal = ref(false);
const selectedDeleteId = ref(null);

// Fungsi untuk mengambil data album
const fetchData = async () => {
    try {
        loading.value = true;
        error.value = null;

        const token = localStorage.getItem('token');

        const albumsPromise = axios.get(`/api/admin/albums`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Menunggu API selesai
        const [albumsResponse] = await Promise.all([albumsPromise]);

        if (albumsResponse.status === 200 && albumsResponse.data.success) {
            albums.value = albumsResponse.data.data;
        }
    } catch (err) {
        error.value = 'Error fetching data'; // Sesuaikan dengan pesan error yang sesuai
    } finally {
        loading.value = false;
    }
};

// Sorting dan filter berdasarkan searchQuery
const sortedAlbums = computed(() => {
    let filteredAlbums = albums.value;

    // Filter berdasarkan searchQuery
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filteredAlbums = filteredAlbums.filter(album =>
            album.title.toLowerCase().includes(query)
        );
    }

    // Sorting data
    if (!sortKey.value) return filteredAlbums;

    return [...filteredAlbums].sort((a, b) => {
        const valueA = sortKey.value === 'songs' ? a[sortKey.value].length : a[sortKey.value];
        const valueB = sortKey.value === 'songs' ? b[sortKey.value].length : b[sortKey.value];

        if (sortOrder.value === 'asc') {
            return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
        } else {
            return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
        }
    });
});

// Fungsi untuk membuka modal delete
const openDeleteModal = (albumId) => {
    selectedDeleteId.value = albumId;
    showDeleteModal.value = true;
};

// Fungsi untuk menutup modal delete
const closeDeleteModal = () => {
    showDeleteModal.value = false;
    selectedDeleteId.value = null;
};

// Fungsi untuk menghapus album
const deleteAlbum = async (id) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.delete(`/api/admin/albums/${id}`, {
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