import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import CartProvider from "./Context/CartContext.jsx";
import WishlistProvider from "./Context/WishlistContext.jsx";
import UserProvider from "./Context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <WishlistProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </WishlistProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
