<template>
    <div class="flex items-center justify-center h-[90vh] bg-gray-50">
        <div class="text-center px-4">
            <!-- Icon -->
            <div class="mb-8">
                <div v-if="type === 'error'"
                    class="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-red-200">
                    <svg class="h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </div>
                <div v-else-if="type === 'not-found'"
                    class="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-blue-200">
                    <svg class="h-12 w-12 text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
            </div>

            <!-- Title -->
            <h1 class="text-3xl font-bold text-dark mb-4">{{ title }}</h1>

            <!-- Message -->
            <p class="text-lg text-dark">{{ message }}</p>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'error',
        validator: (value) => ['error', 'not-found'].includes(value),
    },
    title: {
        type: String,
        default: 'Oops! Something went wrong',
    },
    message: {
        type: String,
        default: 'We encountered an error while processing your request.',
    },
});
</script>
