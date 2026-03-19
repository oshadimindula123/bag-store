<template>
  <main class="bg-stone-50 dark:bg-gray-950 min-h-screen">

    <!-- Hero Section -->
    <div class="bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-6 py-24 text-center">
        <p class="text-amber-300 text-xs tracking-[6px] uppercase mb-4">New Collection 2026</p>
        <h1 class="text-5xl md:text-7xl font-thin tracking-[8px] uppercase mb-6">VELOURA</h1>
        <p class="text-gray-400 text-sm tracking-[3px] uppercase mb-10">Discover our premium bag collection</p>
        <button class="border border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-gray-900 transition-all duration-300 px-10 py-3 text-xs tracking-[4px] uppercase">
          Explore Now
        </button>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div class="max-w-7xl mx-auto">
        <div class="relative max-w-md mx-auto">
          <span class="absolute left-3 top-3 text-gray-400 text-sm">🔍</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search bags..."
            class="w-full pl-9 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 bg-stone-50 dark:bg-gray-800 text-gray-800 dark:text-white text-sm tracking-wider focus:outline-none focus:border-amber-400 transition"
          />
        </div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-7xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto">
        <button
          @click="selectedCategory = ''"
          :class="selectedCategory === '' ? 'bg-gray-900 text-white dark:bg-amber-300 dark:text-gray-900' : 'text-gray-500 dark:text-gray-400'"
          class="px-5 py-2 text-xs tracking-[2px] uppercase whitespace-nowrap transition border border-transparent hover:border-gray-300"
        >
          All
        </button>
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="selectedCategory === category ? 'bg-gray-900 text-white dark:bg-amber-300 dark:text-gray-900' : 'text-gray-500 dark:text-gray-400'"
          class="px-5 py-2 text-xs tracking-[2px] uppercase whitespace-nowrap transition border border-transparent hover:border-gray-300 capitalize"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- Product Count -->
    <div class="max-w-7xl mx-auto px-6 py-4">
      <p class="text-xs text-gray-400 tracking-[2px] uppercase">
        {{ filteredProducts.length }} pieces
      </p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex flex-col justify-center items-center py-32 gap-4">
      <div class="w-8 h-8 border-2 border-amber-300 border-t-transparent rounded-full animate-spin"></div>
      <p class="text-xs tracking-[3px] uppercase text-gray-400">Loading Collection...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-32">
      <p class="text-gray-400 text-sm mb-6">{{ error }}</p>
      <button
        @click="fetchProducts"
        class="border border-gray-900 text-gray-900 px-8 py-3 text-xs tracking-[3px] uppercase hover:bg-gray-900 hover:text-white transition"
      >
        Try Again
      </button>
    </div>

    <!-- Empty -->
    <div v-else-if="filteredProducts.length === 0" class="text-center py-32">
      <p class="text-4xl mb-4">👜</p>
      <p class="text-xs tracking-[3px] uppercase text-gray-400">No pieces found</p>
    </div>

    <!-- Product Grid -->
    <div v-else class="max-w-7xl mx-auto px-6 pb-16">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-gray-200 dark:bg-gray-800">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>

  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProducts } from '../composables/useProducts'
import ProductCard from '../components/ProductCard.vue'

const { products, loading, error, fetchProducts } = useProducts()

const searchQuery = ref('')
const selectedCategory = ref('')

const categories = computed(() => {
  const cats = products.value.map(p => p.category)
  return [...new Set(cats)]
})

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
    const matchesCategory =
      selectedCategory.value === '' ||
      product.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

onMounted(() => {
  fetchProducts()
})
</script>