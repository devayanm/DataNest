import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import dataReducer from './slices/dataSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
  },
});

export default store;
