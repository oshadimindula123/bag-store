<template>
  <div :class="{ 'dark': isDark }">
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <NavBar @toggle-dark="toggleDark" :is-dark="isDark" />
      <RouterView />
      <CartDrawer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import CartDrawer from './components/CartDrawer.vue'

const isDark = ref<boolean>(localStorage.getItem('darkMode') === 'true')

function toggleDark() {
  isDark.value = !isDark.value
  localStorage.setItem('darkMode', String(isDark.value))
}
</script>
