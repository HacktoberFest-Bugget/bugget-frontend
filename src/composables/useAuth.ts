import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useAuth = () => {
  const authStore = useAuthStore()
  const router = useRouter()

  const loginWithGitHub = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID
    const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI

    if (!clientId) {
      console.error('GitHub Client ID not configured')
      return
    }

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user:email`

    window.location.href = githubAuthUrl
  }

  const handleAuthCallback = async (code: string) => {
    authStore.isLoading = true

    try {
      // For frontend-only OAuth, we'll use a public GitHub OAuth app
      // This approach doesn't require a client secret
      const response = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
          code: code,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )

      const tokenData = response.data

      if (tokenData.access_token) {
        // Fetch user data from GitHub
        const userResponse = await axios.get('https://api.github.com/user', {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        })

        const userData = userResponse.data

        authStore.setAuth(userData, tokenData.access_token)
        router.push('/')
      } else {
        throw new Error('Failed to get access token')
      }
    } catch (error) {
      console.error('Authentication failed:', error)
      authStore.clearAuth()
    } finally {
      authStore.isLoading = false
    }
  }

  const logout = () => {
    authStore.logout()
    router.push('/login')
  }

  return {
    loginWithGitHub,
    handleAuthCallback,
    logout,
    user: authStore.user,
    isAuthenticated: authStore.isAuthenticated,
    isLoading: authStore.isLoading,
  }
}
