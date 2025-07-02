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

            console.log(" id", id);
            
            const res = await api.get(`/user/by-userid/${id}`);
            
            console.log("user get by id response", res.data.data);
            
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

// 🔹 5. Update own profile (with optional file upload)
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

// 🧠 Slice definition
const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        selectedUser: null,
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
            .addCase(updateOwnProfile.fulfilled, (state, action) => {
                state.successMessage = 'Profile updated successfully';
            })

            // Errors
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
