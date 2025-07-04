import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../redux/slices/authSlice";
import quoteImageReducer from "../redux/slices/quoteImageSlice";
import quoteCategoryReducer from "../redux/slices/quoteCategorySlice"
import favQuoteReducer from "../redux/slices/favQuoteSlice";
import userReducer from "../redux/slices/userSlice";
import statusReducer from "../redux/slices/statusSlice";
import quotesReducer from "../redux/slices/quotesSlice"

const store = configureStore({

  reducer: {

    auth: authReducer,
    quoteImages: quoteImageReducer,
    quoteCategories: quoteCategoryReducer,
    users: userReducer,
    favourites: favQuoteReducer,
    status: statusReducer,
    quotes: quotesReducer,

  },

});


export default store;
