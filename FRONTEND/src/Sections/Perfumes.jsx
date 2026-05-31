import axios from "axios";
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { toast } from "sonner";
import { useWishlist } from "../context/WishlistContext";

import "../Styles/perfume.css";

import Nav from "../Components/Nav";
import Footer from "../Components/Footer";

import { Link } from "react-router-dom";
import slugify from "slugify";

export default function LuxuryPerfumes() {

  const [perfumeItems, setPerfumeItems] = useState([]);

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  useEffect(() => {

    const getLuxuryPerfumes = async () => {

      try {

        const { data } = await axios.get(
          "http://localhost:5000/api/v1/products"
        );

        const filteredPerfumes = data.filter(
          (item) => item.category === "luxury perfumes"
        );

        setPerfumeItems(filteredPerfumes);

      } catch (error) {

        console.log(error);

      }

    };

    getLuxuryPerfumes();

  }, []);

  return (
    <>
      <Nav />

      <section className="perfume-section">

        <div className="perfume-hero">

          <img
            src="https://res.cloudinary.com/dzcaerfu7/image/upload/q_auto/f_auto/v1778397496/U_BC_STILL_LIFE_05_MDAY_WW_Mar26_DI3_lh4odj.avif"
            alt=""
          />

        </div>

        <h2 className="perfume-heading">
          Luxury Perfumes Collection
        </h2>

        <div className="perfume-grid">

          {perfumeItems.map((item) => (

            <Link
              key={item._id}
              to={`/product/${slugify(item.title, {
                lower: true,
                strict: true,
              })}`}
              className="perfume-link"
            >

              <div className="perfume-card">

                <div className="perfume-image-box">

                  <div
                    className="perfume-heart"
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
                    className="perfume-image"
                  />

                </div>

                <div className="perfume-content">

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