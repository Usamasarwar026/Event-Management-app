import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/auth/authSlice';
import eventsReducer from '../store/events/eventsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
  },
});

