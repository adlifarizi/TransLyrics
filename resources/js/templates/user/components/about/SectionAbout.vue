<template>
    <section class="relative w-full py-8 px-8 sm:px-10 md:px-12 lg:px-14 xl:px-16">
        <div class="container">
            <div class="flex flex-col md:flex-row items-start gap-8 md:gap-12">

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
                <div class="flex-1 text-left md:text-left">
                    <!-- About TransLyrics -->
                    <h1 class="text-xl md:text-2xl lg:text-3xl font-bold mb-1 text-dark">
                        {{ $t('about.aboutTranslyrics.title') }}
                    </h1>
                    <p class="text-base md:text-lg mb-6 text-dark">
                        {{ $t('about.aboutTranslyrics.content') }}
                    </p>

                    <!-- Our Mission -->
                    <h2 class="text-xl md:text-2xl lg:text-3xl font-semibold mb-1 text-dark">
                        {{ $t('about.ourMission.title') }}
                    </h2>
                    <p class="text-base md:text-lg mb-6 text-dark">
                        {{ $t('about.ourMission.content') }}
                    </p>

                    <!-- Why Translyrics (Bullet Points) -->
                    <h2 class="text-xl md:text-2xl lg:text-3xl font-semibold mb-1 text-dark">
                        {{ $t('about.whyTranslyrics.title') }}
                    </h2>

                    <ul class="list-disc pl-6 mb-6">
                        <!-- Why TransLyrics - Singable Translations -->
                        <li class="mb-4">
                            <h3 class="text-base md:text-lg font-medium text-dark">
                                {{ $t('about.whyTranslyrics.subSections[0].subtitle') }}
                            </h3>
                            <p class="text-base md:text-lg text-dark">
                                {{ $t('about.whyTranslyrics.subSections[0].content') }}
                            </p>
                        </li>

                        <!-- Why TransLyrics - Multilingual -->
                        <li class="mb-4">
                            <h3 class="text-base md:text-lg font-medium text-dark">
                                {{ $t('about.whyTranslyrics.subSections[1].subtitle') }}
                            </h3>
                            <p class="text-base md:text-lg text-dark">
                                {{ $t('about.whyTranslyrics.subSections[1].content') }}
                            </p>
                        </li>

                        <!-- Why TransLyrics - Emotionally True -->
                        <li class="mb-4">
                            <h3 class="text-base md:text-lg font-medium text-dark">
                                {{ $t('about.whyTranslyrics.subSections[2].subtitle') }}
                            </h3>
                            <p class="text-base md:text-lg text-dark">
                                {{ $t('about.whyTranslyrics.subSections[2].content') }}
                            </p>
                        </li>
                    </ul>

                    <!-- About the Creator -->
                    <h2 class="text-xl md:text-2xl lg:text-3xl font-semibold mb-1 text-dark">
                        {{ $t('about.aboutCreator.title') }}
                    </h2>
                    <p class="text-base md:text-lg text-dark">
                        {{ $t('about.aboutCreator.content') }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const baseUrl = import.meta.env.VITE_BASE_URL;
</script>
