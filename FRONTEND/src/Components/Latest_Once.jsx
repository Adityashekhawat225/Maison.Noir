import axios from "axios";
import { useState, useEffect } from "react";
import { FiHeart } from "react-icons/fi";
import "../Styles/latest_once.css";

import { Link } from "react-router-dom";
import slugify from "slugify";

export default function LatestLuxury() {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/products",
        );

        setLatestProducts(data.slice(-4));
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, []);

  return (
    <section className="latest-section">
      <h1 className="latest-heading">The Latest</h1>

      <div className="latest-grid">
        {latestProducts.map((product) => (
          <Link
            key={product._id}
            to={`/product/${slugify(product.title, {
              lower: true,
              strict: true,
            })}`}
            className="latest-link"
          >
            <div className="latest-card">
              <div className="latest-image-box">
                <FiHeart className="latest-heart" />

                <img src={product.image} alt="" className="latest-image" />
              </div>

              <div className="latest-content">
                <h3>{product.title}</h3>

                <p>₹{product.price.toLocaleString()}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
