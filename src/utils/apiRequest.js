import { signin, signOut } from "../stores/slice/authSlice";
import { removeAccessToken, handleStorageToken } from "./auth.util";
import { useDispatch } from "react-redux";

export const loginUser = async (user, dispatch, navigate) => {
  const response = await dispatch(signin(user));
  if (signin.fulfilled.match(response)) {
    handleStorageToken(response.payload.accessToken, response.payload.id);
    navigate("/");
  }
};

export const logout = async () => {
  // const dispatch = useDispatch();
  // await dispatch(signOut());
  removeAccessToken();
  window.location.href = "/sign-in";
};
