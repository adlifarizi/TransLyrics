<template>
    <div class="w-full min-h-[60svh] py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
        <!-- Title -->
        <div class="flex justify-between items-center mt-2 mb-1">
            <p class="text-lg md:text-xl lg:text-2xl font-bold text-dark truncate mb-4">{{ $t('common.commentList') }}
            </p>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto mt-1">
            <table class="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr class="bg-light">
                        <th @click="sort('name')"
                            class="cursor-pointer border border-gray-300 px-4 py-2 text-left text-dark">
                            {{ $t('admin.name') }}
                            <i :class="getSortIcon('name')" class="ml-1"></i>
                        </th>
                        <th @click="sort('content')"
                            class="cursor-pointer border border-gray-300 px-4 py-2 text-left text-dark">
                            {{ $t('admin.comment') }}
                            <i :class="getSortIcon('content')" class="ml-1"></i>
                        </th>
                        <th @click="sort('created_at')"
                            class="cursor-pointer border border-gray-300 py-2 text-center text-dark w-48">
                            {{ $t('admin.date') }}
                            <i :class="getSortIcon('created_at')" class="ml-1"></i>
                        </th>
                        <th class="border border-gray-300 px-4 py-2 text-center text-dark w-32">
                            {{ $t('admin.action') }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Check if comments is empty -->
                    <tr v-if="sortedComments.length === 0">
                        <td colspan="5" class="border border-gray-300 px-4 py-2 text-center text-gray-500">{{
                            $t('error.emptyComment') }}</td>
                    </tr>
                    <tr v-for="(comment, index) in sortedComments" :key="index" class="odd:bg-gray-200 even:bg-light">
                        <td class="border border-gray-300 px-4 py-2 text-left text-dark break-words">{{ comment.name }}
                        </td>
                        <td class="border border-gray-300 px-4 py-2 text-left text-dark break-words">{{ comment.content
                            }}</td>
                        <td class="border border-gray-300 px-4 py-2 text-center text-dark">{{
                            formatDate(comment.created_at) }}</td>
                        <td class="border border-gray-300 px-4 py-2 text-center text-dark flex gap-2 justify-center">
                            <button @click="openDeleteModal(comment.id)"
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
                    <button @click="deleteComment(selectedDeleteId)"
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

const comments = ref([]);
const loading = ref(true);
const error = ref(null);
const sortKey = ref(null); // Current sorting key
const sortOrder = ref('asc'); // Sorting order: 'asc' or 'desc'
const showDeleteModal = ref(false);
const selectedDeleteId = ref(null);

// Fungsi untuk mengambil data komentar
const fetchData = async () => {
    try {
        loading.value = true;
        error.value = null;

        const token = localStorage.getItem('token');
        
        const commentsPromise = axios.get(`/api/admin/comments`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Menunggu API selesai
        const [commentsResponse] = await Promise.all([commentsPromise]);

        if (commentsResponse.status === 200 && commentsResponse.data.success) {
            comments.value = commentsResponse.data.data;
        }
    } catch (err) {
        error.value = 'Error fetching data'; // Sesuaikan dengan pesan error yang sesuai
    } finally {
        loading.value = false;
    }
};

// Sorting berdasarkan key
const sortedComments = computed(() => {
    // Sorting data
    if (!sortKey.value) return comments.value;

    return [...comments.value].sort((a, b) => {
        const valueA = a[sortKey.value];
        const valueB = b[sortKey.value];

        if (sortOrder.value === 'asc') {
            return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
        } else {
            return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
        }
    });
});

// Fungsi untuk memformat tanggal
const formatDate = (dateString) => {
    if (!dateString) return ''; // Jika tidak ada tanggal, kembalikan string kosong

    const date = new Date(dateString); // Mengonversi string ISO menjadi objek Date
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Untuk format 24 jam
    };

    // Format tanggal dan waktu
    return date.toLocaleString('en-GB', options);
};

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

// Fungsi untuk menghapus komentar
const deleteComment = async (id) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.delete(`/api/admin/comments/${id}`, {
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