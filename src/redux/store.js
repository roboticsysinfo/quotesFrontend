import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../redux/slices/authSlice";
import quoteImageReducer from "../redux/slices/quoteImageSlice";
import quoteCategoryReducer from "../redux/slices/quoteCategorySlice"
import favQuoteReducer from "../redux/slices/favQuoteSlice";
import userReducer from "../redux/slices/userSlice";
import statusReducer from "../redux/slices/statusSlice";
import quotesReducer from "../redux/slices/quotesSlice";
import redeemProductReducer from "../redux/slices/redeemProductSlice";
import userPointsReducer from "../redux/slices/userPointsSlice";
import adminNotificationsReducer from "../redux/slices/adminNotificationSlice"


const store = configureStore({

  reducer: {

    auth: authReducer,
    quoteImages: quoteImageReducer,
    quoteCategories: quoteCategoryReducer,
    users: userReducer,
    favourites: favQuoteReducer,
    status: statusReducer,
    quotes: quotesReducer,
    redeem : redeemProductReducer,
    userPoints: userPointsReducer,
    adminNotifications: adminNotificationsReducer
  },

});


export default store;
