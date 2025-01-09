<template>
    <a :href="`/songs/${song.id}`"
        class="group flex bg-white rounded shadow-sm w-full overflow-hidden cursor-pointer relative">

        <!-- Cover Image -->
        <img :src="song.image || 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'"
            alt="Artist Image" class="w-16 md:h-16 lg:w-20 lg:h-20 object-cover" />

        <!-- Song Info -->
        <div class="flex flex-row px-2 py-1 w-full justify-between">
            <div class="flex flex-col px-2 py-1 w-full">
                <h3 class="text-sm md:text-base lg:text-lg font-medium text-dark line-clamp-2 group-hover:underline">
                    {{ song.title }}
                </h3>
                <p class="text-xs md:text-sm lg:text-base font-normal text-gray-500 line-clamp-1">
                    {{ song.artist.name }}
                </p>
            </div>

            <p class="text-xs md:text-sm lg:text-base font-normal w-24 text-end text-gray-500">
                {{ formatDate(song.created_at) }}
            </p>
        </div>
    </a>
</template>

<script setup>
defineProps({
    song: {
        type: Object,
        required: true,
        validator: (obj) => obj.title && typeof obj.title === 'string',
    },
});

// Define methods
function formatDate(dateString) {
    if (!dateString) return ''; // Return an empty string if no date is provided

    const date = new Date(dateString); // Convert ISO string to Date object
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    // Format the date
    return date.toLocaleString('en-GB', options);
}
</script>
