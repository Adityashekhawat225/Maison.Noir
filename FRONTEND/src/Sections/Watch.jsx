import axios from "axios";
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { toast } from "sonner";
import { useWishlist } from "../context/WishlistContext";

import "../Styles/watch.css";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import slugify from "slugify";

export default function LuxuryWatches() {

  const [watchItems, setWatchItems] = useState([]);

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  useEffect(() => {

    const getLuxuryWatches = async () => {

      try {

        const { data } = await axios.get(
          "https://maison-noir-jt67.onrender.com/api/v1/products"
        );

        const filteredWatches = data.filter(
          (item) => item.category === "luxury watches"
        );

        setWatchItems(filteredWatches);

      } catch (error) {

        console.log(error);

      }

    };

    getLuxuryWatches();

  }, []);

  return (
    <>
      <Nav />

      <section className="watch-section">

        <div className="watch-hero">

          <video autoPlay muted loop playsInline>

            <source
              src="https://res.cloudinary.com/dzcaerfu7/video/upload/q_auto/f_auto/v1778392919/Rolex_Day-Date_Decorative_Stone_Dials_-_ROLEX_1080p_h264_zu5grs.mp4"
              type="video/mp4"
            />

          </video>

        </div>

        <h2 className="watch-heading">
          Luxury Watches Collection
        </h2>

        <div className="watch-grid">

          {watchItems.map((item) => (

            <Link
              key={item._id}
              to={`/product/${slugify(item.title, {
                lower: true,
                strict: true,
              })}`}
              className="watch-link"
            >

              <div className="watch-card">

                <div className="watch-image-box">

                  <div
                    className="watch-heart"
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
                    className="watch-image"
                  />

                </div>

                <div className="watch-content">

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