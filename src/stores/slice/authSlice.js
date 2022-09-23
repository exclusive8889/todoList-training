import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currenUser: null,
    },
    errorLogin: '',
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
      state.errorLogin=action.payload;
    },
    registerFailed:(state,action) => {
      state.errorRegister=action.payload;
    },
  },
});

export const { loginStart, loginFailed, loginSuccess,registerFailed } = authSlice.actions;
export default authSlice;
