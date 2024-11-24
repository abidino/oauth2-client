export default defineEventHandler(async (event) => {
  const token = getCookie(event, "access_token");
  if (!token) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const userInfo = await $fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return userInfo;
});
