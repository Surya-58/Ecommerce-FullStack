import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import CartProvider from "./Context/CartContext.jsx";
import WishlistProvider from "./Context/WishlistContext.jsx";
import UserProvider from "./Context/UserContext.jsx";

import "./Styles/Base/variables.css"
import "./Styles/Base/global.css"
import "./Styles/Base/utilities.css"
import "./Styles/Base/animations.css"
import "./Styles/Base/buttons.css"
import "./Styles/Base/forms.css"
import "./Styles/Base/navbar.css"
import "./Styles/Base/footer.css"

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
