import { signin } from "../stores/slice/authSlice";
import { removeAccessToken, handleStorageToken } from "./auth.util";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(signin(user))
  .then((response)=>{
    handleStorageToken(response.payload.data.accessToken, response.payload.data.id);
    navigate("/");
  })
  .catch((err)=>{
    console.log(err)
  })
};

export const logout = () => {
  removeAccessToken();
  window.location.href = "/sign-in";
};
