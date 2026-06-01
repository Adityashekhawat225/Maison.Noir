import axios from "axios";
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { toast } from "sonner";
import { useWishlist } from "../context/WishlistContext";

import "../Styles/men.css";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";

import { Link } from "react-router-dom";
import slugify from "slugify";

export default function MenLuxury() {

  const [menItems, setMenItems] = useState([]);

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  useEffect(() => {

    const getLuxuryMen = async () => {

      try {

        const { data } = await axios.get(
          "https://maison-noir-jt67.onrender.com/api/v1/products"
        );

        const filteredMen = data.filter(
          (item) => item.category === "luxury men"
        );

        setMenItems(filteredMen);

      } catch (error) {

        console.log(error);

      }

    };

    getLuxuryMen();

  }, []);

  return (
    <>
      <Nav />

      <section className="men-section">

        <div className="men-hero">

          <img
            src="https://res.cloudinary.com/dzcaerfu7/image/upload/q_auto/f_auto/v1778393312/sami-sadeghi-hsAHR6o6OIs-unsplash_wfrwdc.jpg"
            alt=""
          />

        </div>

        <h2 className="men-heading">
          Luxury Men's Collection
        </h2>

        <div className="men-grid">

          {menItems.map((item) => (

            <Link
              key={item._id}
              to={`/product/${slugify(item.title, {
                lower: true,
                strict: true,
              })}`}
              className="men-link"
            >

              <div className="men-card">

                <div className="men-image-box">

                  <div
                    className="men-heart"
                    onClick={(e) => {

                      e.preventDefault();
                      e.stopPropagation();

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

                  </div>

                  <img
                    src={item.image}
                    alt={item.title}
                    className="men-image"
                  />

                </div>

                <div className="men-content">

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    ₹{item.price?.toLocaleString()}
                  </p>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </section>

      <Footer />

    </>
  );
}