import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api'; // adjust path if needed

// ✅ Fetch all categories
export const fetchQuoteCategories = createAsyncThunk(
  'quoteCategories/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/quote-categories');
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

// ✅ Create a new category
export const createQuoteCategory = createAsyncThunk(
  'quoteCategories/create',
  async (payload, thunkAPI) => {
    try {
      const res = await api.post('/create-category', payload);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create category');
    }
  }
);

// ✅ Update a category
export const updateQuoteCategory = createAsyncThunk(
  'quoteCategories/update',
  async ({ id, name, isFeatured }, thunkAPI) => {
    try {
      const response = await api.put(`/update/category/${id}`, {
        name,
        isFeatured,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Update failed');
    }
  }
);


// ✅ Delete a category
export const deleteQuoteCategory = createAsyncThunk(
  'quoteCategories/delete',
  async (id, thunkAPI) => {
    try {
      await api.delete(`/delete/category/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete category');
    }
  }
);

// ✅ Initial State
const initialState = {
  categories: [],
  loading: false,
  error: null,
};

// ✅ Slice
const quoteCategorySlice = createSlice({
  name: 'quoteCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchQuoteCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuoteCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchQuoteCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createQuoteCategory.fulfilled, (state, action) => {
        state.categories.unshift(action.payload);
      })

      // Update
      .addCase(updateQuoteCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(cat => cat._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteQuoteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(cat => cat._id !== action.payload);
      });
  },
});

export default quoteCategorySlice.reducer;
