import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api"; 

// 1️⃣ Daily Stay Reward
export const dailyStayPoints = createAsyncThunk(
  "userPoints/dailyStayPoints",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post(`/daily-stay`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 2️⃣ Share Referral
export const shareReferral = createAsyncThunk(
  "userPoints/shareReferral",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.post(`/refer-share`, { userId });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 3️⃣ Get Referral Details
export const getReferralDetails = createAsyncThunk(
  "userPoints/getReferralDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/referral-details/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const userPointsSlice = createSlice({
  name: "userPoints",
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
    referralDetails: null,
  },
  reducers: {
    clearUserPointsState: (state) => {
      state.error = null;
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    // 🟦 Daily Stay
    builder
      .addCase(dailyStayPoints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dailyStayPoints.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(dailyStayPoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // 🟧 Share Referral
    builder
      .addCase(shareReferral.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(shareReferral.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(shareReferral.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // 📋 Get Referral Details
    builder
      .addCase(getReferralDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReferralDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.referralDetails = action.payload;
      })
      .addCase(getReferralDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearUserPointsState } = userPointsSlice.actions;
export default userPointsSlice.reducer;
