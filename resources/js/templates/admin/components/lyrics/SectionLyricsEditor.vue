<template>
    <div class="w-full py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
        <!-- Notification -->
        <div v-if="showNotification" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-light text-center px-10 py-6 rounded-lg shadow-lg">
                <p class="text-lg font-semibold text-dark">{{ notificationMessage }}</p>
            </div>
        </div>

        <!-- Two Editors Side by Side -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Left Editor -->
            <div class="space-y-4">
                <p class="text-lg lg:text-xl font-bold text-dark mb-1">
                    <!-- Responsive title -->
                    <span class="md:hidden">Editor</span>
                    <span class="hidden md:inline">Editor 1</span>
                </p>
                <select v-model="leftType"
                    class="flex items-center w-full pl-3 pr-10 py-1.5 border border-dark rounded-md whitespace-nowrap focus:outline-none">
                    <option value="original">{{ $t('common.Original') }}</option>
                    <option value="romanized">{{ $t('common.Romanized') }}</option>
                    <option value="en">{{ $t(`languageCode.en`) }}</option>
                    <option value="id">{{ $t(`languageCode.id`) }}</option>
                </select>

                <textarea v-model="lyrics[leftType]" rows="20"
                    class="w-full p-4 border rounded-lg text-sm md:text-base focus:outline-none"
                    placeholder="Enter lyrics...">
                </textarea>
            </div>

            <!-- Right Editor - Hidden on mobile -->
            <div class="hidden md:block space-y-4">
                <p class="text-lg lg:text-xl font-bold text-dark mb-1">Editor 2</p>
                <select v-model="rightType"
                    class="flex items-center w-full pl-3 pr-10 py-1.5 border border-dark rounded-md whitespace-nowrap focus:outline-none">
                    <option value="original">{{ $t('common.Original') }}</option>
                    <option value="romanized">{{ $t('common.Romanized') }}</option>
                    <option value="en">{{ $t(`languageCode.en`) }}</option>
                    <option value="id">{{ $t(`languageCode.id`) }}</option>
                </select>

                <textarea v-model="lyrics[rightType]" rows="20"
                    class="w-full p-4 border rounded-lg text-sm md:text-base focus:outline-none"
                    placeholder="Enter lyrics...">
                </textarea>
            </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end space-x-4 mt-6">
            <button @click="saveLyrics" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                {{ $t('common.save') }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useI18n } from 'vue-i18n'; // Import useI18n

const props = defineProps({
    song: {
        type: Object,
        required: true,
    },
});

const { t } = useI18n(); // Mengambil fungsi t untuk terjemahan

const leftType = ref('original');
const rightType = ref('romanized');
const lyrics = ref({
    original: '',
    romanized: '',
    en: '',
    id: '',
});
const lyricsIds = ref({
    original: null,
    romanized: null,
    en: null,
    id: null,
});
const showNotification = ref(false);
const notificationMessage = ref('');
const router = useRouter();

const fetchLyrics = async (songId) => {
    try {
        const response = await axios.get(`/api/lyrics?song_id=${songId}`);
        if (response.data.success) {
            response.data.data.forEach((lyric) => {
                if (lyric.type === 'translyrics') {
                    lyrics.value[lyric.language] = lyric.content;
                    lyricsIds.value[lyric.language] = lyric.id;
                } else {
                    const type = lyric.type.toLowerCase();
                    lyrics.value[type] = lyric.content;
                    lyricsIds.value[type] = lyric.id;
                }
            });
        }
    } catch (error) {
        showNotificationResult(t('error.lyricsNotFound'));
    }
};

const showNotificationResult = (message) => {
    notificationMessage.value = message;
    showNotification.value = true;
    setTimeout(() => {
        showNotification.value = false;
        router.push('/admin/songs');
    }, 2000);
};

const saveLyrics = async () => {
    try {
        const savePromises = [];

        Object.entries(lyrics.value).forEach(([type, content]) => {
            if (!content) return;

            const isTranslyrics = ['en', 'id'].includes(type);
            const payload = {
                song_id: props.song.id,
                type: isTranslyrics ? 'translyrics' : type,
                language: type,
                content: content,
            };

            if (lyricsIds.value[type]) {
                savePromises.push(
                    axios.put(`/api/lyrics/${lyricsIds.value[type]}`, payload)
                );
            } else {
                savePromises.push(axios.post('/api/lyrics', payload));
            }
        });

        showNotificationResult(t('common.saving'));

        const responses = await Promise.all(savePromises);

        responses.forEach((response) => {
            if (response.data.success && response.status === 201) {
                const lyric = response.data.data;
                const key = lyric.type === 'translyrics' ? lyric.language : lyric.type;
                lyricsIds.value[key] = lyric.id;
            }
        });

        showNotificationResult(t('common.successSaving'));
    } catch (error) {
        showNotificationResult(t('error.errorSaving'));
    }
};

onMounted(() => {
    fetchLyrics(props.song.id);
});
</script>
