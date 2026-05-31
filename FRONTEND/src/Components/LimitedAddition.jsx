import axios from "axios";
import { useState, useEffect } from "react";
import "../Styles/limitedAddition.css";

export default function LimitedAddition() {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const getMaison = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/products"
        );

        setCollection(data.slice(78,79));

      } catch (err) {
        console.log(err);
      }
    };

    getMaison();
  }, []);

  return (
    <>
      <div className="limited-container">

        {collection.map((product) => (

          <div
            className="limited-card"
            key={product._id}
          >

            <div className="limited-image-box">

              <img
                src={product.image}
                className="limited-image"
                alt=""
              />

            </div>

          </div>

        ))}

      </div>
    </>
  );
}