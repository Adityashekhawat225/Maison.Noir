import axios from "axios";
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { toast } from "sonner";
import { useWishlist } from "../context/WishlistContext";

import "../Styles/jewellery.css";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";

import { Link } from "react-router-dom";
import slugify from "slugify";

export default function LuxuryJewellery() {

  const [jewelleryItems, setJewelleryItems] = useState([]);

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  useEffect(() => {

    const getLuxuryJewellery = async () => {

      try {

        const { data } = await axios.get(
          "https://maison-noir-jt67.onrender.com/api/v1/products"
        );

        const filteredJewellery = data.filter(
          (item) => item.category === "luxury jewellery"
        );

        setJewelleryItems(filteredJewellery);

      } catch (error) {

        console.log(error);

      }

    };

    getLuxuryJewellery();

  }, []);

  return (
    <>
      <Nav />

      <section className="jewellery-section">

        <div className="jewellery-hero">

          <img
            src="https://res.cloudinary.com/dzcaerfu7/image/upload/q_auto/f_auto/v1778393071/eric-fung-Z0GZrpwcc5Y-unsplash_ruzzlj.jpg"
            alt=""
          />

        </div>

        <h2 className="jewellery-heading">
          Luxury Jewellery Collection
        </h2>

        <div className="jewellery-grid">

          {jewelleryItems.map((item) => (

            <Link
              key={item._id}
              to={`/product/${slugify(item.title, {
                lower: true,
                strict: true,
              })}`}
              className="jewellery-link"
            >

              <div className="jewellery-card">

                <div className="jewellery-image-box">

                  <div
                    className="jewellery-heart"
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
                    className="jewellery-image"
                  />

                </div>

                <div className="jewellery-content">

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