import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { CompareProvider } from "./context/CompareContext";
import { ToastContainer } from "react-toastify";  
import 'react-toastify/dist/ReactToastify.css'; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <CompareProvider>
        <App />
        <ToastContainer />
      </CompareProvider>
    </CartProvider>
  </React.StrictMode>
);
