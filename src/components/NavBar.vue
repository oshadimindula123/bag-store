<template>
  <nav class="bg-white dark:bg-black border-b border-gray-100 dark:border-gray-900 sticky top-0 z-50">

    <!-- Top Bar -->
    <div class="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">

      <!-- Left Nav Links -->
      <div class="hidden lg:flex items-center gap-8">
        <RouterLink to="/" class="text-xs tracking-[3px] uppercase text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
          Women
        </RouterLink>
        <RouterLink to="/" class="text-xs tracking-[3px] uppercase text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
          Men
        </RouterLink>
        <RouterLink to="/" class="text-xs tracking-[3px] uppercase text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
          New In
        </RouterLink>
      </div>

      <!-- Center Logo -->
      <RouterLink to="/" class="absolute left-1/2 -translate-x-1/2">
        <span class="text-2xl font-light tracking-[8px] uppercase text-black dark:text-white">
          VELOURA
        </span>
      </RouterLink>

      <!-- Right Actions -->
      <div class="flex items-center gap-6 ml-auto">

        <!-- Search -->
        <button class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
          </svg>
        </button>

        <!-- Dark Mode -->
        <button
          @click="$emit('toggle-dark')"
          class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
        >
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>

        <!-- Login -->
        <RouterLink
          v-if="!authStore.isLoggedIn"
          to="/login"
          class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
          </svg>
        </RouterLink>
        <button
          v-else
          @click="authStore.logout()"
          class="text-xs tracking-[2px] uppercase text-gray-600 dark:text-gray-300 hover:text-black transition"
        >
          Logout
        </button>

        <!-- Cart -->
        <button
          @click="cartStore.isOpen = true"
          class="relative text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span
            v-if="cartStore.totalItems > 0"
            class="absolute -top-2 -right-2 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full w-4 h-4 flex items-center justify-center"
          >
            {{ cartStore.totalItems }}
          </span>
        </button>

      </div>
    </div>

    <!-- Bottom Category Bar -->
    <div class="border-t border-gray-100 dark:border-gray-900">
      <div class="max-w-screen-xl mx-auto px-6 py-2 flex items-center gap-8 overflow-x-auto">
        <button
          @click="$emit('filter', '')"
          class="text-xs tracking-[2px] uppercase whitespace-nowrap text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition pb-1 border-b-2 border-transparent hover:border-black dark:hover:border-white"
        >
          All Bags
        </button>
        <button
          class="text-xs tracking-[2px] uppercase whitespace-nowrap text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition pb-1 border-b-2 border-transparent hover:border-black"
        >
          Womens Bags
        </button>
        <button
          class="text-xs tracking-[2px] uppercase whitespace-nowrap text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition pb-1 border-b-2 border-transparent hover:border-black"
        >
          Mens Bags
        </button>
        <button
          class="text-xs tracking-[2px] uppercase whitespace-nowrap text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition pb-1 border-b-2 border-transparent hover:border-black"
        >
          Luggage
        </button>
        <button
          class="text-xs tracking-[2px] uppercase whitespace-nowrap text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition pb-1 border-b-2 border-transparent hover:border-black"
        >
          New In
        </button>
      </div>
    </div>

  </nav>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

defineProps<{ isDark: boolean }>()
defineEmits(['toggle-dark', 'filter'])

const cartStore = useCartStore()
const authStore = useAuthStore()
</script>