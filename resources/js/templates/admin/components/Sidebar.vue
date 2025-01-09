<template>
  <div class="relative min-h-screen w-full overflow-hidden">
    <!-- Sidebar -->
    <div :class="[
      'fixed left-0 top-0 h-screen bg-dark text-light text-center transition-all duration-300 z-50',
      isExpanded ? 'w-48' : 'w-16'
    ]" @click.stop>
      <!-- Hamburger Button -->
      <button @click="toggleSidebar"
        class="px-4 mt-6 bg-dark rounded-md focus:outline-none flex items-center justify-center">
        <i class='bx bx-menu text-2xl text-light hover:text-blue-500'></i>
      </button>

      <!-- Navigation Menu -->
      <nav class="mt-8">
        <div v-for="(item, index) in menuItems" :key="index"
          class="px-4 py-3 cursor-pointer transition-colors duration-200 flex items-center"
          :class="{ 'text-blue-500': isActive(item.route), 'hover:text-blue-500': !isActive(item.route) }">
          <a :href="`${item.route}`" class="flex items-center">
            <span class="text-xl" v-html="item.icon"></span>
            <span :class="[
              'ml-4 whitespace-nowrap transition-opacity duration-300',
              isExpanded ? 'opacity-100' : 'opacity-0 absolute'
            ]">
              {{ item.name }}
            </span>
          </a>
        </div>
      </nav>

      <!-- Logout Button -->
      <div class="absolute bottom-0 left-0 w-full">
        <button @click="logout"
          class="px-4 py-3 mb-3 text-red-500 hover:text-red-600 flex items-center justify-center space-x-2">
          <i class="text-xl fa-solid fa-right-from-bracket"></i>
          <span v-if="isExpanded" class="ml-2">Logout</span>
        </button>
      </div>
    </div>

    <!-- Overlay -->
    <div v-if="isExpanded" class="fixed inset-0 bg-dark bg-opacity-50 z-40" @click="closeSidebar"></div>

    <!-- Main Content -->
    <div class="">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

// Refs untuk menyimpan data reaktif
const isExpanded = ref(false);
const menuItems = ref([
  { name: "Dashboard", icon: "<i class='fa-solid fa-chart-pie'></i>", route: "/dashboard" },
  { name: "Artists", icon: "<i class='fa-solid fa-users'></i>", route: "/admin/artists" },
  { name: "Albums", icon: "<i class='fa-solid fa-record-vinyl'></i>", route: "/admin/albums" },
  { name: "Songs", icon: "<i class='fa-solid fa-music'></i>", route: "/admin/songs" },
  { name: "Comments", icon: "<i class='fa-solid fa-message'></i>", route: "/admin/comments" },
]);

// Mengambil instance dari route dan router
const route = useRoute();
const router = useRouter();

// Computed untuk mendapatkan rute saat ini
const currentRoute = computed(() => route.path);

// Fungsi untuk toggle sidebar
const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value;
};

// Fungsi untuk menutup sidebar
const closeSidebar = () => {
  isExpanded.value = false;
};

// Fungsi untuk memeriksa apakah rute aktif
const isActive = (routePath) => {
  return currentRoute.value === routePath;
};

// Fungsi untuk logout
const logout = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push('/login');
    return;
  }

  try {
    const response = await axios.post('/api/logout', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 && response.data.success) {
      localStorage.removeItem("token");
      router.push('/login');
    }
  } catch (error) {

  }
};
</script>