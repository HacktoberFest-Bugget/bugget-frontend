import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import axios from 'axios'
import type { GitHubUser } from '@/types'

// Type guard to validate GitHubUser structure
const isValidGitHubUser = (user: unknown): user is GitHubUser => {
  return (
    user !== null &&
    typeof user === 'object' &&
    'login' in user &&
    'id' in user &&
    'avatar_url' in user &&
    'html_url' in user &&
    typeof (user as Record<string, unknown>).login === 'string' &&
    typeof (user as Record<string, unknown>).id === 'number' &&
    typeof (user as Record<string, unknown>).avatar_url === 'string' &&
    typeof (user as Record<string, unknown>).html_url === 'string'
  )
}

// --- These helper functions are still needed for the frontend ---
const generateCodeVerifier = () => {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return btoa(String.fromCharCode.apply(null, Array.from(array)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

const generateCodeChallenge = async (verifier: string) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(verifier)
  // CORRECTED: 'SHA-256'
  const digest = await crypto.subtle.digest('SHA-256', data)
  return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(digest))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}
export const useAuth = () => {
  const authStore = useAuthStore()
  const router = useRouter()

  // This function STAYS THE SAME
  const loginWithGitHub = async () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID
    const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI

    if (!clientId) {
      console.error('GitHub Client ID not configured')
      return
    }

    const codeVerifier = generateCodeVerifier()
    const codeChallenge = await generateCodeChallenge(codeVerifier)
    sessionStorage.setItem('github_code_verifier', codeVerifier)

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri!,
    )}&scope=user:email&code_challenge=${codeChallenge}&code_challenge_method=S256`

    window.location.href = githubAuthUrl
  }

  // --- THIS FUNCTION IS THE MAIN CHANGE ---
  const handleAuthCallback = async (code: string) => {
    authStore.isLoading = true

    try {
      if (!code || typeof code !== 'string') {
        throw new Error('Invalid authorization code received')
      }

      const codeVerifier = sessionStorage.getItem('github_code_verifier')
      if (!codeVerifier) {
        throw new Error('Code verifier not found - please try logging in again')
      }

      // Call YOUR backend, not GitHub's
      const response = await axios.post(
        'http://localhost:3000/api/github/callback', // Your new backend endpoint
        {
          code: code,
          code_verifier: codeVerifier,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000, // 10 second timeout
        },
      )

      // Validate response structure
      if (!response.data) {
        throw new Error('No response data received from server')
      }

      const { userData, accessToken } = response.data

      // Validate userData structure using type guard
      if (!isValidGitHubUser(userData)) {
        throw new Error('Invalid or incomplete user data received from server')
      }

      // Validate access token
      if (!accessToken || typeof accessToken !== 'string') {
        throw new Error('Invalid access token received from server')
      }

      // userData is now guaranteed to be a valid GitHubUser
      const githubUser: GitHubUser = userData

      console.log('Successfully authenticated user:', githubUser.login)

      authStore.setAuth(githubUser, accessToken)
      sessionStorage.removeItem('github_code_verifier')
      router.push('/')
    } catch (error) {
      console.error('Authentication failed:', error)

      // Provide user-friendly error messages
      let errorMessage = 'Authentication failed'
      if (error instanceof Error) {
        if (error.message.includes('timeout')) {
          errorMessage = 'Request timed out. Please try again.'
        } else if (error.message.includes('Network Error')) {
          errorMessage = 'Network error. Please check your connection and try again.'
        } else if (error.message.includes('404')) {
          errorMessage = 'Server not found. Please contact support.'
        } else if (error.message.includes('500')) {
          errorMessage = 'Server error. Please try again later.'
        } else {
          errorMessage = error.message
        }
      }

      // Show error to user (you might want to use a toast notification here)
      alert(errorMessage)

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
    user: authStore.user as Readonly<GitHubUser | null>,
    isAuthenticated: authStore.isAuthenticated,
    isLoading: authStore.isLoading,
  }
}
