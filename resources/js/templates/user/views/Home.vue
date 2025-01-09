<template>
    <!-- Navbar -->
    <Navbar />

    <!-- Hero -->
    <SectionHero />

    <!-- Featured Artist -->
    <SectionFeaturedArtists />

    <!-- Newly Added -->
    <SectionNewlyAdded />

    <!-- Section CTA -->
    <SectionCTA />

    <!-- Footer -->
    <Footer />
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import SectionHero from '../components/home/SectionHero.vue';
import SectionFeaturedArtists from '../components/home/SectionFeaturedArtists.vue';
import SectionNewlyAdded from '../components/home/SectionNewlyAdded.vue';
import SectionCTA from '../components/home/SectionCTA.vue';
import Footer from '../components/Footer.vue';
</script>
