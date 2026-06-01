import axios from "axios";
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { toast } from "sonner";
import { useWishlist } from "../context/WishlistContext";

import "../Styles/bags&wallets.css";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";

import { Link } from "react-router-dom";
import slugify from "slugify";

export default function BagsAndWallets() {

  const [bagItems, setBagItems] = useState([]);

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  useEffect(() => {

    const getLuxuryBags = async () => {

      try {

        const { data } = await axios.get(
          "https://maison-noir-jt67.onrender.com/api/v1/products"
        );

        const filteredBags = data.filter(
          (item) =>
            item.category ===
            "luxury bags & wallets"
        );

        setBagItems(filteredBags);

      } catch (error) {

        console.log(error);

      }

    };

    getLuxuryBags();

  }, []);

  return (
    <>
      <Nav />

      <section className="latest-section">

        <div className="hero-image">

          <img
            src="https://res.cloudinary.com/dzcaerfu7/image/upload/q_auto/f_auto/v1778393406/latico-leathers-FQsX5RW7084-unsplash_q7ttmz.jpg"
            alt=""
          />

        </div>

        <h2 className="latest-heading">
          Luxury Bags & Wallets
        </h2>

        <div className="latest-grid">

          {bagItems.map((item) => (

            <div
              key={item._id}
              className="latest-card"
            >

              <div className="latest-image-box">

                <button
                  type="button"
                  className="heart-icon"
                  onClick={() => {

                    const alreadyAdded =
                      isWishlisted(item._id);

                    toggleWishlist(item);

                    if (alreadyAdded) {

                      toast.error(
                        `${item.title} removed from wishlist`
                      );

                    } else {

                      toast.success(
                        `${item.title} added to wishlist`
                      );

                    }

                  }}
                >

                  {
                    isWishlisted(item._id)
                      ? <FaHeart color="red" />
                      : <FiHeart />
                  }

                </button>

                <Link
                  to={`/product/${slugify(
                    item.title,
                    {
                      lower: true,
                      strict: true,
                    }
                  )}`}
                  className="bags-link"
                >

                  <img
                    src={item.image}
                    alt={item.title}
                    className="latest-image"
                  />

                </Link>

              </div>

              <Link
                to={`/product/${slugify(
                  item.title,
                  {
                    lower: true,
                    strict: true,
                  }
                )}`}
                className="bags-link"
              >

                <div className="latest-content">

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    ₹{item.price?.toLocaleString()}
                  </p>

                </div>

              </Link>

            </div>

          ))}

        </div>

      </section>

      <Footer />

    </>
  );
}