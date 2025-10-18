// Load environment variables from .env file
require('dotenv').config()

const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
const port = 3000 // Our backend will run on port 3000

// Get credentials from .env
const GITHUB_CLIENT_ID = process.env.VITE_GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
const VUE_APP_URL = process.env.VUE_APP_URL

// Enable CORS for our Vue app
app.use(cors({ origin: VUE_APP_URL }))
// Enable parsing JSON bodies
app.use(express.json())

// This is the single endpoint our Vue app will call
app.post('/api/github/callback', async (req, res) => {
  const { code, code_verifier } = req.body

  if (!code) {
    return res.status(400).json({ error: 'No code provided' })
  }

  try {
    // 1. Exchange the code + secret for an access token
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code,
        code_verifier: code_verifier,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )

    const { access_token } = tokenResponse.data
    if (!access_token) {
      throw new Error('Failed to get access token')
    }

    // 2. Use the access token to get the user's data
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })

    // 3. Send the user data and token back to the Vue app
    res.json({
      userData: userResponse.data,
      accessToken: access_token,
    })
  } catch (error) {
    console.error('Backend authentication failed:', error.message)
    res.status(500).json({ error: 'Authentication failed' })
  }
})

app.listen(port, () => {
  console.log(`✅ Backend server listening at http://localhost:${port}`)
})
