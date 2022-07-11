import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userManagement from "../bloc/userManagement";

const initialState = {
  showSignup: false,
  isLoggedIn: userManagement.isLoggedIn(),
  username: userManagement.getUsername(),
};

const loginThunk = createAsyncThunk('auth/login', async payload => {
  await userManagement.login(payload.username, payload.password);
  return payload.username;
});

const signupThunk = createAsyncThunk('auth/signup', async payload => {
  await userManagement.signup(payload.email, payload.username, payload.password);
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    showSignupScreen: (state, action) => {
      state.showSignup = action.payload;
    },
    logoutUser: (state) => {
      state.showSignup = false;
      state.username = null;
      state.isLoggedIn = false;
    }
  },
  extraReducers: builder => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload;
    });
    builder.addCase(signupThunk.fulfilled, state => {
      state.showSignup = false;
    });
  }
});

export { loginThunk, signupThunk };
export const { showSignupScreen, logoutUser } = authSlice.actions;
export default authSlice.reducer;