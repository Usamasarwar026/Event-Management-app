import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const initialState = {
    events: [],  // Ensure this is an array
    status: 'idle',
    error: null,
  
};

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  try {
    // Make a GET request to the updated API endpoint
    const response = await axios.get(`${API_BASE_URL}todos/`);
    // console.log('API Response:', response.data); // Log the response to verify the data structure
    return response.data; // Return the data from the API
  } catch (error) {
    // console.error('Error fetching events:', error); // Log any error that occurs
    throw error; // Re-throw the error so Redux can handle it
  }
});


export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData) => {
    const response = await axios.post(`${API_BASE_URL}todos/create`, eventData);
    return response.data;
  }
);


const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        // console.log('Fetched Events:', action.payload);
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        if (Array.isArray(state.events)) {
          state.events.push(action.payload);  // Add the new event
        } else {
          state.events = [action.payload];  // Initialize events as an array if not already
        }
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      
  },
});

export default eventsSlice.reducer;

