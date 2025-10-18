import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface User {
  id: number
  login: string
  name: string
  email: string
  avatar_url: string
  html_url: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!user.value && !!token.value)

  const initializeAuth = () => {
    const storedUser = localStorage.getItem('auth_user')
    const storedToken = localStorage.getItem('auth_token')

    if (storedUser && storedToken) {
      try {
        user.value = JSON.parse(storedUser)
        token.value = storedToken
      } catch (error) {
        console.error('Failed to parse stored auth data:', error)
        clearAuth()
      }
    }
  }

  const setAuth = (userData: User, authToken: string) => {
    user.value = userData
    token.value = authToken

    localStorage.setItem('auth_user', JSON.stringify(userData))
    localStorage.setItem('auth_token', authToken)
  }

  const clearAuth = () => {
    user.value = null
    token.value = null

    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
  }

  const logout = () => {
    clearAuth()
  }

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    initializeAuth,
    setAuth,
    clearAuth,
    logout,
  }
})
