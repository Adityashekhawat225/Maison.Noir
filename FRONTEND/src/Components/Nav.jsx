import { Link, useNavigate } from "react-router-dom";

import {
  FaBars,
  FaSearch,
  FaUser,
  FaRegHeart,
  FaTimes,
  FaShoppingBag
} from "react-icons/fa";

import "../Styles/nav.css";

import { useState, useEffect } from "react";

import axios from "axios";

import { useWishlist } from "../context/WishlistContext";

export default function Nav() {

  const [open, setOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  const { wishlist } = useWishlist();

  const handleProfile = async () => {

    try {

      await axios.get(
        "http://localhost:5000/api/v1/auth/profile",
        {
          withCredentials: true
        }
      );

      navigate("/profile");

    } catch (error) {

      navigate("/login");

    }
  };

  useEffect(() => {

    const handleScroll = () => {

      if (window.scrollY > 50) {

        setScrolled(true);

      } else {

        setScrolled(false);

      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };

  }, []);

  return (

    <>

      <nav
        className={
          scrolled
            ? "navbar scrolled"
            : "navbar"
        }
      >

        <div className="nav_left">

          <button
            className="nav_link menu_btn"
            onClick={() => setOpen(true)}
          >

            <FaBars />

            <span>
              Menu
            </span>

          </button>

          <Link
            to="/search"
            className="nav_link"
          >

            <FaSearch />

            <span>
              Search
            </span>

          </Link>

        </div>

        <div className="nav_center">

          <h1 className="nav_heading">
            MAISON·NOIR
          </h1>

        </div>
<div className="nav_right">

  <Link
    to="/contact"
    className="nav_link"
  >
    <span>Call Us</span>
  </Link>

  <Link
    to="/wishlist"
    className="nav_link wishlist-link"
  >
    <FaRegHeart />

    {wishlist.length > 0 && (
      <span className="wishlist-count">
        {wishlist.length}
      </span>
    )}
  </Link>

  <Link
    to="/cart"
    className="nav_link"
  >
    <FaShoppingBag />
  </Link>

  <button
    className="nav_link profile_btn"
    onClick={handleProfile}
  >
    <FaUser />
  </button>

</div>

      </nav>

      <div
        className={
          open
            ? "sidebar active"
            : "sidebar"
        }
      >

        <button
          className="close_btn"
          onClick={() => setOpen(false)}
        >

          <FaTimes />

        </button>

        <div className="sidebar_links">

          <Link to="/">
            New
          </Link>

          <Link to="/bags-wallets">
            Bags and Wallets
          </Link>

          <Link to="/women">
            Women
          </Link>

          <Link to="/men">
            Men
          </Link>

          <Link to="/perfumes">
            Perfumes
          </Link>

          <Link to="/jewellery">
            Jewellery
          </Link>

          <Link to="/watches">
            Watches
          </Link>

          <Link to="/shoes-accessories">
            Shoes and Accessories
          </Link>

          <Link to="/">
            Services
          </Link>

          <Link to="/">
            About Us
          </Link>

        </div>

        <div className="sidebar_bottom">

          <Link to="/">
            Can we help you?
          </Link>

          <a href="tel:+919602379541">
            +91 9602379541
          </a>

          <Link to="/">
            Sustainability
          </Link>

          <Link to="/">
            Find a Store
          </Link>

          <p>
            India
          </p>

        </div>

      </div>

    </>
  );
}