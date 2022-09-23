import { ApiClient } from "../request/request";
import { loginFailed, loginSuccess } from "../stores/slice/authSlice";
import { removeAccessToken, handleStorageToken } from "./auth.util";

export const loginUser = async (user, dispatch, navigate) => {
  ApiClient.post("/auth/login", user)
    .then((res) => {
      dispatch(loginSuccess(res.data.data));
      handleStorageToken(res.data.data.accessToken, res.data.data.id);
      navigate("/");
    })
    .catch((error) => {
      dispatch(loginFailed(error.response.data.error.message));
    });
};

export const logout = () => {
  removeAccessToken();
  window.location.href = "/sign-in";
};
