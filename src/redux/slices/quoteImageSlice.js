import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// 1. Upload Quote Image
export const uploadQuoteImage = createAsyncThunk(
  'quoteImages/uploadQuoteImage',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/upload/quote-image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Upload failed');
    }
  }
);


// 2. Get All Quote Images
export const fetchQuoteImages = createAsyncThunk(
  'quoteImages/fetchQuoteImages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/get-quote-images`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Fetch failed');
    }
  }
);


// 3. Get Quote Images by Category ID
export const fetchQuoteImagesByCategory = createAsyncThunk(
  'quoteImages/fetchQuoteImagesByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/get-quotes-by-category/${categoryId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Fetch by category failed');
    }
  }
);

// 4. Delete Quote Image
export const deleteQuoteImage = createAsyncThunk(
  'quoteImages/deleteQuoteImage',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/delete/quote-image/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Delete failed');
    }
  }
);

// 🔁 Slice
const quoteImageSlice = createSlice({
  name: 'quoteImages',
  initialState: {
    images: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearImageMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Upload
      .addCase(uploadQuoteImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadQuoteImage.fulfilled, (state, action) => {
        state.loading = false;
        state.images.unshift(action.payload);
        state.successMessage = 'Image uploaded successfully';
      })
      .addCase(uploadQuoteImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All
      .addCase(fetchQuoteImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuoteImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchQuoteImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch By Category
      .addCase(fetchQuoteImagesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuoteImagesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchQuoteImagesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteQuoteImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteQuoteImage.fulfilled, (state, action) => {
        state.loading = false;
        state.images = state.images.filter(img => img._id !== action.payload);
        state.successMessage = 'Image deleted successfully';
      })
      .addCase(deleteQuoteImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearImageMessages } = quoteImageSlice.actions;

export default quoteImageSlice.reducer;
