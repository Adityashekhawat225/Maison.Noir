import { useEffect, useState } from "react";
import axios from "axios";

import {
  Search,
  Heart,
  X
} from "lucide-react";

import { FaHeart } from "react-icons/fa";
import { toast } from "sonner";
import { useWishlist } from "../context/WishlistContext";

import { Link } from "react-router-dom";
import slugify from "slugify";

import "../Styles/search.css";

export default function SearchPage() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await axios.get(
          "https://maison-noir-jt67.onrender.com/api/v1/products"
        );

        const highestPriceProducts =
          response.data.sort(
            (a, b) => b.price - a.price
          );

        setProducts(highestPriceProducts);

      } catch (error) {

        console.log(error);

      }

    };

    fetchProducts();

  }, []);

  const searchSuggestions = products
    .filter(
      (product) =>
        product.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        product.category
          .toLowerCase()
          .includes(search.toLowerCase())
    )
    .slice(0, 5);

  const filteredProducts = products.filter(
    (product) =>
      product.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      product.category
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (

    <div className="search-page">

      <div className="search-top">

        <h1 className="brand-logo">
          MAISON.NOIR
        </h1>

        <button
          type="button"
          className="close-search-btn"
          onClick={() =>
            window.history.back()
          }
        >
          <X className="close-icon" />
        </button>

      </div>

      <div className="search-wrapper">

        <div className="search-box">

          <Search className="search-icon" />

          <input
            type="text"
            placeholder='Search for "Luxury Bag"'
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {search && (

            <button
              className="clear-btn"
              onClick={() =>
                setSearch("")
              }
            >
              Clear
            </button>

          )}

        </div>

        {search &&
          searchSuggestions.length > 0 && (

            <div className="suggestions">

              {searchSuggestions.map((product) => (

                <div
                  className="suggestion-item"
                  key={product._id}
                  onClick={() =>
                    setSearch(product.title)
                  }
                >

                  <Search className="suggestion-icon" />

                  <p>
                    {product.title}
                  </p>

                </div>

              ))}

            </div>

          )}

      </div>

      <div className="products-grid">

        {(search
          ? filteredProducts
          : products.slice(0, 12)
        ).map((product) => (

          <Link
            key={product._id}
            to={`/product/${slugify(
              product.title,
              {
                lower: true,
                strict: true,
              }
            )}`}
            className="search-link"
          >

            <div className="product-card">

              <button
                className="wishlist-btn"
                onClick={(e) => {

                  e.preventDefault();
                  e.stopPropagation();

                  const alreadyAdded =
                    isWishlisted(product._id);

                  toggleWishlist(product);

                  if (alreadyAdded) {

                    toast.error(
                      `${product.title} removed from wishlist`
                    );

                  } else {

                    toast.success(
                      `${product.title} added to wishlist`
                    );

                  }

                }}
              >

                {
                  isWishlisted(product._id)
                    ? <FaHeart color="red" />
                    : <Heart className="heart-icon" />
                }

              </button>

              <img
                src={product.image}
                alt={product.title}
              />

              <h3>
                {product.title}
              </h3>

              <p>
                ₹{product.price?.toLocaleString()}
              </p>

            </div>

          </Link>

        ))}

      </div>

    </div>

  );
}