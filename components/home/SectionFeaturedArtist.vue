<script setup>
const { status, data: artists } = await useAPI('/artists', {
    query: {
        sort_by: 'views',
        direction: "desc"
    },
    lazy: true,
});
</script>

<template>
    <section class="relative w-full py-2 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">
        <div class="flex justify-between items-center mt-2 mb-1">
            <h2 class="text-xl lg:text-2xl font-bold text-dark truncate">
                Featured Artists
            </h2>
            <NuxtLink to="/artists" class="text-sm md:text-base text-blue-500 hover:underline">
                See all
            </NuxtLink>
        </div>

        <!-- Shimmer Loading -->
        <div v-if="status === 'pending'" class="container">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-x-2 md:gap-x-6 gap-y-0">
                <CardsArtistShimmer v-for="index in 4" :key="index" class="w-full" />
            </div>
        </div>

        <!-- Show Artists -->
        <div v-else class="container">
            <div v-if="artists?.data?.length" class="grid grid-cols-2 md:grid-cols-4 gap-x-2 md:gap-x-6 gap-y-0">
                <CardsArtist v-for="artist in artists.data" :key="artist.id" :artist="artist" class="w-full" />
            </div>

            <!-- Error or No Data -->
            <div v-else class="text-center text-xs md:text-sm lg:text-base text-gray-500 p-4">
                No artist available at this time
            </div>
        </div>

    </section>
</template>