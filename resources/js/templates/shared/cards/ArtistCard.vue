<template>
    <div class="group flex flex-row gap-2 overflow-hidden py-2 w-full">
        <!-- Profile Info -->
        <a :href="`/artists/${artist.id}/${artist.slug}`"
            class="w-3/4 bg-light rounded cursor-pointer shadow-sm overflow-hidden flex-shrink-0">
            <!-- Profile Image as Background -->
            <div class="w-full relative px-4 mt-4">
                <!-- Add a thin line behind the image -->
                <div class="absolute inset-0 flex items-center justify-center z-0">
                    <div class="w-full h-1 bg-lightgrey"></div>
                </div>
                <!-- Image -->
                <div class="z-10 h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 relative rounded-full overflow-hidden">
                    <img :src="artist.image ? `${artist.image}` : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'"
                        :alt="artist.name" class="w-full h-full rounded-full object-cover" />
                </div>
            </div>

            <!-- Content Section -->
            <div class="space-y-1 p-4">
                <h3 class="text-lg md:text-xl font-medium text-dark truncate w-full group-hover:underline">
                    {{ artist.name }}
                </h3>
                <p class="text-sm md:text-base text-gray-500 truncate w-full">{{ artist.translyrics_count }}
                    translyrics</p>
            </div>
        </a>

        <!-- Social Media Links -->
        <div class="flex flex-col space-y-2 flex-shrink-0 w-1/4 text-center">
            <a :href="`${artist.social_x}`" target="_blank" v-if="artist.social_x"
                class="p-1 bg-light shadow-sm w-8 h-8 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
                <i class="fa-brands fa-x-twitter text-sm text-dark"></i>
            </a>
            <a :href="`${artist.social_instagram}`" target="_blank" v-if="artist.social_instagram"
                class="p-1 bg-light shadow-sm w-8 h-8 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
                <i class='bx bxl-instagram-alt text-base text-dark'></i>
            </a>
            <a :href="`${artist.social_youtube}`" target="_blank" v-if="artist.social_youtube"
                class="p-1 bg-light shadow-sm w-8 h-8 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
                <i class='bx bxl-youtube text-base text-dark'></i>
            </a>
            <a :href="`${artist.social_spotify}`" target="_blank" v-if="artist.social_spotify"
                class="p-1 bg-light shadow-sm w-8 h-8 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
                <i class='bx bxl-spotify text-base text-dark'></i>
            </a>
        </div>
    </div>
</template>

<script setup>
defineProps({
    artist: {
        type: Object,
        required: true,
        validator: (obj) => obj.name && typeof obj.name === 'string',
    },
});
</script>
