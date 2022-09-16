import { ApiClient } from "../request/request";
import { loginFailed, loginSuccess } from "../stores/slice/authSlice";
import { removeAccessToken, handleStorageToken } from "./auth.util";
import { signin } from "../stores/slice/authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  ApiClient.post("/auth/login", user)
    .then((res) => {
      dispatch(loginSuccess(res.data));
      handleStorageToken(res.data.token, res.data.id);
      navigate("/");
    })
    .catch((error) => {
      dispatch(loginFailed(error.response.data.message));
    });
};

export const logout = () => {
  removeAccessToken();
  window.location.href = "/sign-in";
};
