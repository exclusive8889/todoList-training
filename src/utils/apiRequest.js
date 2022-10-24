import { signin } from "../stores/slice/authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  const response = await dispatch(signin(user));
  if (signin.fulfilled.match(response)) {
    navigate("/");
  }
};

export const logOut = async () => {
  localStorage.removeItem("persist:user");
  window.location.href = "/sign-in";
};
