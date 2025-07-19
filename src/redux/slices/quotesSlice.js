import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// ✅ Get all quotes
export const fetchQuotes = createAsyncThunk('quotes/fetchAll', async () => {
  const res = await api.get('/image/video/quotes');
  return res.data.data;
});

// ✅ Get quote by ID
export const fetchQuoteById = createAsyncThunk('quotes/fetchById', async (id) => {
  const res = await api.get(`/single-quote/${id}`);
  return res.data.data;
});

// ✅ Get quotes by category
export const fetchQuotesByCategory = createAsyncThunk('quotes/byCategory', async (categoryId) => {
  const res = await api.get(`/quotes/by-category/${categoryId}`);
  return res.data.data;
});


// ✅ Get quotes by language
export const fetchQuotesByLanguage = createAsyncThunk('quotes/byLanguage', async (langId) => {
  const res = await api.get(`/quotes/by-language/${langId}`);
  return res.data.data;
});


// ✅ Upload quote (image/video)
export const uploadQuote = createAsyncThunk('quotes/upload', async (formData) => {
  const res = await api.post('/upload-quote', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data.data;
});


// ✅ Update quote
export const updateQuote = createAsyncThunk('quotes/update', async ({ id, data }) => {
  const res = await api.put(`/update-quote/${id}`, data);
  return res.data.data;
});

// ✅ Delete quote
export const deleteQuote = createAsyncThunk('quotes/delete', async (id) => {
  const res = await api.delete(`/delete-quote/${id}`);
  return { id, message: res.data.message };
});

const quotesSlice = createSlice({
  name: 'quotes',
  initialState: {
    quotes: [],
    quote: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearQuoteState: (state) => {
      state.quote = null;
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchQuotes
      .addCase(fetchQuotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuotes.fulfilled, (state, action) => {
        state.loading = false;
        state.quotes = action.payload;
      })
      .addCase(fetchQuotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // fetchQuoteById
      .addCase(fetchQuoteById.fulfilled, (state, action) => {
        state.quote = action.payload;
      })

      // uploadQuote
      .addCase(uploadQuote.fulfilled, (state, action) => {
        state.quotes.unshift(action.payload); // Add to top
        state.successMessage = 'Quote uploaded successfully';
      })

      // updateQuote
      .addCase(updateQuote.fulfilled, (state, action) => {
        const index = state.quotes.findIndex(q => q._id === action.payload._id);
        if (index !== -1) state.quotes[index] = action.payload;
        state.successMessage = 'Quote updated successfully';
      })

      // deleteQuote
      .addCase(deleteQuote.fulfilled, (state, action) => {
        state.quotes = state.quotes.filter(q => q._id !== action.payload.id);
        state.successMessage = action.payload.message;
      });
  },
});

export const { clearQuoteState } = quotesSlice.actions;

export default quotesSlice.reducer;
