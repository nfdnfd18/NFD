import { configureStore, createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  sidebarShow: true,
  theme: 'light',
};

// Create a slice
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setState: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

// Extract actions and reducer
export const { setState } = appSlice.actions;
const appReducer = appSlice.reducer;

// Configure the store
const store = configureStore({
  reducer: appReducer,
});

export default store;
