<template>
    <!-- Navbar -->
    <Sidebar class="pl-16">

        <!-- Top Bar -->
        <Header />

        <!-- Main -->
        <div class="w-full min-h-[60svh] py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
            <div class="flex gap-6">
                <!-- Upload Image Section -->
                <div>
                    <label class="block font-medium text-dark mb-1">{{ $t('common.image') }}</label>
                    <div
                        class="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg w-48 h-48 p-2 relative">
                        <input type="file" @change="handleImageUpload" accept=".jpg, .png, .jpeg, .webp" class="hidden"
                            id="fileInput" />
                        <div @click="triggerFileInput"
                            class="cursor-pointer relative w-full h-full flex justify-center items-center">
                            <div v-if="!previewImage"
                                class="absolute inset-0 flex justify-center items-center text-center">
                                <span class="text-gray-500"><i class="fa-solid fa-image"></i> Upload Image</span>
                            </div>
                            <div v-else class="relative w-full h-full flex justify-center items-center">
                                <img :src="previewImage" class="absolute inset-0 w-full h-full rounded-lg object-cover"
                                    alt="Preview" />
                                <div
                                    class="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">
                                    <span class="text-gray-100"><i class="fa-solid fa-image"></i> Change Image</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Input Form -->
                <div class="flex-1">
                    <form @submit.prevent="handleSubmit">
                        <div class="mb-4">
                            <label for="artist" class="block font-medium text-dark mb-1">{{ $t('common.artist') }} <span
                                    class="text-red-500"> *</span></label>
                            <select v-model="form.artist_id" id="artist"
                                class="px-3 py-1.5 w-full border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500">
                                <option value="" disabled>{{ $t('admin.selectArtist') }}</option>
                                <option v-for="artist in artists" :key="artist.id" :value="artist.id">
                                    {{ artist.name }}
                                </option>
                            </select>
                        </div>

                        <div class="mb-4">
                            <label for="title" class="block font-medium text-dark mb-1">{{ $t('common.title') }} <span
                                    class="text-red-500"> *</span></label>
                            <input v-model="form.title" id="title" type="text" :placeholder="`${$t('common.title')}`"
                                class="px-3 py-1.5 w-full border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div class="mb-4">
                            <label for="original_title" class="block font-medium text-dark mb-1">{{
                                $t('common.originalTitle')
                            }}</label>
                            <input v-model="form.original_title" id="original_title" type="text"
                                :placeholder="`${$t('common.title')}`"
                                class="px-3 py-1.5 w-full border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div class="mb-4">
                            <label for="alternate_title" class="block font-medium text-dark mb-1">{{
                                $t('common.alternateTitle')
                            }}</label>
                            <input v-model="form.alternate_title" id="alternate_title" type="text"
                                :placeholder="`${$t('common.alternateTitle')}`"
                                class="px-3 py-1.5 w-full border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div class="mb-4">
                            <label for="release_year" class="block font-medium text-dark mb-1">{{ $t('common.released')
                                }}</label>
                            <input v-model="form.release_year" id="release_year" type="text" placeholder="ex: 2020"
                                class="px-3 py-1.5 w-full border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div class="flex flex-row gap-4">
                            <button @click="$router.push({ name: 'ManageAlbum' })"
                                class="bg-red-500 w-24 text-light px-4 py-2 rounded">
                                {{ $t('common.cancel') }}
                            </button>
                            <button type="submit" class="bg-blue-500 w-24 text-light px-4 py-2 rounded">
                                {{ $t('common.save') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <Footer />

    </Sidebar>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

// Refs untuk menyimpan data reaktif
const form = ref({
    title: '',
    original_title: '',
    alternate_title: '',
    artist_id: '',
    release_year: '',
});

const previewImage = ref('');
const isEdit = ref(false);
const artists = ref([]);

// Mengambil instance dari router dan route
const route = useRoute();
const router = useRouter();

// Computed untuk mendapatkan albumId dari route params
const albumId = computed(() => route.params.id);

// Fetch album data jika ada albumId
onMounted(() => {
    if (albumId.value) {
        isEdit.value = true;
        fetchAlbum();
    }
    fetchArtistsList();
});

// Fungsi untuk fetch daftar artist
const fetchArtistsList = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        const response = await axios.get('/api/admin/artists/list', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.data.success) {
            artists.value = response.data.data; // Sesuaikan key jika berbeda
        }
    } catch (error) {
        console.error(error);
    }
};

// Fungsi untuk fetch data album
const fetchAlbum = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        const response = await axios.get(`/api/admin/albums?id=${albumId.value}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.data.success) {
            form.value.title = response.data.data.title;
            form.value.original_title = response.data.data.original_title;
            form.value.alternate_title = response.data.data.alternate_title;
            form.value.artist_id = response.data.data.artist_id;
            form.value.release_year = response.data.data.release_year;

            previewImage.value = response.data.data.image; // Sesuaikan key image
        }
    } catch (error) {
        
    }
};

// Fungsi untuk menangani upload gambar
const handleImageUpload = (event) => {
    const file = event.target.files[0];
    previewImage.value = URL.createObjectURL(file);
    form.value.image = file; // Simpan file untuk dikirim ke server
};

// Fungsi untuk trigger input file
const triggerFileInput = () => {
    document.getElementById('fileInput').click();
};

// Fungsi untuk handle submit form
const handleSubmit = async () => {
    const formData = new FormData();
    Object.keys(form.value).forEach((key) => {
        if (form.value[key] !== '' && form.value[key] !== null && form.value[key] !== undefined) {
            formData.append(key, form.value[key]);
        }
    });

    if (isEdit.value) {
        formData.append('_method', "PUT");
    }

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        const response = isEdit.value
            ? await axios.post(`/api/admin/albums/${albumId.value}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            : await axios.post('/api/admin/albums', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

        if (response.data.success) {
            router.push('/admin/albums'); // Kembali ke halaman album
        }
    } catch (error) {
        
    }
};
</script>