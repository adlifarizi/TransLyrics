<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
            <h2 class="text-2xl font-semibold text-center text-dark mb-6">Login</h2>

            <!-- Jika sudah login, tampilkan pesan -->
            <div v-if="isLoggedIn">
                <p class="text-center text-dark mb-4">{{ $t('admin.alreadyLogin') }}</p>
                <button @click="goToDashboard"
                    class="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4">
                    {{ $t('admin.goToDashboard') }}
                </button>
                <button @click="logout"
                    class="w-full p-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                    Logout
                </button>
            </div>

            <!-- Jika belum login, tampilkan form login -->
            <form v-else @submit.prevent="login">
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-dark">Email</label>
                    <input type="email" id="email" v-model="email" required placeholder="Enter your email"
                        class="mt-1 p-3 w-full border border-gray-300 text-dark rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-dark">Password</label>
                    <input type="password" id="password" v-model="password" required placeholder="Enter your password"
                        class="mt-1 p-3 w-full border border-gray-300 text-dark rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <!-- Tampilkan pesan error jika ada -->
                <div v-if="errorMessage" class="text-red-500 text-sm mb-4">
                    {{ errorMessage }}
                </div>

                <button type="submit"
                    class="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Login
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Reactive references
const email = ref('');
const password = ref('');
const errorMessage = ref(''); // Menyimpan pesan error login
const isLoggedIn = ref(false); // Status login

// Router instance
const router = useRouter();

// Check if token exists and validate on mounted
onMounted(() => {
    const token = localStorage.getItem('token');
    if (token) {
        axios
            .get('/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.data.success && response.data.data.is_admin) {
                    isLoggedIn.value = true; // Token valid dan user adalah admin
                } else {
                    handleInvalidToken(); // Token tidak valid atau user bukan admin
                }
            })
            .catch(() => {
                handleInvalidToken(); // Token tidak valid
            });
    } else {
        isLoggedIn.value = false; // Tidak ada token
    }
});

// Methods
const login = async () => {
    try {
        const response = await axios.post('/api/login', {
            email: email.value,
            password: password.value,
        });

        if (response.data.success) {
            // Simpan token ke localStorage atau Vuex
            localStorage.setItem('token', response.data.data.token);

            // Redirect ke dashboard atau halaman lain jika login berhasil
            router.push({ name: 'Dashboard' });
        } else {
            errorMessage.value = response.data.message || 'Invalid credentials'; // Tampilkan pesan error
        }
    } catch (error) {
        // Tangani error jika ada masalah dengan request
        if (error.response && error.response.data) {
            errorMessage.value = error.response.data.message || 'An error occurred. Please try again.';
        } else {
            errorMessage.value = 'An error occurred. Please try again.';
        }
    }
};

const goToDashboard = () => {
    // Arahkan ke dashboard
    router.push({ name: 'Dashboard' });
};

const handleInvalidToken = () => {
    localStorage.removeItem('token');
    isLoggedIn.value = false;
};

const logout = async () => {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.post('/api/logout', null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200 && response.data.success) {
            localStorage.removeItem('token');
            isLoggedIn.value = false;
        } else {
            errorMessage.value = 'An error occurred. Please try again.';
        }
    } catch (error) {
        errorMessage.value = 'An error occurred. Please try again.';
    }
};
</script>