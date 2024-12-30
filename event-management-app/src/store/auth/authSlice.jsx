import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get token from localStorage to maintain state on reload
const token = localStorage.getItem('token');

const initialState = {
  user: token ? { id: 'user-id' } : null, // Ideally, you would decode the token here
  isAuthenticated: !!token, // If token exists, user is authenticated
  status: 'idle',
  error: null,
};

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (credentials) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/signup`, credentials);
    return response.data;
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, credentials);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
