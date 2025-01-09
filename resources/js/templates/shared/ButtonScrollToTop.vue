<template>
    <button @click="scrollToTop"
        class="fixed bottom-4 right-4 w-12 h-12 bg-blue-500 text-light rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition">
        <i class='bx bx-chevron-up text-xl'></i>
    </button>
</template>

<script setup>
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>
