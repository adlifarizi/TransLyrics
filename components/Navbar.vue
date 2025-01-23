<script setup>
import { ref } from 'vue';

// State
const isMobileMenuOpen = ref(false);
const searchQuery = ref('');
const route = useRoute();

// Method to handle search
const goToSearch = () => {
    if (searchQuery.value.trim() !== '') {
        isMobileMenuOpen.value = false;
        navigateTo({
            path: '/search',
            query: { q: searchQuery.value },
        });
    }
};
// Watch route for close mobile menu
watch(() => route.path, () => {
    isMobileMenuOpen.value = false;
});

// Watch route changes to clear search query
watch(() => route.path, (newPath) => {
    if (newPath !== '/search') {
        searchQuery.value = '';
    }
});
</script>

<template>
    <nav class="bg-white text-black px-4 py-5 w-full sticky top-0 z-50">
        <div class="container mx-auto">

            <!-- Main Navigation Container -->
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <div class="flex-shrink-0">
                    <NuxtLink to="/" class="flex items-center">
                        <span class="text-lg md:text-2xl lg:text-4xl font-maven font-bold text-dark">Trans</span>
                        <span class="text-lg md:text-2xl lg:text-4xl font-maven font-bold text-blue-500">Lyrics</span>
                    </NuxtLink>
                </div>

                <!-- Mobile Controls (Menu Button) -->
                <div class="flex items-center lg:hidden">
                    <!-- Mobile Menu Button -->
                    <button @click="isMobileMenuOpen = !isMobileMenuOpen"
                        class="p-2 rounded-md hover:bg-gray-200 focus:outline-none">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Desktop Navigation (Hidden on Mobile) -->
                <div class="hidden lg:flex lg:items-center lg:justify-end lg:flex-1 min-w-0">
                    <!-- Navigation Links -->
                    <div class="flex items-center space-x-1 xl:space-x-4">
                        <div class="flex space-x-1 xl:space-x-4 mr-4">
                            <NuxtLink to="/" :class="[
                                'px-2 xl:px-3 py-2 text-base xl:text-xl font-semibold whitespace-nowrap',
                                $route.path === '/' ? 'text-blue-500' : 'text-dark hover:text-blue-600'
                            ]">
                                Home
                            </NuxtLink>
                            <NuxtLink to="/artists" :class="[
                                'px-2 xl:px-3 py-2 text-base xl:text-xl font-semibold whitespace-nowrap',
                                $route.path === '/artists' ? 'text-blue-500' : 'text-dark hover:text-blue-600'
                            ]">
                                Artists
                            </NuxtLink>
                            <NuxtLink to="/albums" :class="[
                                'px-2 xl:px-3 py-2 text-base xl:text-xl font-semibold whitespace-nowrap',
                                $route.path === '/albums' ? 'text-blue-500' : 'text-dark hover:text-blue-600'
                            ]">
                                Albums
                            </NuxtLink>
                            <NuxtLink to="/songs" :class="[
                                'px-2 xl:px-3 py-2 text-base xl:text-xl font-semibold whitespace-nowrap',
                                $route.path === '/songs' ? 'text-blue-500' : 'text-dark hover:text-blue-600'
                            ]">
                                Songs
                            </NuxtLink>
                        </div>

                        <!-- Search -->
                        <div class="flex items-center space-x-2 xl:space-x-4">
                            <div class="relative w-48 lg:w-64 xl:w-80">
                                <input type="text" v-model="searchQuery" placeholder="search songs, albums, or artists"
                                    class="w-full pl-3 pr-10 py-1.5 border border-dark rounded-md text-sm xl:text-base text-dark focus:outline-none"
                                    @keyup.enter="goToSearch" />
                                <button @click="goToSearch" class="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <i class='bx bx-search'></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div v-if="isMobileMenuOpen"
                class="lg:hidden fixed top-[4.5rem] left-0 right-0 bg-white shadow-lg z-50 p-4">
                <!-- Mobile Search -->
                <div class="relative">
                    <input type="text" v-model="searchQuery" placeholder="search songs, albums, or artists"
                        class="w-full pl-3 pr-10 py-1.5 border border-dark rounded-md text-sm xl:text-base text-dark focus:outline-none"
                        @keyup.enter="goToSearch" />
                    <button  @click="goToSearch" class="absolute inset-y-0 right-0 flex items-center pr-3">
                        <i class='bx bx-search'></i>
                    </button>
                </div>

                <!-- Mobile Navigation -->
                <div class="flex flex-col">
                    <NuxtLink to="/" class="text-dark hover:text-blue-600 px-3 py-1 mt-4 text-lg font-semibold">
                        Home
                    </NuxtLink>
                    <NuxtLink to="/artists" class="text-dark hover:text-blue-600 px-3 py-1 text-lg font-semibold">
                        Artists
                    </NuxtLink>
                    <NuxtLink to="/albums" class="text-dark hover:text-blue-600 px-3 py-1 text-lg font-semibold">
                        Albums
                    </NuxtLink>
                    <NuxtLink to="/songs" class="text-dark hover:text-blue-600 px-3 py-1 text-lg font-semibold">
                        Songs
                    </NuxtLink>
                </div>
            </div>
        </div>
    </nav>

    <!-- Overlay gelap ketika menu mobile terbuka -->
    <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="isMobileMenuOpen = false">
    </div>
</template>