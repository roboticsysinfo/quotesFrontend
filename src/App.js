import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePageOne from "./pages/HomePageOne";
import ErrorPage from "./pages/ErrorPage";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import PrivateRoute from "./components/PrivateRoute"; // 👈 Add this
import SignInPage from "./pages/SignInPage";
import UploadQouteImagePage from "./pages/UploadQouteImagePage";
import QuoteCategoryPage from "./pages/QuoteCategoryPage";
import StatusPage from "./pages/StatusPage";
import QuoteImagePage from "./pages/QuoteImagePage";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/authSlice";
import { useEffect } from "react";

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
          <Route path="/upload-quote-image" element={<UploadQouteImagePage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/image-quotes-list" element={<QuoteImagePage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/manage-categories" element={<QuoteCategoryPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/manage-status" element={<StatusPage />} />
        </Route>

        {/* ❌ Fallback */}
        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
