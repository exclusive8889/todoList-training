export const removeAccessToken = () => {
  localStorage.removeItem("persist:user");
};

export const getTokenStorage = () => {
  const settk = JSON.parse(localStorage.getItem("persist:user"));
  if (!settk) return;
  const accessToken = JSON.parse(settk.auth).accessToken;
  return accessToken;
};
