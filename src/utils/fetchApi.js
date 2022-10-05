import { ApiClient } from "../request/request";

export const loginApi = async (user) => {
  return await ApiClient.post("/auth/login", user)
    .then((response) => response.data.data)
    .catch((error) => {
      return error;
    });
};

export const updatePasswordApi = async (user) => {
  return await ApiClient.patch(`/api/users/${user.id}`, {
    username: user.username,
    newPassword: user.newPassword,
  })
    .then((response) => response.data.data)
    .catch((error) => {
      return error.response;
    });
};

export const registerUser = async (user) => {
  return await ApiClient.post("/auth/register", user)
    .then((response) => response.data.data)
    .catch((error) => {
      return error.response;
    });
};
