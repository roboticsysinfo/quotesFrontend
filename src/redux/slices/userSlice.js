import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';


// 🔹 1. Get all users (admin)
export const fetchAllUsers = createAsyncThunk(
    'users/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get('/all-users');
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
        }
    }
);


// 🔹 2. Get user by ID
export const getUserById = createAsyncThunk(
    'users/getById',
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.get(`/user/by-userid/${id}`);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
        }
    }
);

// 🔹 3. Update user by admin
export const updateUserByAdmin = createAsyncThunk(
    'users/updateByAdmin',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await api.put(`/users/${id}`, formData);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update user');
        }
    }
);

// 🔹 4. Delete user by ID
export const deleteUserById = createAsyncThunk(
    'users/delete',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/delete/user/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
        }
    }
);

// 🔹 5. Update own profile
export const updateOwnProfile = createAsyncThunk(
    'users/updateOwnProfile',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await api.put('/update/user/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
        }
    }
);

// 🔹 6. Get leaderboard
export const fetchLeaderboard = createAsyncThunk(
    'users/fetchLeaderboard',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get('/get/leaderboard');
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch leaderboard');
        }
    }
);

// 🔹 7. Get user points history
export const getUserPointsHistory = createAsyncThunk(
    'users/getUserPointsHistory',
    async (userId, { rejectWithValue }) => {
        try {
            const res = await api.get(`/user/points-transactions-history/${userId}`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch points history');
        }
    }
);

// 🧠 Slice definition
const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        selectedUser: null,
        leaderboard: [],
        pointsHistory: {
            referralCode: '',
            points: 0,
            data: [],
        },
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        clearUserMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // All Users
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get User By ID
            .addCase(getUserById.fulfilled, (state, action) => {
                state.selectedUser = action.payload;
            })

            // Update User
            .addCase(updateUserByAdmin.fulfilled, (state, action) => {
                state.successMessage = 'User updated successfully';
                state.users = state.users.map(user =>
                    user._id === action.payload._id ? action.payload : user
                );
            })

            // Delete User
            .addCase(deleteUserById.fulfilled, (state, action) => {
                state.successMessage = 'User deleted successfully';
                state.users = state.users.filter(user => user._id !== action.payload);
            })

            // Update Own Profile
            .addCase(updateOwnProfile.fulfilled, (state) => {
                state.successMessage = 'Profile updated successfully';
            })

            // Leaderboard
            .addCase(fetchLeaderboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLeaderboard.fulfilled, (state, action) => {
                state.loading = false;
                state.leaderboard = action.payload;
            })
            .addCase(fetchLeaderboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get User Points History
            .addCase(getUserPointsHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserPointsHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.pointsHistory = action.payload;
            })
            .addCase(getUserPointsHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Generic Error Handling
            .addMatcher(
                (action) => action.type.startsWith('users/') && action.type.endsWith('/rejected'),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    },
});

export const { clearUserMessages } = userSlice.actions;

export default userSlice.reducer;
