import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePageOne from "./pages/HomePageOne";
import ErrorPage from "./pages/ErrorPage";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import PrivateRoute from "./components/PrivateRoute"; // 👈 Add this
import SignInPage from "./pages/SignInPage";
import QuoteCategoryPage from "./pages/QuoteCategoryPage";
import StatusPage from "./pages/StatusPage";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/authSlice";
import { useEffect } from "react";
import UploadQuotePage from "./pages/UploadQuotePage";
import QuotesListPage from "./pages/QuotesListPage";
import UsersListPage from "./pages/UsersListPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProductListPage from "./pages/ProductListPage";
import RedeemProductHistoryPage from "./pages/RedeemProductHistoryPage";
import InvoicePage from "./pages/InvoicePage";
import UserPointsTxnHistoryPage from "./pages/UserPointsTxnHistoryPage";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      dispatch(setUser({ user: JSON.parse(user), token }));
    }
  }, [dispatch]);


  return (

    <BrowserRouter>

      <RouteScrollToTop />

      <Routes>

        <Route path="/login" element={<SignInPage />} />

        {/* 🔐 Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePageOne />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/upload-quote" element={<UploadQuotePage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/quotes-list" element={<QuotesListPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/manage-categories" element={<QuoteCategoryPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/manage-status" element={<StatusPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/users" element={<UsersListPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/points-transaction-history/:id" element={<UserPointsTxnHistoryPage />} />
        </Route>

        

        <Route element={<PrivateRoute />}>
          <Route path="/products" element={<ProductListPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/product-redeem-history" element={<RedeemProductHistoryPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/view-invoice/:BillNo" element={<InvoicePage />} />
        </Route>

        {/* ❌ Fallback */}
        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
