import { Routes, Route } from "react-router-dom";

import Page from "./Pages/Home";
import Details from "./Pages/Details";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";

import BagsAndWallets from "./Sections/bags&wallets";
import Women from "./Sections/Women";
import Men from "./Sections/Men";
import Perfumes from "./Sections/Perfumes";
import Jewellery from "./Sections/jewellery";
import Watch from "./Sections/Watch";
import Shoes from "./Sections/Shoes";
import About from "./Sections/About";
import SearchPage from "./Sections/Search";

import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Page />} />

      <Route
        path="/bags-wallets"
        element={<BagsAndWallets />}
      />

      <Route
        path="/women"
        element={<Women />}
      />

      <Route
        path="/men"
        element={<Men />}
      />

      <Route
        path="/perfumes"
        element={<Perfumes />}
      />

      <Route
        path="/jewellery"
        element={<Jewellery />}
      />

      <Route
        path="/watches"
        element={<Watch />}
      />

      <Route
        path="/shoes-accessories"
        element={<Shoes />}
      />

      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="/search"
        element={<SearchPage />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route
        path="/wishlist"
        element={<Wishlist />}
      />

      <Route
        path="/cart"
        element={<Cart />}
      />

      <Route
        path="/product/:slug"
        element={<Details />}
      />

    </Routes>
  );
}

export default App;