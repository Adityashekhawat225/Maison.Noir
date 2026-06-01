import axios from "axios";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import slugify from "slugify";

export default function LuxuryBags() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getBags = async () => {
      const { data } = await axios.get("https://maison-noir-jt67.onrender.com/api/v1/products");

      const luxuryBags = data.filter(
        (product) => product.category === "luxury bags & wallets",
      );

      setProducts(luxuryBags);
    };

    getBags();
  }, []);

  return (
    <div>
      <h1>Luxury Bags</h1>

      <div className="products">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${slugify(product.title, {
              lower: true,
              strict: true,
            })}`}
            className="bags-link"
          >
            <div className="product">
              <img src={product.image} alt={product.title} width="250" />

              <h2>{product.title}</h2>

              <p>{product.description}</p>

              <p>₹{product.price?.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
