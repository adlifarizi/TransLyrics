<template>
  <div class="bg-light px-6 py-4 flex justify-between">
    <!-- Brand -->
    <a href="/dashboard" class="text-lg md:text-xl lg:text-2xl font-maven font-bold text-dark">
      Trans<span class="text-blue-500">Lyrics</span>
    </a>

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

      <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-full bg-white text-dark rounded-md shadow-lg z-10">
        <button v-for="(language, index) in languages" :key="index" @click="selectLanguage(language.code)"
          class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200">
          {{ language.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

// Refs untuk menyimpan data reaktif
const isDropdownOpen = ref(false);
const selectedLanguage = ref('');
const languages = ref([
  { name: 'English', code: 'en' },
  { name: 'Indonesia', code: 'id' }
]);

// Mengambil instance i18n
const { locale } = useI18n();

// onMounted untuk set bahasa yang sedang aktif
onMounted(() => {
  const currentLang = locale.value; // Ambil bahasa yang sedang aktif
  const currentLanguage = languages.value.find(lang => lang.code === currentLang);
  selectedLanguage.value = currentLanguage ? currentLanguage.name : 'English'; // Set bahasa yang aktif
});

// Fungsi untuk toggle dropdown
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Fungsi untuk memilih bahasa
const selectLanguage = (languageCode) => {
  selectedLanguage.value = languages.value.find(lang => lang.code === languageCode).name;
  locale.value = languageCode; // Mengubah bahasa aktif
  localStorage.setItem('selectedLanguage', languageCode); // Menyimpan pilihan bahasa ke localStorage
  isDropdownOpen.value = false; // Menutup dropdown
};
</script>
