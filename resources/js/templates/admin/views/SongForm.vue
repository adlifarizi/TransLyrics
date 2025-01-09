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
                            <label for="album" class="block font-medium text-dark mb-1">{{ $t('common.album') }}</label>
                            <select v-model="form.album_id" id="album"
                                class="px-3 py-1.5 w-full border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500">
                                <option value="" disabled>{{ $t('admin.selectAlbum') }}</option>
                                <option value="">{{ $t('admin.noAlbum') }}</option>
                                <option v-for="album in albums" :key="album.id" :value="album.id">
                                    {{ album.title }}
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
                            <label for="release_date" class="block font-medium text-dark mb-1">{{ $t('common.released')
                                }}</label>
                            <input v-model="form.release_date" id="release_date" type="text" placeholder="YYYY-MM-dd"
                                class="px-3 py-1.5 w-full border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500" />
                        </div>

                        <div class="mb-4">
                            <label for="vocal" class="block font-medium text-dark mb-1">{{ $t('common.vocal')
                                }}</label>
                            <input v-model="form.vocal" id="vocal" type="text" :placeholder="`${$t('common.vocal')}`"
                                class="px-3 py-1.5 w-full border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500" />
                        </div>

                        <div class="mb-4">
                            <label for="music" class="block font-medium text-dark mb-1">{{ $t('common.music')
                                }}</label>
                            <input v-model="form.music" id="music" type="text" :placeholder="`${$t('common.music')}`"
                                class="px-3 py-1.5 w-full border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500" />
                        </div>

                        <div class="mb-4">
                            <label for="lyricist" class="block font-medium text-dark mb-1">{{ $t('common.lyricist')
                                }}</label>
                            <input v-model="form.lyricist" id="lyricist" type="text"
                                :placeholder="`${$t('common.lyricist')}`"
                                class="px-3 py-1.5 w-full border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500" />
                        </div>

                        <div class="mb-4">
                            <label for="composer" class="block font-medium text-dark mb-1">{{ $t('common.composer')
                                }}</label>
                            <input v-model="form.composer" id="composer" type="text"
                                :placeholder="`${$t('common.composer')}`"
                                class="px-3 py-1.5 w-full border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500" />
                        </div>

                        <div class="mb-4">
                            <label for="arrangement" class="block font-medium text-dark mb-1">{{
                                $t('common.arrangement')
                            }}</label>
                            <input v-model="form.arrangement" id="arrangement" type="text"
                                :placeholder="`${$t('common.arrangement')}`"
                                class="px-3 py-1.5 w-full border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500" />
                        </div>

                        <div class="mb-4">
                            <label for="youtube_embed" class="block font-medium text-dark mb-1">Youtube Embed</label>
                            <input v-model="form.youtube_embed" id="youtube_embed" type="text"
                                placeholder="https://www.youtube.com/embed/..."
                                class="px-3 py-1.5 w-full border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500" />
                        </div>

                        <div class="mb-4">
                            <label for="link_youtube_music" class="block font-medium text-dark mb-1">Youtube
                                Music</label>
                            <input v-model="form.link_youtube_music" id="link_youtube_music" type="text"
                                placeholder="https://music.youtube.com/..."
                                class="px-3 py-1.5 w-full border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500" />
                        </div>

                        <div class="mb-4">
                            <label for="link_spotify" class="block font-medium text-dark mb-1">Spotify</label>
                            <input v-model="form.link_spotify" id="link_spotify" type="text"
                                placeholder="https://open.spotify.com/track/..."
                                class="px-3 py-1.5 w-full border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500" />
                        </div>

                        <div class="mb-4">
                            <label for="link_apple_music" class="block font-medium text-dark mb-1">Apple Music</label>
                            <input v-model="form.link_apple_music" id="link_apple_music" type="text"
                                placeholder="https://music.apple.com/id/song/..."
                                class="px-3 py-1.5 w-full border border-dark bg-light text-dark text-sm md:text-base rounded focus:ring-blue-500 focus:border-blue-500" />
                        </div>

                        <div class="flex flex-row gap-4">
                            <button @click="$router.push({ name: 'ManageSong' })"
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
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import Sidebar from '../components/Sidebar.vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

// Router and route
const router = useRouter();
const route = useRoute();

// Reactive variables
const form = reactive({
    title: '',
    original_title: '',
    alternate_title: '',
    artist_id: '',
    album_id: '',
    release_date: '',
    vocal: '',
    music: '',
    lyricist: '',
    composer: '',
    arrangement: '',
    youtube_embed: '',
    link_youtube_music: '',
    link_spotify: '',
    link_apple_music: '',
    image: null,
});
const previewImage = ref('');
const isEdit = ref(false);
const artists = ref([]);
const albums = ref([]);

// Computed properties
const songId = computed(() => route.params.id);

// Fetch artists list
const fetchArtistsList = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        const response = await axios.get('/api/admin/artists/list', {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
            artists.value = response.data.data; // Adjust key if necessary
        }
    } catch (error) {
        console.error(error);
    }
};

// Fetch albums list based on artist ID
const fetchAlbumsList = async (artistId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        const response = await axios.get(`/api/admin/albums/list?artist_id=${artistId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
            albums.value = response.data.data; // Adjust key if necessary
        }
    } catch (error) {
        
    }
};

// Fetch song details
const fetchSong = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        const response = await axios.get(`/api/admin/songs?id=${songId.value}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
            form.title = response.data.data.title;
            form.original_title = response.data.data.original_title;
            form.alternate_title = response.data.data.alternate_title;
            form.artist_id = response.data.data.artist_id;
            form.album_id = response.data.data.album_id;
            form.release_date = response.data.data.release_date;
            form.vocal = response.data.data.vocal;
            form.music = response.data.data.music;
            form.lyricist = response.data.data.lyricist;
            form.composer = response.data.data.composer;
            form.arrangement = response.data.data.arrangement;
            form.youtube_embed = response.data.data.youtube_embed;
            form.link_youtube_music = response.data.data.link_youtube_music;
            form.link_spotify = response.data.data.link_spotify;
            form.link_apple_music = response.data.data.link_apple_music;

            previewImage.value = response.data.data.image; // Adjust key if necessary

            if (form.artist_id) {
                await fetchAlbumsList(form.artist_id);
                form.album_id = response.data.data.album_id || '';
            }
        }
    } catch (error) {
        
    }
};

// Handle image upload
const handleImageUpload = (event) => {
    const file = event.target.files[0];
    previewImage.value = URL.createObjectURL(file);
    form.image = file; // Save file for server submission
};

// Trigger file input
const triggerFileInput = () => {
    document.getElementById('fileInput').click();
};

// Handle form submission
const handleSubmit = async () => {
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
        if (form[key] !== '' && form[key] !== null && form[key] !== undefined) {
            formData.append(key, form[key]);
        }
    });

    if (isEdit.value) {
        formData.append('_method', 'PUT');
    }

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        const response = isEdit.value
            ? await axios.post(`/api/admin/songs/${songId.value}`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            })
            : await axios.post('/api/admin/songs', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });

        if (response.data.success) {
            router.push('/admin/songs');
        }
    } catch (error) {
        
    }
};

// Watch for artist ID changes
watch(
    () => form.artist_id,
    async (newArtistId) => {
        form.album_id = '';
        if (newArtistId) {
            await fetchAlbumsList(newArtistId);
        } else {
            albums.value = [];
        }
    },
    { immediate: true }
);

// Lifecycle hook
onMounted(async () => {
    if (songId.value) {
        isEdit.value = true;
        await fetchSong();
    }
    await fetchArtistsList();
});
</script>
