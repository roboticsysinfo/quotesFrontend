import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";


// ---------------- Thunks ----------------

// Create Admin Notification
export const createAdminNotification = createAsyncThunk(
  "adminNotifications/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/create-admin-msg`, payload);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get All Notifications
export const fetchAdminNotifications = createAsyncThunk(
  "adminNotifications/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/get-admin-msg`);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update Notification
export const updateAdminNotification = createAsyncThunk(
  "adminNotifications/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/update/admin-msg/${id}`, payload);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete Notification
export const deleteAdminNotification = createAsyncThunk(
  "adminNotifications/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/delete/admin-msg/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ---------------- Slice ----------------
const adminNotificationSlice = createSlice({
  name: "adminNotifications",
  initialState: {
    items: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createAdminNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAdminNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
        state.success = "Notification created successfully!";
      })
      .addCase(createAdminNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch
      .addCase(fetchAdminNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAdminNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateAdminNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((n) =>
          n._id === action.payload._id ? action.payload : n
        );
        state.success = "Notification updated successfully!";
      })
      .addCase(updateAdminNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteAdminNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((n) => n._id !== action.payload);
        state.success = "Notification deleted successfully!";
      })
      .addCase(deleteAdminNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = adminNotificationSlice.actions;
export default adminNotificationSlice.reducer;
