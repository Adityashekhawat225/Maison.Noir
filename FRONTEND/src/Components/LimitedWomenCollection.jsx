import axios from "axios";
import { useState, useEffect } from "react";
import "../Styles/latestWomen.css";

import { Link } from "react-router-dom";
import slugify from "slugify";

export default function LatestWomen() {
  const [latestCollection, setLatestCollection] = useState([]);

  useEffect(() => {
    const getLatestProduct = async () => {
      try {
        const { data } = await axios.get(
          "https://maison-noir-jt67.onrender.com/api/v1/products",
        );

        const scarfProduct = data.filter(
          (product) => product.title === "Elite Women's Luxury Outfit",
        );

        setLatestCollection(scarfProduct);
      } catch (err) {
        console.log(err);
      }
    };

    getLatestProduct();
  }, []);

  return (
    <div className="hero-container">
      {latestCollection.map((product) => (
        <Link
          key={product._id}
          to={`/product/${slugify(product.title, {
            lower: true,
            strict: true,
          })}`}
          className="hero-link"
        >
          <div className="hero-card">
            <div className="hero-image-box">
              <img
                src={product.image}
                alt={product.title}
                className="hero-image"
              />
            </div>

            <div className="hero-content">
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
