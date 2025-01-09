<template>
    <!-- Navbar -->
    <Sidebar class="pl-16">

        <!-- Top Bar -->
        <Header />

        <!-- Main -->
        <CommentTable />

        <!-- Footer -->
        <Footer />

    </Sidebar>

</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import Header from '../components/Header.vue';
import CommentTable from '../components/tables/CommentTable.vue';
import Footer from '../components/Footer.vue';
</script>