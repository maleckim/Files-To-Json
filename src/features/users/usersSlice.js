import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUsers } from './checkUsers';

const initialState = {
  user: [],
  userData: [],
  status: 'idle',
};

export const findUser = createAsyncThunk('firebase/user', async (res) => {
  const response = await checkUsers(res);

  return response;
});

export const userSlice = createSlice({
  name: 'users',
  initialState,

  reducers: {
    setCurrentFolder: (state, action) => {
      state.currentFolder = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(findUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(findUser.fulfilled, (state, action) => {
        state.user = [...state.user, action.meta.arg];
        state.userData = [...state.userData, action.payload];
        state.status = 'idle';
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const viewUser = (state) => state.user.user;

export const rootSelector = {
  viewUser,
};

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default userSlice.reducer;
