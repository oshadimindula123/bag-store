<template>
  <div class="bg-stone-50 dark:bg-gray-950 min-h-screen">

    <!-- Back Button -->
    <div class="max-w-7xl mx-auto px-6 py-6">
      <button
        @click="router.push('/')"
        class="text-xs tracking-[3px] uppercase text-gray-500 hover:text-gray-900 dark:hover:text-white transition flex items-center gap-2"
      >
        ← Back to Collection
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex flex-col justify-center items-center py-32 gap-4">
      <div class="w-8 h-8 border-2 border-amber-300 border-t-transparent rounded-full animate-spin"></div>
      <p class="text-xs tracking-[3px] uppercase text-gray-400">Loading...</p>
    </div>

    <!-- Product Detail -->
    <div v-else-if="product" class="max-w-7xl mx-auto px-6 pb-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">

        <!-- Left: Images -->
        <div class="space-y-3">
          <!-- Main Image -->
          <div class="bg-stone-100 dark:bg-gray-800 aspect-square overflow-hidden">
            <img
              :src="selectedImage"
              :alt="product.title"
              class="w-full h-full object-cover"
            />
          </div>
          <!-- Thumbnail Images -->
          <div class="grid grid-cols-4 gap-2">
            <div
              v-for="(image, index) in product.images"
              :key="index"
              @click="selectedImage = image"
              :class="selectedImage === image ? 'ring-2 ring-amber-400' : ''"
              class="bg-stone-100 dark:bg-gray-800 aspect-square overflow-hidden cursor-pointer"
            >
              <img :src="image" :alt="`Image ${index}`" class="w-full h-full object-cover hover:scale-105 transition duration-300" />
            </div>
          </div>
        </div>

        <!-- Right: Info -->
        <div class="flex flex-col justify-center">
          <p class="text-gray-400 text-xs tracking-[3px] uppercase mb-2">{{ product.category }}</p>
          <h1 class="text-3xl font-thin tracking-[3px] uppercase text-gray-900 dark:text-white mb-4">
            {{ product.title }}
          </h1>

          <!-- Rating -->
          <div class="flex items-center gap-2 mb-6">
            <div class="flex">
              <span v-for="i in 5" :key="i" class="text-amber-400 text-sm">
                {{ i <= Math.round(product.rating) ? '★' : '☆' }}
              </span>
            </div>
            <span class="text-gray-400 text-xs tracking-wider">{{ product.rating }} / 5</span>
          </div>

          <!-- Price -->
          <div class="flex items-center gap-4 mb-6">
            <span class="text-3xl font-light text-gray-900 dark:text-amber-300 tracking-wider">
              ${{ product.price.toFixed(2) }}
            </span>
            <span
              v-if="product.discountPercentage > 0"
              class="bg-gray-900 text-white text-xs px-3 py-1 tracking-widest uppercase"
            >
              -{{ Math.round(product.discountPercentage) }}%
            </span>
          </div>

          <!-- Description -->
          <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed tracking-wide mb-8">
            {{ product.description }}
          </p>

          <!-- Stock -->
          <p class="text-xs tracking-[2px] uppercase mb-6"
            :class="product.stock > 10 ? 'text-green-500' : 'text-red-400'"
          >
            {{ product.stock > 10 ? 'In Stock' : `Only ${product.stock} left` }}
          </p>

          <!-- Add to Cart -->
          <button
            @click="addToCart"
            class="w-full bg-gray-900 dark:bg-amber-300 text-white dark:text-gray-900 py-4 text-xs tracking-[4px] uppercase hover:bg-amber-300 hover:text-gray-900 dark:hover:bg-amber-400 transition-all duration-300"
          >
            Add to Bag
          </button>

          <!-- Extra Info -->
          <div class="mt-8 border-t border-gray-200 dark:border-gray-800 pt-6 space-y-3">
            <div class="flex justify-between text-xs tracking-wider text-gray-500">
              <span class="uppercase">Brand</span>
              <span class="text-gray-900 dark:text-white">{{ product.brand }}</span>
            </div>
            <div class="flex justify-between text-xs tracking-wider text-gray-500">
              <span class="uppercase">Category</span>
              <span class="text-gray-900 dark:text-white capitalize">{{ product.category }}</span>
            </div>
            <div class="flex justify-between text-xs tracking-wider text-gray-500">
              <span class="uppercase">Stock</span>
              <span class="text-gray-900 dark:text-white">{{ product.stock }} units</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="text-center py-32">
      <p class="text-xs tracking-[3px] uppercase text-gray-400">Product not found</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProducts } from '../composables/useProducts'
import { useCartStore } from '../stores/cart'
import type { Product } from '../types'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const { loading, fetchProductById } = useProducts()

const product = ref<Product | null>(null)
const selectedImage = ref<string>('')

onMounted(async () => {
  const id = Number(route.params.id)
  product.value = await fetchProductById(id)
  if (product.value) {
    selectedImage.value = product.value.thumbnail
  }
})

function addToCart() {
  if (product.value) {
    cartStore.addToCart(product.value)
    cartStore.isOpen = true
  }
}
</script>