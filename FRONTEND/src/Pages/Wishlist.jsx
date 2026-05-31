import Nav from "../Components/Nav";
import {
  FaTrash,
  FaShoppingBag
} from "react-icons/fa";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

import { Link } from "react-router-dom";
import slugify from "slugify";

import "../Styles/wishlist.css";

export default function Wishlist() {

  const {
    wishlist,
    removeFromWishlist
  } = useWishlist();

  const {
    addToCart
  } = useCart();

  const handleAddToCart = (item) => {

    addToCart(item);

    removeFromWishlist(item._id);

  };

  return (
    <>
      <Nav />

      <div className="wishlist-page">

        <h1>My Wishlist</h1>

        {
          wishlist.length === 0 ? (

            <div className="empty-wishlist">

              <h2>
                Your Wishlist is Empty
              </h2>

              <p>
                Add your favorite products here.
              </p>

            </div>

          ) : (

            <div className="wishlist-grid">

              {wishlist.map((item) => (

                <div
                  className="wishlist-card"
                  key={item._id}
                >

                  <Link
                    to={`/product/${item._id}/${slugify(
                      item.title,
                      {
                        lower: true
                      }
                    )}`}
                  >

                    <img
                      src={item.image}
                      alt={item.title}
                    />

                  </Link>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    ₹{item.price}
                  </p>

                  <div className="wishlist-actions">

                    <button
                      className="cart-btn"
                      onClick={() =>
                        handleAddToCart(item)
                      }
                    >

                      <FaShoppingBag />

                      <span>
                        Add To Cart
                      </span>

                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        removeFromWishlist(
                          item._id
                        )
                      }
                    >

                      <FaTrash />

                    </button>

                  </div>

                </div>

              ))}

            </div>

          )
        }

      </div>
    </>
  );
}