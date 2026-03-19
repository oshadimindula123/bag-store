import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AuthUser } from '../types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const isLoggedIn = ref<boolean>(!!localStorage.getItem('token'))

  async function login(username: string, password: string) {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })

    if (!response.ok) throw new Error('Invalid credentials')

    const data: AuthUser = await response.json()
    user.value = data
    token.value = data.token
    isLoggedIn.value = true
    localStorage.setItem('token', data.token)
  }

  function logout() {
    user.value = null
    token.value = null
    isLoggedIn.value = false
    localStorage.removeItem('token')
  }

  return { user, token, isLoggedIn, login, logout }
})