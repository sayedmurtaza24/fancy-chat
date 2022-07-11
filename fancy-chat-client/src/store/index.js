import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import friendReducer from '../slices/friendsSlice';
import callReducer from '../slices/callSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    friends: friendReducer,
    call: callReducer,
  }
})

export default store;