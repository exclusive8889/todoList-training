import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiClient } from "../../request/request";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currenUser: null,
    },
    error: '',
    errorRegister:''
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
    loginFailed: (state,action) => {
      state.error=action.payload;
    },
    registerFailed:(state,action) => {
      state.errorRegister=action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        console.log("ful");
        state.login.currenUser = action.payload;
      })
      .addCase(signin.rejected, (state, action) => {
        console.log(state);
        // state.error = action.payload;
      });
  },
});

export const signin = createAsyncThunk(
  "cates/signin",
  async (user, { rejectWithValue }) => {
    try {
      const res = await ApiClient.post("/auth/login", user);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const { loginStart, loginFailed, loginSuccess,registerFailed } = authSlice.actions;
export default authSlice;
