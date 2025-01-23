<script setup>
defineProps(["error"])

function handleClearError() {
    clearError({ redirect: "/" })
}
</script>


<template>
    <Navbar />

    <div class="flex items-center justify-center h-[90vh] bg-gray-50">
        <div class="text-center px-4">
            <!-- Icon -->
            <div class="mb-8">
                <div class="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-red-200">
                    <svg class="h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </div>
            </div>

            <!-- Status Code -->
            <h1 class="text-3xl font-bold text-dark mb-4">Error {{ error.statusCode }}</h1>

            <!-- Message -->
            <p class="text-lg text-dark mb-4">{{ error.message }}</p>

            <!-- Button -->
            <button @click="handleClearError" class="bg-blue-700 hover:bg-blue-800 font-medium text-light p-2 rounded-lg transition duration-200 whitespace-nowrap">
                Back to home
            </button>
        </div>
    </div>

    <Footer />
    <ButtonScrollToTop />
</template>