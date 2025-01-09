<template>
    <!-- Navbar -->
    <Sidebar class="pl-16">

        <!-- Top Bar -->
        <Header />

        <!-- Main -->
        <ArtistTable />

        <!-- Footer -->
        <Footer />

    </Sidebar>

</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import Header from '../components/Header.vue';
import ArtistTable from '../components/tables/ArtistTable.vue'
import Footer from '../components/Footer.vue';
</script>