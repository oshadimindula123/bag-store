<template>
  <div
    @click="router.push(`/product/${product.id}`)"
    class="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
  >
    <!-- Product Image -->
    <div class="overflow-hidden h-48">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <span class="text-xs text-amber-500 font-semibold uppercase tracking-wide">
        {{ product.category }}
      </span>
      <h3 class="text-gray-800 dark:text-white font-semibold mt-1 line-clamp-1">
        {{ product.title }}
      </h3>
      <p class="text-gray-500 dark:text-gray-400 text-sm mt-1 line-clamp-2">
        {{ product.description }}
      </p>

      <!-- Price & Rating -->
      <div class="flex items-center justify-between mt-3">
        <span class="text-xl font-bold text-amber-500">${{ product.price }}</span>
        <span class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          ⭐ {{ product.rating }}
        </span>
      </div>

      <!-- Add to Cart Button -->
      <button
        @click.stop="addToCart"
        class="mt-3 w-full py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors duration-200"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import type { Product } from '../types'

const props = defineProps<{ product: Product }>()

const router = useRouter()
const cartStore = useCartStore()

function addToCart() {
  cartStore.addToCart(props.product)
  cartStore.isOpen = true
}
</script>