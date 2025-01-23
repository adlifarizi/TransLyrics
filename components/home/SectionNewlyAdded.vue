<script setup>
const { status, data: songs } = await useAPI('/songs', {
    query: {
        sort_by: 'created_at',
        direction: "desc"
    },
    lazy: true,
});
</script>

<template>
    <section class="relative w-full py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">

        <h2 class="text-xl lg:text-2xl font-bold text-dark truncate mb-2">
            Newly Added
        </h2>

        <div class="container">
            <!-- Shimmer Loading -->
            <div v-if="status === 'pending'" class="container">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-x-2 md:gap-x-6 gap-y-0">
                    <CardsSongShimmer v-for="index in 4" :key="index" class="w-full" />
                </div>
            </div>

            <!-- Show Songs -->
            <div v-else class="container">
                <div v-if="songs?.data?.length" class="grid grid-cols-1 gap-x-4 gap-y-2">
                    <CardsSong v-for="song in songs.data.slice(0,4)" :key="song.id" :song="song" class="w-full" />
                </div>

                <!-- Error or No Data -->
                <div v-else class="text-center text-xs md:text-sm lg:text-base text-gray-500 p-4">
                    No song available at this time
                </div>
            </div>
        </div>
    </section>
</template>
