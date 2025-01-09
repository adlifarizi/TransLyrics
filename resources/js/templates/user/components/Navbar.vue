<template>
  <nav class="bg-white text-black px-4 py-5 w-full sticky top-0 z-50">
    <div class="container mx-auto">

      <!-- Main Navigation Container -->
      <div class="flex items-center justify-between">

        <!-- Logo -->
        <div class="flex-shrink-0">
          <a href="/" class="flex items-center">
            <span class="text-2xl md:text-4xl font-maven font-bold text-dark">Trans</span>
            <span class="text-2xl md:text-4xl font-maven font-bold text-blue-500">Lyrics</span>
          </a>
        </div>

        <!-- Mobile Controls (Language + Menu Button) -->
        <div class="flex items-center lg:hidden">
          <!-- Language Selector for Mobile -->
          <div class="relative mr-4">
            <button @click="toggleDropdown"
              class="flex items-center w-36 pl-3 pr-10 py-1.5 border border-dark rounded-md hover:bg-gray-200 whitespace-nowrap focus:outline-none">
              <i class='bx bx-globe text-dark mr-2'></i>
              <span class="text-sm text-dark truncate">{{ selectedLanguage }}</span>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <i class="fa-solid fa-caret-down"></i>
              </div>
            </button>

            <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-40 bg-white text-dark rounded-md shadow-lg z-10">
              <button v-for="(language, index) in languages" :key="index" @click="selectLanguage(language.code)"
                class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200">
                {{ language.name }}
              </button>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <button @click="toggleMobileMenu" class="p-2 rounded-md hover:bg-gray-200 focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Desktop Navigation (Hidden on Mobile) -->
        <div class="hidden lg:flex lg:items-center lg:justify-end lg:flex-1 min-w-0">
          <!-- Navigation Links -->
          <div class="flex items-center space-x-1 xl:space-x-4">
            <div class="flex space-x-1 xl:space-x-4 mr-4">
              <a href="/"
                class=" text-dark hover:text-blue-600 px-2 xl:px-3 py-2 text-base xl:text-xl font-semibold whitespace-nowrap">{{
                  $t('navigation.home') }}</a>
              <a href="/artists"
                class="text-dark hover:text-blue-600 px-2 xl:px-3 py-2 text-base xl:text-xl font-semibold whitespace-nowrap">{{
                  $t('navigation.artists') }}</a>
              <a href="/albums"
                class="text-dark hover:text-blue-600 px-2 xl:px-3 py-2 text-base xl:text-xl font-semibold whitespace-nowrap">{{
                  $t('navigation.albums') }}</a>
              <a href="/songs"
                class="text-dark hover:text-blue-600 px-2 xl:px-3 py-2 text-base xl:text-xl font-semibold whitespace-nowrap">{{
                  $t('navigation.songs') }}</a>
            </div>

            <!-- Search & Language -->
            <div class="flex items-center space-x-2 xl:space-x-4">
              <div class="relative w-48 lg:w-64 xl:w-80">
                <input type="text" v-model="searchQuery" :placeholder="$t('common.searchPlaceholder')"
                  class="w-full pl-3 pr-10 py-1.5 border border-dark rounded-md text-sm xl:text-base text-dark focus:outline-none"
                  @keyup.enter="goToSearch" />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <i class='bx bx-search'></i>
                </div>
              </div>


              <!-- Language Selector -->
              <div class="relative">
                <button @click="toggleDropdown"
                  class="flex items-center w-40 pl-3 pr-10 py-1.5 border border-dark rounded-md hover:bg-gray-200 whitespace-nowrap focus:outline-none">
                  <i class='bx bx-globe text-dark mr-2'></i>
                  <span class="text-sm xl:text-base text-dark truncate">{{ selectedLanguage }}</span>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <i class="fa-solid fa-caret-down text-dark"></i>
                  </div>
                </button>

                <div v-if="isDropdownOpen"
                  class="absolute right-0 mt-2 w-full bg-white text-dark rounded-md shadow-lg z-10">
                  <button v-for="(language, index) in languages" :key="index" @click="selectLanguage(language.code)"
                    class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200">
                    {{ language.name }}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="lg:hidden mt-4 pb-4">

        <!-- Mobile Search -->
        <div class="relative">
          <input type="text" v-model="searchQuery" :placeholder="$t('common.searchPlaceholder')"
            class="w-full pl-3 pr-10 py-1.5 border border-dark rounded-md text-sm xl:text-base text-dark focus:outline-none"
            @keyup.enter="goToSearch" />
          <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <i class='bx bx-search'></i>
          </div>
        </div>

        <!-- Mobile Navigation  -->
        <div class="flex flex-col">
          <a href="/" class="text-dark hover:text-blue-600 px-3 py-1 mt-4 text-lg font-semibold">{{
            $t('navigation.home') }}</a>
          <a href="/artists" class="text-dark hover:text-blue-600 px-3 py-1 text-lg font-semibold">{{
            $t('navigation.artists')
          }}</a>
          <a href="/albums" class="text-dark hover:text-blue-600 px-3 py-1 text-lg font-semibold">{{
            $t('navigation.albums') }}</a>
          <a href="/songs" class="text-dark hover:text-blue-600 px-3 py-1 text-lg font-semibold">{{
            $t('navigation.songs') }}</a>
        </div>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

// State variables
const isDropdownOpen = ref(false);
const isMobileMenuOpen = ref(false);
const selectedLanguage = ref('');
const searchQuery = ref('');

// List of available languages
const languages = [
  { name: 'English', code: 'en' },
  { name: 'Indonesia', code: 'id' }
];

// Use Vue Router and i18n
const router = useRouter();
const { locale } = useI18n();

// Set selected language based on the current locale
onMounted(() => {
  const currentLang = locale.value; // Get the active language
  const currentLanguage = languages.find(lang => lang.code === currentLang);
  selectedLanguage.value = currentLanguage ? currentLanguage.name : 'English';
});

// Methods
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const selectLanguage = (languageCode) => {
  const selected = languages.find(lang => lang.code === languageCode);
  if (selected) {
    selectedLanguage.value = selected.name;
    locale.value = languageCode;
    localStorage.setItem('selectedLanguage', languageCode);
    isDropdownOpen.value = false;
  }
};

const goToSearch = () => {
  if (searchQuery.value.trim() !== '') {
    // Close mobile menu if in mobile
    isMobileMenuOpen.value = false;

    // Navigate to /search with the query parameter
    router.push({
      path: '/search',
      query: { q: searchQuery.value }
    });
  }
};
</script>
