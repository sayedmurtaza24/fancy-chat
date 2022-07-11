import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userManagement from "../bloc/userManagement";

const initialState = {
  friends: [],
  showAddFriend: false,
};

const fetchFriendsThunk = createAsyncThunk('auth/fetchFriends', async payload => {
  return await userManagement.fetchAllFriends();
})

const addFriendThunk = createAsyncThunk('auth/addFriend', async (name, thunkAPI) => {
  await userManagement.addFriend(name);
  thunkAPI.dispatch(fetchFriendsThunk());
});

const friendSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    showAddFriendDialog: (state, action) => {
      state.showAddFriend = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchFriendsThunk.fulfilled, (state, action) => {
      state.friends = action.payload.friends;
    });
    builder.addCase(addFriendThunk.fulfilled, (state, action) => {
      state.showAddFriend = false;
    });
  }
});

export { fetchFriendsThunk, addFriendThunk };
export const { showAddFriendDialog } = friendSlice.actions;
export default friendSlice.reducer;