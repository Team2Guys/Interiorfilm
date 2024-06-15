import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './slices/AdminsSlice';
import usrSlice from './slices/userSlice';


export const store = configureStore({
  reducer: {
    usersSlice: usersSlice,
    userSlice: usrSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;