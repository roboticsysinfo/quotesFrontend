import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';


// 🔹 Fetch All Products (with pagination)
export const fetchProducts = createAsyncThunk(
  'redeem/fetchProducts',
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const res = await api.get(`/products?page=${page}&limit=${limit}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);


// 🔹 Add New Product
export const addProduct = createAsyncThunk(
  'redeem/addProduct',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post('/add-product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add product');
    }
  }
);

// 🔹 Update Product
export const updateProduct = createAsyncThunk(
  'redeem/updateProduct',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/update/product/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update product');
    }
  }
);


// 🔹 Delete Product
export const deleteProduct = createAsyncThunk(
  'redeem/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/delete/product/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
    }
  }
);


// 🔹 Redeem Product
export const redeemProduct = createAsyncThunk(
  'redeem/redeemProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const res = await api.post('/redeem', { productId });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to redeem product');
    }
  }
);


// 🔹 Get Redeem History
export const fetchRedeemHistory = createAsyncThunk(
  'redeem/fetchRedeemHistory',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/user/redeem-product-history/${id}`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch redeem history');
    }
  }
);


export const fetchAllRedeemHistory = createAsyncThunk(
  'redeem/fetchAllRedeemHistory',
  async ({ page = 1, limit = 10, search = '' }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/all/redeem-product-history?page=${page}&limit=${limit}&search=${search}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch all redeem history');
    }
  }
);


// ✅ Slice
const redeemProductSlice = createSlice({
  name: 'redeem',
  initialState: {
    products: [],
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 1,
    },
    redeemHistory: [],
    allRedeemHistory: [],
    allRedeemPagination: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 1,
    },
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearRedeemMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔸 Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.pagination = action.payload.pagination || {};
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔸 Add Product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.successMessage = 'Product added successfully';
        state.products.unshift(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload;
      })

      // 🔸 Update Product
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.successMessage = 'Product updated successfully';
        state.products = state.products.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload;
      })

      // 🔸 Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.successMessage = 'Product deleted successfully';
        state.products = state.products.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
      })

      // 🔸 Redeem Product
      .addCase(redeemProduct.fulfilled, (state, action) => {
        state.successMessage = 'Product redeemed successfully';
        state.redeemHistory.unshift(action.payload);
      })
      .addCase(redeemProduct.rejected, (state, action) => {
        state.error = action.payload;
      })

      // 🔸 Fetch Single User Redeem History
      .addCase(fetchRedeemHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRedeemHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.redeemHistory = action.payload;
      })
      .addCase(fetchRedeemHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔸 Fetch All Redeem History (Admin)
      .addCase(fetchAllRedeemHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllRedeemHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.allRedeemHistory = action.payload.data;
        state.allRedeemPagination = action.payload.pagination;
      })
      .addCase(fetchAllRedeemHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRedeemMessages } = redeemProductSlice.actions;
export default redeemProductSlice.reducer;