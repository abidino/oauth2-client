<template>
  <div>
    <h1>Redirecting...</h1>
  </div>
</template>

<script setup lang="ts">
import { type GitHubUser } from "../types/github";
const route = useRoute();
const navigateTo = useRouter();

onMounted(async () => {
  const code = route.query.code as string;
  const state = route.query.state as string;

  if (!code || !state) {
    console.error("Authorization failed");
    navigateTo.push("/");
    return;
  }

  try {
    // GitHub API'den dönecek yanıtın tipini belirtiyoruz
    const response = await $fetch<GitHubUser>("/api/auth", {
      method: "POST",
      body: { code, state },
    });

    // response artık GitHubUser tipine sahip
    console.log(response);
    navigateTo.push("/");
  } catch (error) {
    console.error("Login failed", error);
    navigateTo.push("/");
  }
});
</script>
