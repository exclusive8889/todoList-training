export const getTokenStorage = () => {
  const token = JSON.parse(localStorage.getItem("persist:user"));
  if (!token) return;
  const accessToken = JSON.parse(token.auth).accessToken;
  return accessToken;
};
