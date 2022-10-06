import { signin, signOut } from "../stores/slice/authSlice";
import { removeAccessToken, handleStorageToken } from "./auth.util";
import { useDispatch } from "react-redux";

export const loginUser = async (user, dispatch, navigate) => {
  const response = await dispatch(signin(user));
  if (signin.fulfilled.match(response)) {
    console.log('request2')
    // handleStorageToken(response.payload.accessToken, response.payload.id);
    navigate("/");
  }
};

export const logout = async () => {
  removeAccessToken();
  window.location.href = "/sign-in";
};
