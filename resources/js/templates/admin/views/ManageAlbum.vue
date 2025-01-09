<template>
    <!-- Navbar -->
    <Sidebar class="pl-16">

        <!-- Top Bar -->
        <Header />

        <!-- Main -->
        <AlbumTable />

        <!-- Footer -->
        <Footer />

    </Sidebar>

</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import Header from '../components/Header.vue';
import AlbumTable from '../components/tables/AlbumTable.vue';
import Footer from '../components/Footer.vue';
</script>