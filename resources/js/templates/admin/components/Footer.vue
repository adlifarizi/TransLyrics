<template>
    <footer class="relative w-full bg-dark py-4 px-4 md:px-6 lg:px-8 xl:px-10">
        <div class="grid grid-cols-1 md:grid-cols-3 justify-between items-start">

            <!-- Brand -->
            <div class="flex flex-row md:flex-col gap-4 items-start">
                <!-- Brand -->
                <div class="flex items-start">
                    <div class="bg-light w-6 sm:w-8 md:w-10 lg:w-14 xl:w-16 rounded-lg shadow-md">
                        <div class="aspect-square relative">
                            <div class="absolute inset-0 flex items-center justify-center">
                                <img class="w-3 md:w-4 lg:w-6 xl:8"
                                    :src="`${baseUrl}/storage/images/translyrics-logo.png`">
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col ml-2">
                        <p class="text-lg md:text-xl lg:text-2xl font-maven font-bold text-light">
                            Trans<span class="text-blue-500">Lyrics</span>
                        </p>
                        <p class="text-xs md:text-sm font-normal text-light">
                            Explore singable translations
                        </p>
                    </div>
                </div>

                <!-- Social Media -->
                <!-- <div class="flex items-start space-x-4">
                    <a href="#">
                        <i class="fa-brands fa-x-twitter text-xl md:text-2xl lg:text-4xl text-light"></i>
                    </a>
                    <a href="#">
                        <i class="fa-brands fa-instagram text-xl md:text-2xl lg:text-4xl text-light"></i>
                    </a>
                </div> -->
            </div>

        </div>

        <div class="container mx-auto mt-8 pt-4 text-center text-light text-sm">
            © {{ new Date().getFullYear() }} TransLyrics. Developed by Kayoi.
        </div>
    </footer>
</template>

<script setup>
const baseUrl = import.meta.env.VITE_BASE_URL;
</script>
