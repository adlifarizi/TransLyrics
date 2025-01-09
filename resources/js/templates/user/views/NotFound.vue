<template>
    <!-- Navbar -->
    <Navbar />

    <!-- Page Not Found -->
    <ErrorComponent type="error" :title="$t('error.pageNotFound')"
        :message="$t('error.pageNotFoundMessage')" />

    <!-- Footer -->
    <Footer/>
    
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import ErrorComponent from '../../shared/ErrorComponent.vue';
</script>
