<template>
    <section class="relative w-full py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">

        <h2 class="text-xl lg:text-2xl font-bold text-dark truncate mb-2">Looking for more?</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-x-2 gap-y-2">

            <!-- Browse Songs -->
            <div
                class="text-sm lg:text-base rounded-xl bg-gradient-to-b from-blue-400 to-blue-500 p-6 relative h-24 md:h-40 lg:h-48">
                <!-- Music Icon - Top Right -->
                <div class="absolute top-3 md:top-4 right-4 text-xl md:text-4xl lg:text-6xl text-light">
                    <i class="fa-solid fa-music"></i>
                </div>

                <!-- Bottom Container -->
                <div class="absolute bottom-4 left-0 right-0 px-4 md:px-6 flex justify-between items-end">
                    <!-- Text Content - Bottom Left -->
                    <div class="max-w-[60%]">
                        <p class="text-light">
                            Discover lyrics across different languages.
                        </p>
                    </div>

                    <!-- Button - Bottom Right -->
                    <NuxtLink to="/songs"
                        class="bg-blue-700 hover:bg-blue-800 font-medium text-light p-2 rounded-lg transition duration-200 whitespace-nowrap">
                        Browse Songs
                    </NuxtLink>
                </div>
            </div>

            <!-- Browse Albums -->
            <div
                class="text-sm lg:text-base rounded-xl bg-gradient-to-b from-gray-400 to-gray-500 p-6 relative  h-24 md:h-40 lg:h-48">
                <!-- Music Icon - Top Right -->
                <div class="absolute top-3 md:top-4 right-4 text-xl md:text-4xl lg:text-6xl text-light">
                    <i class="fa-solid fa-record-vinyl"></i>
                </div>

                <!-- Bottom Container -->
                <div class="absolute bottom-4 left-0 right-0 px-4 md:px-6 flex justify-between items-end">
                    <!-- Text Content - Bottom Left -->
                    <div class="max-w-[60%]">
                        <p class="text-light">
                            Explore albums and enjoy new music.
                        </p>
                    </div>

                    <!-- Button - Bottom Right -->
                    <NuxtLink to="/albums"
                        class="bg-gray-700 hover:bg-gray-800 font-medium text-light p-2 rounded-lg transition duration-200 whitespace-nowrap">
                        Browse Albums
                    </NuxtLink>
                </div>
            </div>

            <!-- Browse Artists -->
            <div
                class="text-sm lg:text-base rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 p-6 relative h-24 md:h-40 lg:h-48">
                <!-- Music Icon - Top Right -->
                <div class="absolute top-3 md:top-4 right-4 text-xl md:text-4xl lg:text-6xl text-light">
                    <i class="fa-solid fa-users"></i>
                </div>

                <!-- Bottom Container -->
                <div class="absolute bottom-4 left-0 right-0 px-4 md:px-6 flex justify-between items-end">
                    <!-- Text Content - Bottom Left -->
                    <div class="max-w-[60%]">
                        <p class="text-light ">
                            Discover your favorite artists to find hidden gems
                        </p>
                    </div>

                    <!-- Button - Bottom Right -->
                    <NuxtLink to="/artists"
                        class="bg-blue-500 hover:bg-blue-600 font-medium text-light p-2 rounded-lg transition duration-200 whitespace-nowrap">
                        Browse Artists
                    </NuxtLink>
                </div>
            </div>

        </div>
    </section>
</template>