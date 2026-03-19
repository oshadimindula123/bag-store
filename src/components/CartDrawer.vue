<template>
  <!-- Overlay -->
  <div
    v-if="cartStore.isOpen"
    @click="cartStore.isOpen = false"
    class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
  />

  <!-- Drawer -->
  <div
    :class="cartStore.isOpen ? 'translate-x-0' : 'translate-x-full'"
    class="fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 z-50 shadow-2xl transition-transform duration-300 flex flex-col"
  >
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b dark:border-gray-700">
      <h2 class="text-xl font-bold text-gray-800 dark:text-white">🛒 Your Cart</h2>
      <button
        @click="cartStore.isOpen = false"
        class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
      >
        <span class="text-xl">✕</span>
      </button>
    </div>

    <!-- Empty State -->
    <div
      v-if="cartStore.items.length === 0"
      class="flex-1 flex flex-col items-center justify-center gap-4 text-gray-400"
    >
      <span class="text-6xl">👜</span>
      <p class="text-lg">Your cart is empty</p>
      <button
        @click="cartStore.isOpen = false"
        class="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
      >
        Continue Shopping
      </button>
    </div>

    <!-- Cart Items -->
    <div v-else class="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
      <CartItem
        v-for="item in cartStore.items"
        :key="item.product.id"
        :item="item"
      />
    </div>

    <!-- Footer -->
    <div v-if="cartStore.items.length > 0" class="p-4 border-t dark:border-gray-700">
      <div class="flex justify-between mb-4">
        <span class="text-gray-600 dark:text-gray-300 font-medium">Total</span>
        <span class="text-xl font-bold text-amber-500">
          ${{ cartStore.totalPrice.toFixed(2) }}
        </span>
      </div>
      <button
        @click="cartStore.clearCart()"
        class="w-full py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition"
      >
        Checkout
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart'
import CartItem from './CartItem.vue'

const cartStore = useCartStore()
</script>
