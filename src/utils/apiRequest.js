import { signin } from "../stores/slice/authSlice";
import { removeAccessToken } from "./auth.util";

export const loginUser = async (user, dispatch, navigate) => {
  const response = await dispatch(signin(user));
  if (signin.fulfilled.match(response)) {
    navigate("/");
  }
};

export const logout = async () => {
  removeAccessToken();
  window.location.href = "/sign-in";
};
