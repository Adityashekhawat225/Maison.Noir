import axios from "axios";
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { toast } from "sonner";
import { useWishlist } from "../context/WishlistContext";

import "../Styles/shoes.css";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import slugify from "slugify";

export default function MensShoes() {

  const [shoeItems, setShoeItems] = useState([]);

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  useEffect(() => {

    const getMensShoes = async () => {

      try {

        const { data } = await axios.get(
          "http://localhost:5000/api/v1/products"
        );

        const filteredShoes = data.filter(
          (item) => item.category === "luxury shoes"
        );

        setShoeItems(filteredShoes);

      } catch (error) {

        console.log(error);

      }

    };

    getMensShoes();

  }, []);

  return (
    <>
      <Nav />

      <section className="shoes-section">

        <div className="shoes-hero">

          <img
            src="https://res.cloudinary.com/dzcaerfu7/image/upload/q_auto/f_auto/v1778966956/MEN_BC_PREFALL26_MAY26_14_DI3_ielkx0.webp"
            alt=""
          />

        </div>

        <h2 className="shoes-heading">
          Men's Shoes Collection
        </h2>

        <div className="shoes-grid">

          {shoeItems.map((item) => (

            <Link
              key={item._id}
              to={`/product/${slugify(item.title, {
                lower: true,
                strict: true,
              })}`}
              className="shoes-link"
            >

              <div className="shoes-card">

                <div className="shoes-image-box">

                  <div
                    className="shoes-heart"
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
                    className="shoes-image"
                  />

                </div>

                <div className="shoes-content">

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