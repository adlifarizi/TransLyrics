<template>
    <!-- Navbar -->
    <Sidebar class="pl-16">

        <!-- Top Bar -->
        <Header />

        <!-- Main -->
        <SongTable />

        <!-- Footer -->
        <Footer />

    </Sidebar>

</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import Header from '../components/Header.vue';
import SongTable from '../components/tables/SongTable.vue';
import Footer from '../components/Footer.vue';
</script>