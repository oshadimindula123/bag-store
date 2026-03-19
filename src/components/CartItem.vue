<template>
  <div class="flex gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
    <!-- Product Image -->
    <img
      :src="item.product.thumbnail"
      :alt="item.product.title"
      class="w-16 h-16 object-cover rounded-lg"
    />

    <!-- Product Info -->
    <div class="flex-1">
      <h3 class="text-sm font-semibold text-gray-800 dark:text-white line-clamp-1">
        {{ item.product.title }}
      </h3>
      <p class="text-amber-500 font-bold">${{ item.product.price }}</p>

      <!-- Quantity Controls -->
      <div class="flex items-center gap-2 mt-1">
        <button
          @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
          class="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-amber-400 text-gray-800 dark:text-white flex items-center justify-center transition"
        >
          −
        </button>
        <span class="text-sm font-medium text-gray-800 dark:text-white">
          {{ item.quantity }}
        </span>
        <button
          @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
          class="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-amber-400 text-gray-800 dark:text-white flex items-center justify-center transition"
        >
          +
        </button>
      </div>
    </div>

    <!-- Remove Button -->
    <button
      @click="cartStore.removeFromCart(item.product.id)"
      class="text-gray-400 hover:text-red-500 transition self-start"
    >
      ✕
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '../types'
import { useCartStore } from '../stores/cart'

defineProps<{ item: CartItem }>()

const cartStore = useCartStore()
</script>