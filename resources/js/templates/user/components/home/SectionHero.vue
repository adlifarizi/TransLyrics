<template>
    <section class="relative w-full hero-background py-8
        px-8 sm:px-10 md:px-12 lg:px-14 xl:px-16">
        <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">

                <!-- Logo Section -->
                <div class="hidden sm:block sm:w-20 md:w-32 lg:w-36 xl:w-40 flex-shrink-0">
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <div class="aspect-square relative">
                            <div class="absolute inset-0 flex items-center justify-center">
                                <img class="w-8 sm:w-10 md:w-14 lg:w-16 xl:w-20"
                                    :src="`${baseUrl}/storage/images/translyrics-logo.png`" alt="TransLyrics">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Content Section -->
                <div class="flex-1 text-center md:text-left">
                    <h1 class="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-light">
                        {{ $t('home.welcome') }} Trans<span class="text-blue-500">Lyrics</span>
                    </h1>

                    <div class="space-y-4 text-light text-sm md:text-base">
                        <p class="hidden sm:block">{{ $t('home.welcomeMessageDesktop1') }}</p>

                        <p class="block sm:hidden">{{ $t('home.welcomeMessageMobile1') }}</p>

                        <p class="hidden sm:block">{{ $t('home.welcomeMessageDesktop2') }}</p>

                        <p class="block sm:hidden">{{ $t('home.welcomeMessageMobile2') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const baseUrl = import.meta.env.VITE_BASE_URL;
</script>
