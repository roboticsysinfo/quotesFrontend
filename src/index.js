import React from "react";
import ReactDOM from "react-dom/client";
import 'react-quill/dist/quill.snow.css';
import "jsvectormap/dist/css/jsvectormap.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-modal-video/css/modal-video.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store"
import { ToastContainer } from "react-toastify";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <Provider store={store}>
      <App />
      <ToastContainer position="top-center" />
    </Provider>
  </>
);

reportWebVitals();
