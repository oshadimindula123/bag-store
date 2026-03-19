<template>
  <div class="min-h-screen bg-stone-50 dark:bg-gray-950 flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-light tracking-[6px] uppercase text-gray-900 dark:text-white mb-2">VELOURA</h1>
        <p class="text-xs tracking-[3px] uppercase text-gray-400">Member Login</p>
      </div>
      <div class="bg-white dark:bg-gray-900 p-10 border border-gray-100 dark:border-gray-800">
        <div v-if="errorMsg" class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p class="text-red-500 text-xs tracking-wider">{{ errorMsg }}</p>
        </div>
        <div v-if="successMsg" class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <p class="text-green-500 text-xs tracking-wider">{{ successMsg }}</p>
        </div>
        <div class="space-y-6">
          <div>
            <label class="block text-xs tracking-[2px] uppercase text-gray-500 dark:text-gray-400 mb-2">Username</label>
            <input
              v-model="username"
              type="text"
              placeholder="Enter your username"
              class="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 bg-stone-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm tracking-wider focus:outline-none focus:border-amber-400 transition"
            />
          </div>
          <div>
            <label class="block text-xs tracking-[2px] uppercase text-gray-500 dark:text-gray-400 mb-2">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="Enter your password"
              class="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 bg-stone-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm tracking-wider focus:outline-none focus:border-amber-400 transition"
            />
          </div>
          <button
            @click="handleLogin"
            :disabled="loading"
            class="w-full bg-gray-900 dark:bg-amber-300 text-white dark:text-gray-900 py-4 text-xs tracking-[4px] uppercase hover:bg-amber-300 hover:text-gray-900 transition-all duration-300 disabled:opacity-50"
          >
            {{ loading ? 'Signing In...' : 'Sign In' }}
          </button>
        </div>
        <div class="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
          <p class="text-xs tracking-[2px] uppercase text-gray-400 mb-3">Test Credentials</p>
          <div class="bg-stone-50 dark:bg-gray-800 p-3 space-y-1">
            <p class="text-xs text-gray-500 dark:text-gray-400 tracking-wider">
              Username: <span class="text-gray-900 dark:text-amber-300 font-medium">emilys</span>
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 tracking-wider">
              Password: <span class="text-gray-900 dark:text-amber-300 font-medium">emilyspass</span>
            </p>
          </div>
        </div>
      </div>
      <div class="text-center mt-6">
        <button
          @click="router.push('/')"
          class="text-xs tracking-[2px] uppercase text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
        >
          ← Back to Collection
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

async function handleLogin() {
  if (!username.value || !password.value) {
    errorMsg.value = 'Please enter your username and password'
    return
  }
  loading.value = true
  errorMsg.value = ''
  successMsg.value = ''
  try {
    await authStore.login(username.value, password.value)
    successMsg.value = 'Welcome back! Redirecting...'
    setTimeout(() => {
      router.push('/')
    }, 1500)
  } catch (e) {
    errorMsg.value = 'Invalid username or password. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>