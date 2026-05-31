import axios from "axios";
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import "../Styles/earlyExcessBags.css";

import { Link } from "react-router-dom";
import slugify from "slugify";

export default function EarlyExcessBags() {

    const [bagItems, setBagItems] = useState([]);

    useEffect(() => {

        const getLuxuryBags = async () => {

            const { data } = await axios.get(
                "http://localhost:5000/api/v1/products"
            );

            const filteredBags = data
                .filter(
                    (item) =>
                        item.category === "luxury bags & wallets"
                )
                .slice(4, 8);

            setBagItems(filteredBags);

        };

        getLuxuryBags();

    }, []);

    return (

        <div className="luxury-section">

            <h1 className="luxury-heading">

                Luxury Bags

            </h1>


            <div className="bags-wrapper">

                {bagItems.map((item) => (

                    <Link
                        key={item._id}
                        to={`/product/${
                            slugify(item.title, {
                                lower: true,
                                strict: true
                            })
                        }`}
                        className="bags-link"
                    >

                        <div className="bag-card">

                            <div className="image-container">

                                <div className="wishlist-icon">

                                    <FiHeart />

                                </div>


                                <div className="bag-img-wrap">

                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="bag-image"
                                    />

                                </div>

                            </div>


                            <div className="bag-info">

                                <h2 className="bag-title">

                                    {item.title}

                                </h2>

                                <p className="bag-price">

                                    ₹{item.price?.toLocaleString()}

                                </p>

                            </div>

                        </div>

                    </Link>

                ))}

            </div>

        </div>

    );

}