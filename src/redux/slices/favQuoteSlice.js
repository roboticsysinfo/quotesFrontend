import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api'

// 1. Add quote to favourites
export const addToFavourites = createAsyncThunk(
  'favourites/add',
  async ({ userId, quoteId }, { rejectWithValue }) => {
    try {
      const response = await api.post('/quote/add', { userId, quoteId });
      return response.data.data; // updated favourites array
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add to favourites');
    }
  }
);

// 2. Remove quote from favourites
export const removeFromFavourites = createAsyncThunk(
  'favourites/remove',
  async ({ userId, quoteId }, { rejectWithValue }) => {
    try {
      const response = await api.post('/quote/remove', { userId, quoteId });
      return response.data.data; // updated favourites array
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove from favourites');
    }
  }
);

// 3. Fetch all favourites of a user
export const fetchFavourites = createAsyncThunk(
  'favourites/fetch',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/user-fav-quotes/${userId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch favourites');
    }
  }
);

// 🔁 Slice
const favQuoteSlice = createSlice({
  name: 'favourites',
  initialState: {
    favourites: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearFavMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Add
      .addCase(addToFavourites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.favourites = action.payload;
        state.successMessage = 'Quote added to favourites';
      })
      .addCase(addToFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove
      .addCase(removeFromFavourites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.favourites = action.payload;
        state.successMessage = 'Quote removed from favourites';
      })
      .addCase(removeFromFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch
      .addCase(fetchFavourites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.favourites = action.payload;
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearFavMessages } = favQuoteSlice.actions;

export default favQuoteSlice.reducer;
