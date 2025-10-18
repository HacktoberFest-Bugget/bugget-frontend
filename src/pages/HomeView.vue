<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Enhanced Navigation -->
    <nav class="bg-white shadow-lg border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex items-center space-x-3">
              <div
                class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </div>
              <h1
                class="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
              >
                Bugget
              </h1>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-2">
              <img
                :src="typedUser?.avatar_url"
                :alt="typedUser?.name || typedUser?.login"
                class="h-8 w-8 rounded-full ring-2 ring-white shadow-md"
              />
              <div class="flex flex-col">
                <span class="text-sm font-semibold text-gray-900">{{
                  typedUser?.name || typedUser?.login
                }}</span>
                <span class="text-xs text-gray-500">@{{ typedUser?.login }}</span>
              </div>
            </div>
            <button
              @click="logout"
              class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <svg
                class="w-4 h-4 inline mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- Welcome Section -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {{ typedUser?.name || typedUser?.login }}! 👋
        </h2>
        <p class="text-gray-600">Here's your GitHub profile information</p>
      </div>

      <!-- Profile Card -->
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8">
          <div class="flex items-center space-x-6">
            <img
              :src="typedUser?.avatar_url"
              :alt="typedUser?.name || typedUser?.login"
              class="h-24 w-24 rounded-2xl ring-4 ring-white shadow-2xl"
            />
            <div class="flex-1 text-white">
              <h3 class="text-2xl font-bold mb-2">{{ typedUser?.name || typedUser?.login }}</h3>
              <p class="text-blue-100 mb-4">@{{ typedUser?.login }}</p>
              <p v-if="typedUser?.bio" class="text-blue-100 text-lg mb-4">{{ typedUser.bio }}</p>
              <div class="flex items-center space-x-6">
                <div v-if="typedUser?.location" class="flex items-center space-x-2">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="text-blue-100">{{ typedUser.location }}</span>
                </div>
                <div v-if="typedUser?.company" class="flex items-center space-x-2">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm6 0a2 2 0 114 0 2 2 0 01-4 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="text-blue-100">{{ typedUser.company }}</span>
                </div>
              </div>
            </div>
            <div class="text-right">
              <a
                :href="typedUser?.html_url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
                View Profile
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Repositories -->
        <div
          class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 relative repositories-dropdown"
        >
          <div class="flex items-center justify-between cursor-pointer" @click="toggleRepositories">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Repositories</p>
              <p class="text-3xl font-bold text-gray-900">{{ typedUser?.public_repos || 0 }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                ></path>
              </svg>
            </div>
          </div>

          <!-- Repositories Dropdown -->
          <div
            v-if="showRepositories"
            class="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto w-[600px]"
          >
            <div class="p-4">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-900">Your Repositories</h3>
                <button @click="toggleRepositories" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <!-- Loading State -->
              <div v-if="loadingRepositories" class="flex items-center justify-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span class="ml-3 text-gray-600">Loading repositories...</span>
              </div>

              <!-- Repositories List -->
              <div v-else-if="repositories.length > 0" class="space-y-3">
                <div
                  v-for="repo in repositories"
                  :key="repo.id"
                  class="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div class="flex-1 min-w-0 mr-4">
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center space-x-3">
                        <h4 class="text-base font-semibold text-gray-900">{{ repo.name }}</h4>
                        <span
                          v-if="repo.private"
                          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                        >
                          Private
                        </span>
                        <span
                          v-else
                          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                        >
                          Public
                        </span>
                      </div>
                    </div>
                    <p v-if="repo.description" class="text-sm text-gray-600 mb-3 line-clamp-2">
                      {{ repo.description }}
                    </p>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-6 text-sm text-gray-500">
                        <span v-if="repo.language" class="flex items-center">
                          <div class="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                          <span class="font-medium">{{ repo.language }}</span>
                        </span>
                        <span class="flex items-center">
                          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fill-rule="evenodd"
                              d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0113 14H6a3 3 0 01-3-3V6z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          <span class="font-medium">{{ repo.forks_count }}</span>
                          <span class="ml-1 text-gray-400">forks</span>
                        </span>
                        <span class="flex items-center">
                          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            ></path>
                          </svg>
                          <span class="font-medium">{{ repo.stargazers_count }}</span>
                          <span class="ml-1 text-gray-400">stars</span>
                        </span>
                      </div>
                      <div class="flex items-center text-sm text-gray-500">
                        <svg
                          class="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <span>{{ formatDate(repo.updated_at) }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex-shrink-0">
                    <a
                      :href="repo.html_url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <svg
                        class="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>
                      View Repository
                    </a>
                  </div>
                </div>
              </div>

              <!-- Empty State -->
              <div v-else class="text-center py-8">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  ></path>
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No repositories found</h3>
                <p class="mt-1 text-sm text-gray-500">
                  This user doesn't have any public repositories.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Followers -->
        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Followers</p>
              <p class="text-3xl font-bold text-gray-900">{{ typedUser?.followers || 0 }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg
                class="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Following -->
        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Following</p>
              <p class="text-3xl font-bold text-gray-900">{{ typedUser?.following || 0 }}</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg
                class="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Gists -->
        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Gists</p>
              <p class="text-3xl font-bold text-gray-900">{{ typedUser?.public_gists || 0 }}</p>
            </div>
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg
                class="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Information -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Contact Information -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg
              class="w-5 h-5 mr-2 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            Contact Information
          </h3>
          <div class="space-y-3">
            <div v-if="typedUser?.email" class="flex items-center space-x-3">
              <svg
                class="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              <span class="text-gray-700">{{ typedUser.email }}</span>
            </div>
            <div v-if="typedUser?.blog" class="flex items-center space-x-3">
              <svg
                class="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                ></path>
              </svg>
              <a :href="typedUser.blog" target="_blank" class="text-blue-600 hover:text-blue-800">{{
                typedUser.blog
              }}</a>
            </div>
            <div v-if="typedUser?.twitter_username" class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                />
              </svg>
              <a
                :href="`https://twitter.com/${typedUser.twitter_username}`"
                target="_blank"
                class="text-blue-600 hover:text-blue-800"
                >@{{ typedUser.twitter_username }}</a
              >
            </div>
            <div
              v-if="!typedUser?.email && !typedUser?.blog && !typedUser?.twitter_username"
              class="text-gray-500 italic"
            >
              No contact information available
            </div>
          </div>
        </div>

        <!-- Account Details -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg
              class="w-5 h-5 mr-2 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            Account Details
          </h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Account Type</span>
              <span class="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {{ typedUser?.type || 'User' }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Member Since</span>
              <span class="text-gray-900">{{ formatDate(typedUser?.created_at) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Last Updated</span>
              <span class="text-gray-900">{{ formatDate(typedUser?.updated_at) }}</span>
            </div>
            <div v-if="typedUser?.hireable" class="flex justify-between items-center">
              <span class="text-gray-600">Available for Hire</span>
              <span class="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">Yes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import type { GitHubUser } from '@/types'
import axios from 'axios'

const { user, logout } = useAuth()

// Type assertion to ensure proper typing
const typedUser = user as Readonly<GitHubUser | null>

// Repository interface
interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  private: boolean
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  created_at: string
}

// Repository dropdown state
const showRepositories = ref(false)
const repositories = ref<Repository[]>([])
const loadingRepositories = ref(false)

// Toggle repositories dropdown
const toggleRepositories = async () => {
  showRepositories.value = !showRepositories.value

  // Fetch repositories when opening dropdown
  if (showRepositories.value && repositories.value.length === 0) {
    await fetchRepositories()
  }
}

// Fetch user repositories
const fetchRepositories = async () => {
  if (!typedUser?.login) return

  loadingRepositories.value = true

  try {
    const response = await axios.get(`https://api.github.com/users/${typedUser.login}/repos`, {
      params: {
        sort: 'updated',
        per_page: 20,
        type: 'all', // Include both public and private repos if user has access
      },
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    })

    repositories.value = response.data
  } catch (error) {
    console.error('Failed to fetch repositories:', error)
    repositories.value = []
  } finally {
    loadingRepositories.value = false
  }
}

// Format date helper function
const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'Not available'

  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return 'Invalid date'
  }
}

// Close dropdown when clicking outside
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('.repositories-dropdown')) {
      showRepositories.value = false
    }
  }

  document.addEventListener('click', handleClickOutside)

  // Cleanup
  return () => {
    document.removeEventListener('click', handleClickOutside)
  }
})
</script>
