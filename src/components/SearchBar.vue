<template>
  <div class="relative w-full">
    <input
      v-model="query"
      @input="handleSearch"
      type="text"
      placeholder="Search bags..."
      class="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
    />
    <!-- Search Icon -->
    <span class="absolute left-3 top-3.5 text-gray-400">🔍</span>

    <!-- Clear Button -->
    <button
      v-if="query"
      @click="clearSearch"
      class="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition"
    >
      ✕
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['search'])
const query = ref('')

function handleSearch() {
  emit('search', query.value)
}

function clearSearch() {
  query.value = ''
  emit('search', '')
}
</script>