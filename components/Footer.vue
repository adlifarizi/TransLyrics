<script setup>
// Composables
const { submitComment } = useComments();

// Reactive state using ref
const form = reactive({
    name: '',
    content: '',
    isAnonymous: false
});

const showNotification = ref(false);
const notificationMessage = ref('');

const formErrors = reactive({
    name: '',
});

const currentYear = computed(() => new Date().getFullYear());

// Watch for changes
watch(() => form.name, validateName);
watch(() => form.isAnonymous, (newVal) => {
    if (newVal) {
        form.name = 'Anonymous';
    } else {
        form.name = '';
    }
});

// Methods
function validateName() {
    if (form.name.length > 30) {
        formErrors.name = 'Max 30 characters';
        return false;
    }
    formErrors.name = '';
    return true;
}

async function handleSubmit() {
    if (!validateName()) return;

    try {
        showNotificationResult('Sending...');

        const success = await submitComment({
            name: form.isAnonymous ? 'Anonymous' : form.name,
            content: form.content
        });

        if (success) {
            showNotificationResult('Comment sent successfully');
            // Reset form
            form.name = '';
            form.content = '';
            form.isAnonymous = false;
        }
    } catch (error) {
        showNotificationResult('an unknown error occurred');
    }
}

const showNotificationResult = (message) => {
    notificationMessage.value = message;
    showNotification.value = true;
    setTimeout(() => {
        showNotification.value = false;
    }, 2000);
};
</script>

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
                <div class="flex items-center">
                    <div class="bg-white w-8 sm:w-10 md:w-14 lg:w-16 xl:w-20 rounded-lg shadow-md">
                        <div class="aspect-square relative">
                            <div class="absolute inset-0 flex items-center justify-center">
                                <img class="w-4 md:w-6 lg:w-8 xl:10" src="~/assets/images/translyrics-logo.png"
                                    alt="TransLyrics" />
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col ml-2">
                        <p class="text-lg md:text-xl lg:text-2xl font-maven font-bold text-light">
                            Trans<span class="text-blue-500">Lyrics</span>
                        </p>
                        <p class="text-xs md:text-sm font-normal text-light">
                            Explore lyrics translations
                        </p>
                    </div>
                </div>
            </div>

            <!-- Navigation -->
            <nav
                class="flex flex-row md:flex-col gap-4 items-center md:items-start justify-center md:justify-start my-6 md:my-0 text-base text-light">
                <NuxtLink to="/" class="hover:underline">
                    Home
                </NuxtLink>
                <NuxtLink to="/artists" class="hover:underline">
                    Artists
                </NuxtLink>
                <NuxtLink to="/albums" class="hover:underline">
                    Albums
                </NuxtLink>
                <NuxtLink to="/songs" class="hover:underline">
                    Songs
                </NuxtLink>
                <NuxtLink to="/about" class="hover:underline">
                    About
                </NuxtLink>
            </nav>

            <!-- Forms -->
            <div class="flex flex-col gap-2 items-start">
                <p class="text-base md:text-lg font-medium text-light">
                    Comment or request translyrics
                </p>

                <form class="w-full" @submit.prevent="handleSubmit">
                    <!-- Input Name dan Checkbox -->
                    <div class="mb-2 flex flex-row gap-2">
                        <div class="w-full">
                            <input type="text" id="input-name" v-model="form.name"
                                placeholder="name" :disabled="form.isAnonymous" :class="{
                                    'bg-gray-200': form.isAnonymous,
                                    'bg-light': !form.isAnonymous,
                                    'border border-red-500': formErrors.name
                                }" class="px-3 py-1.5 text-dark text-base rounded focus:outline-none w-full" />
                            <p v-if="formErrors.name" class="text-red-500 text-xs mt-1">{{ formErrors.name }}</p>
                        </div>

                        <div class="flex items-center w-full">
                            <input id="checkbox-anonymous" type="checkbox" v-model="form.isAnonymous"
                                class="w-4 h-4 text-blue-500 bg-dark rounded cursor-pointer" />
                            <label for="checkbox-anonymous"
                                class="ms-2 text-sm md:text-base font-normal text-light cursor-pointer">
                                send as Anonymous
                            </label>
                        </div>
                    </div>

                    <!-- Textarea -->
                    <div class="mb-2">
                        <textarea id="input-comment" rows="2" v-model="form.content"
                            placeholder="comment/request"
                            class="resize-none px-3 py-1.5 bg-light text-dark text-base rounded w-full focus:outline-none"></textarea>
                    </div>

                    <!-- Button -->
                    <div class="w-full">
                        <button type="submit"
                            class="w-full px-4 py-2 bg-blue-500 text-light text-sm md:text-base text-medium rounded hover:bg-blue-600 focus:outline-none">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div class="container mx-auto mt-8 pt-4 text-center text-light text-sm">
            © {{ currentYear }} TransLyrics. Developed by Kayoi.
        </div>
    </footer>
</template>