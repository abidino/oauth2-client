export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      githubClientId: process.env.GITHUB_CLIENT_ID,
      callbackUrl: process.env.GITHUB_CALLBACK_URL,
      baseUrl: process.env.BASE_URL,
    },
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET, 
  },
});
