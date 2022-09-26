import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiClient } from "../../request/request";
import { logout } from "../../utils/apiRequest";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
    },
    errorLogin: "",
    errorRegister: "",
    errorChangePassword:"",
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    registerFailed: (state, action) => {
      state.errorRegister = action.payload;
    },
    changePasswordFailed:(state,action)=>{
      state.errorChangePassword = action.payload;
    }
  },
  extraReducers: (buider) => {
    buider
      .addCase(signin.fulfilled, (state, action) => {
        state.login.currentUser = action.payload;
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

export const changePassword = async (user, id, handleClose,dispatch) => {
  await ApiClient.patch(`/api/users/${id}`, user)
    .then((res) => {
      if (res.status === 200) {
        alert("Success");
        handleClose();
        logout();
      }
    })
    .catch((error) => {
      dispatch(changePasswordFailed(error.response.data.error.message));
    });
};

export const { loginStart, loginFailed, loginSuccess, registerFailed,changePasswordFailed } = authSlice.actions;
export default authSlice;
