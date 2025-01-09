<template>
    <!-- Navbar -->
    <Sidebar class="pl-16">

        <!-- Top Bar -->
        <Header />

        <!-- Main -->
        <MainDashboard />

        <!-- Footer -->
        <Footer />

    </Sidebar>

</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import Header from '../components/Header.vue';
import MainDashboard from '../components/dashboard/MainDashboard.vue';
import Footer from '../components/Footer.vue';
</script>