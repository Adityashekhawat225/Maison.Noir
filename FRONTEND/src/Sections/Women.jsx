import axios from "axios";
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { toast } from "sonner";
import { useWishlist } from "../context/WishlistContext";

import "../Styles/women.css";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import slugify from "slugify";

export default function Women() {

  const [womenItems, setWomenItems] = useState([]);

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  useEffect(() => {

    const getLuxuryWomen = async () => {

      try {

        const { data } = await axios.get(
          "https://maison-noir-jt67.onrender.com/api/v1/products"
        );

        const filteredWomen = data.filter(
          (item) => item.category === "luxury women"
        );

        setWomenItems(filteredWomen);

      } catch (error) {

        console.log(error);

      }

    };

    getLuxuryWomen();

  }, []);

  return (
    <>
      <Nav />

      <section className="women-section">

        <div className="women-hero">

          <video autoPlay muted loop playsInline>

            <source
              src="https://res.cloudinary.com/dzcaerfu7/video/upload/q_auto/f_auto/v1778872487/M_S_Women_s_Fashion_The_New_Autumn_Season_A_W16_TV_Ad_-_M_S_720p_h264_lfdley.mp4"
              type="video/mp4"
            />

          </video>

        </div>

        <h2 className="women-heading">
          Luxury Women Collection
        </h2>

        <div className="women-grid">

          {womenItems.map((item) => (

            <Link
              key={item._id}
              to={`/product/${slugify(item.title, {
                lower: true,
                strict: true,
              })}`}
              className="women-link"
            >

              <div className="women-card">

                <div className="women-image-box">

                  <div
                    className="women-heart"
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
                    className="women-image"
                  />

                </div>

                <div className="women-content">

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