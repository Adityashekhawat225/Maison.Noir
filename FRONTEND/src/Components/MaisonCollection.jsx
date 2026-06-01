import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/maison.css";

export default function MaisonCollection() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const getCollections = async () => {
      try {
        const { data } = await axios.get(
          "https://maison-noir-jt67.onrender.com/api/v1/products"
        );

        const allowedCategories = [
          "luxury watches",
          "luxury jewellery",
          "luxury women",
          "luxury men",
          "luxury bags & wallets",
          "luxury perfumes",
          "luxury shoes",
          "luxury accessories",
        ];

        const uniqueCollections = data
          .filter((item) =>
            allowedCategories.includes(item.category)
          )
          .filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (p) => p.category === item.category
              )
          );

        setCollections(uniqueCollections);
      } catch (error) {
        console.log(error);
      }
    };

    getCollections();
  }, []);

  const getCategoryLink = (category) => {
    switch (category) {
      case "luxury watches":
        return "/watches";

      case "luxury jewellery":
        return "/jewellery";

      case "luxury women":
        return "/women";

      case "luxury men":
        return "/men";

      case "luxury bags & wallets":
        return "/bags-wallets";

      case "luxury perfumes":
        return "/perfumes";

      case "luxury shoes":
      case "luxury accessories":
        return "/shoes-accessories";

      default:
        return "/";
    }
  };

  return (
    <section className="maison">
      <h1>
        Explore a Selection of the Maison's Creations
      </h1>

      <div className="maison_grid">
        {collections.map((item) => (
          <Link
            key={item._id}
            to={getCategoryLink(item.category)}
            className="maison_card"
          >
            <img
              src={item.image}
              alt={item.category}
            />

            <h2>
              {item.category
                .replace("luxury ", "")
                .replace("&", "and")
                .toUpperCase()}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  );
}