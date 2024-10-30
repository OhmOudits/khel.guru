import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null, // User will be rehydrated by redux-persist
  loading: false,
  error: null,
};

// Create the thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwtToken'); // Get token from local storage
      const response = await axios.get('https://lossers-world-backend.onrender.com/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return the user data
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Failed to fetch user profile');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOut: (state) => {
      state.user = null; // No need to manually remove from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true; // Set loading to true when the API call is made
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload; // Set user data on successful fetch
        state.loading = false; // Set loading to false
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false; // Set loading to false on error
        state.error = action.payload; // Set the error message
      });
  },
});

export const { signInStart, signInSuccess, signInFailure, signOut } = authSlice.actions;

export default authSlice.reducer;
