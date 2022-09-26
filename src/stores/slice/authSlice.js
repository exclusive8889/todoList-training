import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiClient } from "../../request/request";
import { logout } from "../../utils/apiRequest";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currenUser: null,
    },
    errorLogin: "",
    errorRegister: "",
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currenUser = action.payload;
      state.login.error = false;
    },
    registerFailed: (state, action) => {
      state.errorRegister = action.payload;
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(signin.fulfilled, (state, action) => {
        state.login.currenUser = action.payload;
      })
      .addCase(signin.rejected, (state, action) => {
        state.errorLogin = action.payload.message;
      })
      .addCase(signin.pending, (state) => {
        state.login.isFetching = true;
      });
  },
});
export const signin = createAsyncThunk(
  "user/signin",
  async (user, { rejectWithValue }) => {
    try {
      const res = await ApiClient.post("/auth/login", user);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const register = (newUser, navigate, dispatch, changeAuthMode) => {
  ApiClient.post("/auth/register", newUser)
    .then((res) => {
      res.status === 201 ? alert("Success") : alert("failed");
      navigate("/sign-in");
      changeAuthMode();
    })
    .catch((error) => {
      dispatch(registerFailed(error.response.data.error.message));
    });
};

export const changePassword = async (user, id, handleClose) => {
  await ApiClient.patch(`/api/users/${id}`, user)
    .then((res) => {
      if (res.status === 200) {
        alert("Success");
        handleClose();
        logout();
      }
    })
    .catch((err) => {});
};

export const { loginStart, loginFailed, loginSuccess, registerFailed } =
  authSlice.actions;
export default authSlice;
