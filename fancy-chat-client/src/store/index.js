import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import friendReducer from '../slices/friendsSlice';
import callReducer from '../slices/callSlice';
import logsReducer from '../slices/logSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    friends: friendReducer,
    call: callReducer,
    logs: logsReducer,
  }
})

export default store;