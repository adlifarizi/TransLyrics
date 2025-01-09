<template>
    <div class="w-full">
        <!-- Title -->
        <p class="text-lg md:text-xl lg:text-2xl font-bold text-dark truncate mb-4">{{ $t('admin.latestComment') }}</p>

        <!-- Table -->
        <div class="overflow-x-auto mt-4">
            <table class="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr class="bg-light">
                        <th class="border border-gray-300 px-4 py-2 text-left text-dark w-12">{{ $t('admin.name') }}
                        </th>
                        <th class="border border-gray-300 px-4 py-2 text-left text-dark">{{ $t('admin.comment') }}</th>
                        <th class="border border-gray-300 px-4 py-2 text-center text-dark w-36">{{ $t('admin.date') }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="comments.length === 0">
                        <td colspan="3" class="border border-gray-300 px-4 py-2 text-center text-gray-500">{{
                            $t('error.emptyComment') }}</td>
                    </tr>
                    <tr v-if="comments.length > 0" v-for="(comment, index) in displayedComments" :key="index"
                        class="odd:bg-gray-200 even:bg-light">
                        <td
                            class="border border-gray-300 px-4 py-2 text-left text-dark max-w-32 md:max-w-48 break-words">
                            {{ comment.name }}</td>
                        <td
                            class="border border-gray-300 px-4 py-2 text-left text-dark max-w-32 md:max-w-48 break-words">
                            {{ comment.content }}</td>
                        <td class="border border-gray-300 px-4 py-2 text-center text-dark">
                            {{ formatDate(comment.created_at) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

// Define the props using `defineProps`
const props = defineProps({
    comments: {
        type: Array,
        required: false,
        default: () => [],
    },
});

// Computed property for displayedComments
const displayedComments = computed(() => {
    const maxComments = 3;
    const comments = props.comments.slice(0, maxComments);

    // Ensure 3 rows even if data is less
    while (comments.length < maxComments) {
        comments.push({ name: '', content: '', created_at: null });
    }

    return comments;
});

// Method to format the date
const formatDate = (dateString) => {
    if (!dateString) return ''; // If no date, return empty string

    const date = new Date(dateString); // Convert ISO string to Date object
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    // Format the date
    return date.toLocaleString('en-GB', options);
};
</script>
