import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // ✅ Default import (not {reducer})

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
