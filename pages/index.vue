<template>
  <div>
    <h1>Login with GitHub</h1>
    <button @click="redirectToGitHub">Login</button>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

const redirectToGitHub = () => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${
    config.public.githubClientId
  }&redirect_uri=${
    config.public.callbackUrl
  }&scope=read:user user:email&state=${crypto.randomUUID()}`;
  window.location.href = githubAuthUrl;
};
</script>
