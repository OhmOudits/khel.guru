import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_BACKEND_URL;

const api = axios.create({
  baseURL: API_URL,
});

export const getGame = async (name, { rejectWithValue }) => {
  try {
    const response = await api.get(`/game`, { params: { name } });
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error.response?.data || { message: "Failed to find game" }
    );
  }
};

export const getGames = createAsyncThunk(
  "game/getGames",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/game/all`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch games" }
      );
    }
  }
);

const initialState = {
  games: [],
  loading: false,
  error: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload.games;
      })
      .addCase(getGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch games";
      });
  },
});

export const { clearError } = gameSlice.actions;
export default gameSlice.reducer;
