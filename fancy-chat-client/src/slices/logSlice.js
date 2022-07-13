import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import callLogManagement from '../bloc/callLogManagment';

const initialState = {
  logsList: [],
}

export const fetchCallLogs = createAsyncThunk('fetchCallLogs', async () => {
  const response = await callLogManagement.fetchAllCallLogs();
  return response.logs;
});

export const saveCallLog = createAsyncThunk('saveCallLog', async (_, thunkAPI) => {
  await callLogManagement.saveCallLog(callLogManagement.getLastCallLog());
  thunkAPI.dispatch(fetchCallLogs());
});

const logSlice = createSlice({
  name: 'log',
  initialState,
  extraReducers: {
    [fetchCallLogs.fulfilled]: (state, { payload }) => {
      state.logsList = payload;
    },
  }
});

export default logSlice.reducer;