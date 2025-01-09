<template>
    <!-- Navbar -->
    <Navbar/>

    <!-- Artist List -->
     <SectionArtistList/>

    <!-- Footer -->
    <Footer/>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import SectionArtistList from '../components/artists/SectionArtistList.vue';
import Footer from '../components/Footer.vue';
</script>