<template>
    <!-- Navbar -->
    <Sidebar class="pl-16">

        <!-- Top Bar -->
        <Header />

        <!-- Notification -->
        <div v-if="showNotification" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-light text-center px-10 py-6 rounded-lg shadow-lg">
                <p class="text-lg font-semibold text-dark">{{ notificationMessage }}</p>
            </div>
        </div>

        <!-- Main -->
        <div class="w-full min-h-[60svh] py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
            <div class="flex flex-col md:flex-row gap-6">
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
                    <div v-if="errorMessage">
                        <p class="block text-red-500 my-2">{{ errorMessage }}</p>
                    </div>
                </div>

                <!-- Input Form -->
                <div class="flex-1">
                    <form @submit.prevent="handleSubmit">
                        <div class="mb-4">
                            <label for="name" class="block font-medium text-dark mb-1">{{ $t('common.name') }} <span
                                    class="text-red-500"> *</span></label>
                            <input v-model="form.name" id="name" type="text" placeholder="name"
                                class="px-3 py-1.5 w-full border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div class="mb-4">
                            <label for="debut_year" class="block font-medium text-dark mb-1">{{ $t('common.debutYear')
                                }}</label>
                            <input v-model="form.debut_year" id="debut_year" type="number" placeholder="ex: 2020"
                                class="px-3 py-1.5 w-full border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div class="mb-4">
                            <label for="social_x" class="block font-medium text-dark mb-1">Twitter (X)</label>
                            <input v-model="form.social_x" id="social_x" type="text" placeholder="https://x.com/..."
                                class="px-3 py-1.5 w-full border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div class="mb-4">
                            <label for="social_instagram" class="block font-medium text-dark mb-1">Instagram</label>
                            <input v-model="form.social_instagram" id="social_instagram" type="text" placeholder="https://www.instagram.com/..."
                                class="px-3 py-1.5 w-full border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div class="mb-4">
                            <label for="social_youtube" class="block font-medium text-dark mb-1">YouTube</label>
                            <input v-model="form.social_youtube" id="social_youtube" type="text" placeholder="https://www.youtube.com/channel/..."
                                class="px-3 py-1.5 w-full border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div class="mb-4">
                            <label for="social_spotify" class="block font-medium text-dark mb-1">Spotify</label>
                            <input v-model="form.social_spotify" id="social_spotify" type="text" placeholder="https://open.spotify.com/artist/..."
                                class="px-3 py-1.5 w-full border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div class="flex flex-row gap-4">
                            <button type="button" @click="$router.push({ name: 'ManageArtist' })"
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
import { useI18n } from 'vue-i18n'; // Import useI18n

import Sidebar from '../components/Sidebar.vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

const { t } = useI18n(); // Mengambil fungsi t untuk terjemahan

// Refs untuk menyimpan data reaktif
const form = ref({
    name: '',
    debut_year: '',
    social_x: '',
    social_instagram: '',
    social_youtube: '',
    social_spotify: '',
});

const previewImage = ref('');
const isEdit = ref(false);

// Mengambil instance dari router dan route
const route = useRoute();
const router = useRouter();

const showNotification = ref(false);
const notificationMessage = ref('');
const errorMessage = ref('');

// Computed untuk mendapatkan artistId dari route params
const artistId = computed(() => route.params.id);

// Fetch artist data jika ada artistId
onMounted(() => {
    if (artistId.value) {
        isEdit.value = true;
        fetchArtist();
    }
});

// Fungsi untuk fetch data artist
const fetchArtist = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        const response = await axios.get(`/api/admin/artists?id=${artistId.value}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.data.success) {
            form.value.name = response.data.data.name;
            form.value.debut_year = response.data.data.debut_year;
            form.value.social_x = response.data.data.social_x;
            form.value.social_instagram = response.data.data.social_instagram;
            form.value.social_youtube = response.data.data.social_youtube;
            form.value.social_spotify = response.data.data.social_spotify;

            previewImage.value = response.data.data.image; // Sesuaikan key image
        }
    } catch (error) {
        errorMessage.value = error
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
    // Reset error message
    errorMessage.value = '';

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

        showNotificationResult(t('common.saving'));

        const response = isEdit.value
            ? await axios.post(`/api/admin/artists/${artistId.value}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            : await axios.post('/api/admin/artists', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

        if (response.data.success) {
            showNotificationResult(t('common.successSaving'));

            router.push('/admin/artists'); // Kembali ke halaman artist
        }
    } catch (error) {
        errorMessage.value = error
        showNotificationResult(t('error.errorSaving'));
    }
};

const showNotificationResult = (message) => {
    notificationMessage.value = message;
    showNotification.value = true;
    setTimeout(() => {
        showNotification.value = false;
    }, 2000);
};
</script>