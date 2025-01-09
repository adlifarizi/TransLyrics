<template>
    <div class="mb-4 w-full">
        <!-- Title -->
        <p class="text-lg md:text-xl lg:text-2xl font-bold text-dark truncate mb-4">{{ $t('admin.viewsRank') }}</p>

        <div class="flex flex-col">
            <!-- Tabs -->
            <div class="flex relative justify-between">
                <button v-for="tab in tabs" :key="tab" @click="setActiveTab(tab)" :class="[
                    'px-4 py-1 -mb-px w-full',
                    activeTab === tab
                        ? 'border-b-4 border-blue-500 bg-blue-500 text-light font-medium rounded-t-lg'
                        : 'border-b-2 border-gray-400 text-gray-500 hover:bg-gray-200 rounded-t-lg'
                ]">
                    {{ $t(`common.${tab}`) }}
                </button>
            </div>

            <!-- Rankings -->
            <div class="overflow-x-auto">
                <table class="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr class="bg-light">
                            <th class="border border-gray-300 px-4 py-2 text-center text-dark w-12">No</th>
                            <th class="border border-gray-300 px-4 py-2 text-left text-dark">
                                {{ activeTab === 'artists' ? $t('common.name') : $t('common.title') }}
                            </th>
                            <th class="border border-gray-300 px-4 py-2 text-center text-dark w-16">{{
                                $t('common.views')
                                }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in displayedData" :key="index" class="odd:bg-gray-200 even:bg-light">
                            <td class="border border-gray-300 px-4 py-2 text-center text-dark">{{ index + 1 }}</td>
                            <td
                                class="border border-gray-300 px-4 py-2 text-left text-dark max-w-32 md:max-w-48 break-words">
                                {{ item.name || item.title || '' }}
                            </td>
                            <td class="border border-gray-300 px-4 py-2 text-center text-dark">{{ item.views || '' }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue';

// Define the props using `defineProps`
const props = defineProps({
    artists: {
        type: Array,
        required: false,
        default: () => [],
    },
    albums: {
        type: Array,
        required: false,
        default: () => [],
    },
    songs: {
        type: Array,
        required: false,
        default: () => [],
    },
});

// Reactive variables
const tabs = ['artists', 'albums', 'songs'];
const activeTab = ref('artists'); // Default tab

// Computed property for displayedData
const displayedData = computed(() => {
    const dataMap = {
        artists: props.artists,
        albums: props.albums,
        songs: props.songs,
    };
    const data = dataMap[activeTab.value].slice(0, 5);

    // Ensure there are exactly 5 rows
    while (data.length < 5) {
        data.push({ name: '', title: '', views: '' });
    }

    return data;
});

// Method to set the active tab
const setActiveTab = (tab) => {
    activeTab.value = tab;
};
</script>
