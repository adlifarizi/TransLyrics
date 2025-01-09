<template>
    <div class="w-full">

        <!-- Tabs Navigation -->
        <div class="flex relative justify-between">
            <button v-for="tab in tabs" :key="tab" @click="setActiveTab(tab)" :class="[
                'px-4 py-2 -mb-px w-full',
                activeTab === tab
                    ? 'border-b-4 border-blue-500 text-blue-500'
                    : 'border-b-2 border-gray-400 text-gray-500 hover:bg-gray-200'
            ]">
                {{ t(`common.${tab}`) }}
            </button>
        </div>

        <!-- Dropdown Selector for Translyrics -->
        <div v-if="activeTab === 'Translyrics'" class="mt-4">
            <select v-model="selectedLanguage"
                class="flex items-center w-full pl-3 pr-10 py-1.5 border border-dark rounded-md whitespace-nowrap focus:outline-none">
                <option v-for="language in availableLanguages" :key="language" :value="language">
                    {{ t(`languageCode.${language}`) }}
                </option>
            </select>
        </div>

        <!-- Side by Side Selectors -->
        <div v-if="activeTab === 'Side by Side'" class="mt-4 grid grid-cols-2 gap-4">
            <select v-model="leftLyrics"
                class="flex items-center w-full pl-3 pr-10 py-1.5 border border-dark rounded-md whitespace-nowrap focus:outline-none">
                <option value="original">{{ t('common.Original') }}</option>
                <option value="romanized">{{ t('common.Romanized') }}</option>
                <option v-for="language in availableLanguages" :key="language" :value="language">
                    {{ t(`languageCode.${language}`) }}
                </option>
            </select>
            <select v-model="rightLyrics"
                class="flex items-center w-full pl-3 pr-10 py-1.5 border border-dark rounded-md whitespace-nowrap focus:outline-none">
                <option value="original">{{ t('common.Original') }}</option>
                <option value="romanized">{{ t('common.Romanized') }}</option>
                <option v-for="language in availableLanguages" :key="language" :value="language">
                    {{ t(`languageCode.${language}`) }}
                </option>
            </select>
        </div>

        <!-- Lyrics Content -->
        <div class="mt-4">
            <!-- Single Column Lyrics -->
            <div v-if="activeTab !== 'Side by Side'" class="whitespace-pre-line">
                {{ getLyrics(activeTab) }}
            </div>

            <!-- Side by Side Lyrics -->
            <div v-else class="space-y-4">
                <div v-for="(leftLine, index) in leftLyricsLines" :key="index"
                    class="flex items-start space-x-4 hover:underline">
                    <div class="whitespace-pre-line w-full">{{ leftLine }}</div>
                    <div class="whitespace-pre-line w-full">{{ rightLyricsLines[index] || '' }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
    lyrics: {
        type: Array,
        required: true,
        default: () => [],
        validator: (arr) => Array.isArray(arr) && arr.every(lyric =>
            lyric.content && lyric.language && lyric.type
        )
    }
});

const tabs = ['Original', 'Romanized', 'Translyrics', 'Side by Side'];
const activeTab = ref('Original');
const selectedLanguage = ref('');
const leftLyrics = ref('original');
const rightLyrics = ref('romanized');

const availableLanguages = computed(() => {
    if (!Array.isArray(props.lyrics)) return [];

    const languages = props.lyrics
        .filter(lyric => lyric && lyric.type === 'translyrics')
        .map(lyric => lyric.language);

    return [...new Set(languages)].sort((a, b) => {
        const nameA = t(`translyricsLanguages.${a}`).toLowerCase();
        const nameB = t(`translyricsLanguages.${b}`).toLowerCase();
        return nameA.localeCompare(nameB);
    });
});

const leftLyricsLines = computed(() => {
    const lyrics = getLyrics(leftLyrics.value);
    return lyrics ? lyrics.split('\n') : [];
});

const rightLyricsLines = computed(() => {
    const lyrics = getLyrics(rightLyrics.value);
    return lyrics ? lyrics.split('\n') : [];
});

const groupedLyrics = computed(() => {
    if (!Array.isArray(props.lyrics)) return {};

    return props.lyrics.reduce((acc, lyric) => {
        if (!lyric) return acc;

        if (lyric.type === 'translyrics') {
            if (!acc.translations) acc.translations = {};
            acc.translations[lyric.language] = lyric.content;
        } else {
            acc[lyric.type] = lyric.content;
        }
        return acc;
    }, {});
});

const setActiveTab = (tab) => {
    activeTab.value = tab;
};

const getLyrics = (type) => {
    switch (type) {
        case 'Original':
        case 'original':
            return groupedLyrics.value.original || t('error.lyricsNotFound');
        case 'Romanized':
        case 'Romaji':
        case 'romanized':
        case 'romaji':
            return groupedLyrics.value.romanized || t('error.lyricsNotFound');
        case 'Translyrics':
        case 'translyrics':
        case 'translated':
            return groupedLyrics.value.translations?.[selectedLanguage.value] || t('error.lyricsNotFound');
        default:
            return groupedLyrics.value.translations?.[type] || t('error.lyricsNotFound');
    }
};

onMounted(() => {
    if (availableLanguages.value.length > 0) {
        selectedLanguage.value = availableLanguages.value[0];
    }
});

watch(() => props.lyrics, (newLyrics) => {
    if (Array.isArray(newLyrics) && newLyrics.length > 0) {
        const languages = newLyrics
            .filter(lyric => lyric && lyric.type === 'translyrics')
            .map(lyric => lyric.language);

        if (languages.length > 0 && !languages.includes(selectedLanguage.value)) {
            selectedLanguage.value = languages[0];
        }
    }
}, { immediate: true });
</script>
