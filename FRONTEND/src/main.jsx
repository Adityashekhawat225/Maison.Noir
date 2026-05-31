import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { CartProvider } from "./context/CartContext";

import { WishlistProvider } from "./context/WishlistContext";

import { Toaster } from "sonner";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <CartProvider>

 

    <WishlistProvider>

      <BrowserRouter>

        <App />

        <Toaster
          richColors
          position="top-right"
        />

      </BrowserRouter>

    </WishlistProvider>

       </CartProvider>

  </React.StrictMode>
);