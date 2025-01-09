<template>

    <!-- Title -->
    <p class="text-lg md:text-xl lg:text-2xl font-bold text-dark truncate mb-4">{{ $t('admin.statsOverview') }}</p>

    <!-- Shimmer -->
    <div v-if="loading" class="grid grid-cols-3 gap-4 mb-4">
        <!-- Artists Stats -->
        <div class="bg-light rounded-lg shadow p-4">
            <div class="flex flex-col md:flex-row items-start md:items-center">
                <div class="hidden lg:block p-3 w-12 h-12 text-dark text-center rounded-full bg-gray-200 animate-pulse">
                </div>
                <div class="lg:ml-4 text-dark">
                    <div class="h-4 bg-gray-200 rounded w-10 animate-pulse mb-2"></div>
                    <div class="h-4 bg-gray-200 rounded w-6 animate-pulse"></div>
                </div>
            </div>
        </div>

        <!-- Albums Stats -->
        <div class="bg-light rounded-lg shadow p-4">
            <div class="flex flex-col md:flex-row items-start md:items-center">
                <div class="hidden lg:block p-3 w-12 h-12 text-dark text-center rounded-full bg-gray-200 animate-pulse">
                </div>
                <div class="lg:ml-4 text-dark">
                    <div class="h-4 bg-gray-200 rounded w-10 animate-pulse mb-2"></div>
                    <div class="h-4 bg-gray-200 rounded w-6 animate-pulse"></div>
                </div>
            </div>
        </div>

        <!-- Songs Stats -->
        <div class="bg-light rounded-lg shadow p-4">
            <div class="flex flex-col md:flex-row items-start md:items-center">
                <div class="hidden lg:block p-3 w-12 h-12 text-dark text-center rounded-full bg-gray-200 animate-pulse">
                </div>
                <div class="lg:ml-4 text-dark">
                    <div class="h-4 bg-gray-200 rounded w-10 animate-pulse mb-2"></div>
                    <div class="h-4 bg-gray-200 rounded w-6 animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="grid grid-cols-3 gap-4 mb-4">
        <!-- Artists Stats -->
        <div class="bg-light rounded-lg shadow p-4">
            <div class="flex flex-col md:flex-row items-start md:items-center">
                <div class="hidden lg:block p-3 w-12 h-12 text-dark text-center rounded-full bg-gray-100">
                    <i class="fa-solid fa-users"></i>
                </div>
                <div class="lg:ml-4 text-dark">
                    <p class="text-sm font-medium text-dark">{{ $t('common.artists') }}</p>
                    <p class="text-lg font-semibold">{{ artistsCount }}</p>
                </div>
            </div>
        </div>

        <!-- Albums Stats -->
        <div class="bg-light rounded-lg shadow p-4">
            <div class="flex flex-col md:flex-row items-start md:items-center">
                <div class="hidden lg:block p-3 w-12 h-12 text-dark text-center rounded-full bg-gray-100">
                    <i class="fa-solid fa-record-vinyl"></i>
                </div>
                <div class="lg:ml-4 text-dark">
                    <p class="text-sm font-medium text-dark">{{ $t('common.albums') }}</p>
                    <p class="text-lg font-semibold">{{ albumsCount }}</p>
                </div>
            </div>
        </div>

        <!-- Songs Stats -->
        <div class="bg-light rounded-lg shadow p-4">
            <div class="flex flex-col md:flex-row items-start md:items-center">
                <div class="hidden lg:block p-3 w-12 h-12 text-dark text-center rounded-full bg-gray-100">
                    <i class="fa-solid fa-music"></i>
                </div>
                <div class="lg:ml-4 text-dark">
                    <p class="text-sm font-medium text-dark">{{ $t('common.songs') }}</p>
                    <p class="text-lg font-semibold">{{ songsCount }}</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { defineProps } from 'vue';

// Define the props using `defineProps`
const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
    artistsCount: {
        type: Number,
        required: true,
    },
    albumsCount: {
        type: Number,
        required: true,
    },
    songsCount: {
        type: Number,
        required: true,
    },
});
</script>
