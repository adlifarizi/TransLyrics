<template>
    <footer class="relative w-full bg-dark py-4 px-4 md:px-6 lg:px-8 xl:px-10">

        <!-- Notification -->
        <div v-if="showNotification" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-light text-center px-10 py-6 rounded-lg shadow-lg">
                <p class="text-lg font-semibold text-dark">{{ notificationMessage }}</p>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 justify-between items-start">

            <!-- Brand -->
            <div class="flex flex-row md:flex-col gap-4 items-start">
                <!-- Brand -->
                <div class="flex items-center">
                    <div class="bg-white w-8 sm:w-10 md:w-14 lg:w-16 xl:w-20 rounded-lg shadow-md">
                        <div class="aspect-square relative">
                            <div class="absolute inset-0 flex items-center justify-center">
                                <img class="w-4 md:w-6 lg:w-8 xl:10"
                                    :src="`${baseUrl}/storage/images/translyrics-logo.png`" alt="TransLyrics">
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col ml-2">
                        <p class="text-lg md:text-xl lg:text-2xl font-maven font-bold text-light">
                            Trans<span class="text-blue-500">Lyrics</span>
                        </p>
                        <p class="text-xs md:text-sm font-normal text-light">
                            Explore singable translations
                        </p>
                    </div>
                </div>

                <!-- Social Media -->
                <!-- <div class="flex items-start space-x-4">
                    <a href="#">
                        <i class="fa-brands fa-x-twitter text-xl md:text-2xl lg:text-4xl text-light"></i>
                    </a>
                    <a href="#">
                        <i class="fa-brands fa-instagram text-xl md:text-2xl lg:text-4xl text-light"></i>
                    </a>
                </div> -->
            </div>

            <!-- Navigation -->
            <nav
                class="flex flex-row md:flex-col gap-4 items-center md:items-start justify-center md:justify-start my-6 md:my-0 text-base text-light">
                <a href="/" class="hover:underline">
                    {{ $t('navigation.home') }}
                </a>
                <a href="/artists" class="hover:underline">
                    {{ $t('navigation.artists') }}
                </a>
                <a href="/albums" class="hover:underline">
                    {{ $t('navigation.albums') }}
                </a>
                <a href="/songs" class="hover:underline">
                    {{ $t('navigation.songs') }}
                </a>
                <a href="/about" class="hover:underline">
                    {{ $t('navigation.about') }}
                </a>
            </nav>

            <!-- Forms -->
            <div class="flex flex-col gap-2 items-start">
                <p class="text-base md:text-lg font-medium text-light">
                    {{ $t('footer.commentTitle') }}
                </p>

                <form class="w-full" @submit.prevent="submitComment">
                    <!-- Input Name dan Checkbox -->
                    <div class="mb-2 flex flex-row gap-2">
                        <div class="w-full">
                            <input type="text" id="input-name" v-model="inputName"
                                :placeholder="$t('footer.namePlaceholder')" :disabled="isAnonymousChecked" :class="{
                                    'bg-gray-200': isAnonymousChecked,
                                    'bg-light': !isAnonymousChecked,
                                    'border border-red-500': errorName // Tambahkan efek error
                                }"
                                class="px-3 py-1.5 text-dark text-base rounded focus:outline-none w-full" />
                            <p v-if="errorName" class="text-red-500 text-xs mt-1">{{ errorName }}</p>
                        </div>

                        <div class="flex items-center w-full">
                            <input id="checkbox-anonymous" type="checkbox" v-model="isAnonymousChecked"
                                class="w-4 h-4 text-blue-500 bg-dark rounded cursor-pointer" />
                            <label for="checkbox-anonymous"
                                class="ms-2 text-sm md:text-base font-normal text-light cursor-pointer">
                                {{ $t('footer.sendAsAnonymous') }}
                            </label>
                        </div>
                    </div>

                    <!-- Textarea -->
                    <div class="mb-2">
                        <textarea id="input-comment" rows="2" v-model="inputComment"
                            :placeholder="$t('footer.commentPlaceholder')"
                            class="resize-none px-3 py-1.5 bg-light text-dark text-base rounded w-full focus:outline-none"></textarea>
                    </div>

                    <!-- Button -->
                    <div class="w-full">
                        <button type="submit"
                            class="w-full px-4 py-2 bg-blue-500 text-light text-sm md:text-base text-medium rounded hover:bg-blue-600 focus:outline-none">
                            {{ $t('footer.formSubmit') }}
                        </button>
                    </div>
                </form>

            </div>

        </div>

        <div class="container mx-auto mt-8 pt-4 text-center text-light text-sm">
            © {{ new Date().getFullYear() }} TransLyrics. Developed by Kayoi.
        </div>
    </footer>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';

// Reactive state variables
const baseUrl = import.meta.env.VITE_BASE_URL;
const inputName = ref('');
const isAnonymousChecked = ref(false);
const inputComment = ref('');
const errorName = ref('');
const showNotification = ref(false);
const notificationMessage = ref('');

// Methods
const validateName = () => {
    if (inputName.value.length > 30) {
        errorName.value = "Max 30 characters";
    } else {
        errorName.value = '';
    }
};

const submitComment = async () => {
    // Validasi nama
    if (!isAnonymousChecked.value && inputName.value.length > 30) {
        errorName.value = "Max 30 characters";
        return;
    }

    // Tentukan nama pengirim
    const name = isAnonymousChecked.value ? 'Anonymous' : inputName.value;
    const content = inputComment.value;

    // Validasi input
    if (!content.trim() && !name) {
        return;
    }

    try {
        showNotificationResult('Sending...'); // Assuming this.$t() is replaced with direct message

        // Kirim request ke API
        const response = await axios.post(`${baseUrl}/api/comments`, {
            name,
            content
        });

        if (response.data.success) {
            showNotificationResult('Comment sent successfully'); // Assuming this.$t() is replaced with direct message

            // Reset form
            inputName.value = '';
            inputComment.value = '';
            isAnonymousChecked.value = false;
        }

    } catch (error) {
        // Tangani error
        showNotificationResult('Error sending comment'); // Assuming this.$t() is replaced with direct message
    }
};

const showNotificationResult = (message) => {
    notificationMessage.value = message;
    showNotification.value = true;
    setTimeout(() => {
        showNotification.value = false;
    }, 2000);
};

// Watchers
watch(inputName, validateName);

watch(isAnonymousChecked, (newVal) => {
    if (newVal) {
        inputName.value = 'Anonymous'; // Replace with translated text if necessary
    } else {
        inputName.value = '';
    }
});
</script>
