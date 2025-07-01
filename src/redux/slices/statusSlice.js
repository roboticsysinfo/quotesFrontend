import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Upload Status
export const uploadStatus = createAsyncThunk('/upload-status', async (formData, { rejectWithValue }) => {
  try {

    console.log(" formdata", formData);
    

    const res = await api.post('/upload-status', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Upload failed');
  }
});

// Get All Statuses
export const fetchStatuses = createAsyncThunk('/get-all-status', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/get-all-status');
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch statuses');
  }
});

// Delete Status
export const deleteStatus = createAsyncThunk('/delete/status', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/delete/status/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete status');
  }
});

const statusSlice = createSlice({
  name: 'status',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(uploadStatus.pending, state => { state.loading = true; state.error = null; })
      .addCase(uploadStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload.data);
      })
      .addCase(uploadStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchStatuses.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchStatuses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchStatuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteStatus.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  }
});

export default statusSlice.reducer;
