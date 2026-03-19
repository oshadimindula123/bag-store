import { ref } from 'vue'
import type { Product, ProductsResponse } from '../types'

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  async function fetchProducts() {
    loading.value = true
    error.value = null
    try {
      const [womensBags, mensBags, luggage] = await Promise.all([
        fetch('https://dummyjson.com/products/category/womens-bags').then(r => r.json()),
        fetch('https://dummyjson.com/products/category/mens-bags').then(r => r.json()),
        fetch('https://dummyjson.com/products/category/luggage').then(r => r.json()),
      ])

      products.value = [
        ...(womensBags.products || []),
        ...(mensBags.products || []),
        ...(luggage.products || []),
      ]
    } catch (e) {
      error.value = 'Failed to load products. Please try again.'
    } finally {
      loading.value = false
    }
  }

  async function fetchProductById(id: number): Promise<Product | null> {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`)
      if (!response.ok) throw new Error('Product not found')
      const data: Product = await response.json()
      return data
    } catch (e) {
      error.value = 'Failed to load product.'
      return null
    } finally {
      loading.value = false
    }
  }

  async function searchProducts(query: string) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${query}`)
      if (!response.ok) throw new Error('Search failed')
      const data: ProductsResponse = await response.json()
      products.value = data.products
    } catch (e) {
      error.value = 'Search failed. Please try again.'
    } finally {
      loading.value = false
    }
  }

  return { products, loading, error, fetchProducts, fetchProductById, searchProducts }
}