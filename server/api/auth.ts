import { GitHubUser } from "../../types/github"; // GitHubUser arayüzünü içe aktarın

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const config = useRuntimeConfig();
  const githubTokenUrl = "https://github.com/login/oauth/access_token";

  const response = await $fetch(githubTokenUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: {
      client_id: config.public.githubClientId,
      client_secret: config.githubClientSecret,
      code: body.code,
      redirect_uri: config.public.callbackUrl,
    },
  });

  if (!response.access_token) {
    throw createError({ statusCode: 400, message: "Invalid token response" });
  }

  // GitHub API'den kullanıcı bilgilerini alıyoruz
  const userInfo: GitHubUser = await $fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${response.access_token}`,
    },
  });

  return userInfo; // response artık GitHubUser tipinde
});
