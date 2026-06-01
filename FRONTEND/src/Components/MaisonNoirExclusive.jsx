import axios from "axios";
import { useState, useEffect } from "react";
import { FiHeart } from "react-icons/fi";
import "../Styles/exclusive.css";

import { Link } from "react-router-dom";
import slugify from "slugify";

export default function ExclusiveMaisonCollection() {

    const [collection, setCollection] = useState([]);

    useEffect(() => {

        const getMaison = async () => {

            try {

                const { data } = await axios.get(
                    "https://maison-noir-jt67.onrender.com/api/v1/products"
                );

                const maisonCollection = data.slice(40, 44);

                setCollection(maisonCollection);

            } catch (err) {

                console.log(err);

            }

        };

        getMaison();

    }, []);

    return (

        <>

            <h1 className="exclusive-title">

                Exclusive Maison Collection

            </h1>


            <div className="exclusive-container">

                {collection.map((product) => (

                    <Link
                        key={product._id}
                        to={`/product/${
                            slugify(product.title, {
                                lower: true,
                                strict: true
                            })
                        }`}
                        className="exclusive-link"
                    >

                        <div className="exclusive-card">

                            <div className="image-box">

                                <div className="heart-icon">

                                    <FiHeart />

                                </div>


                                <div className="img-wrap">

                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="exclusive-image"
                                    />

                                </div>

                            </div>


                            <div className="product-info">

                                <h3 className="product-title">

                                    {product.title}

                                </h3>

                                <p className="price">

                                    ₹{product.price?.toLocaleString()}

                                </p>

                            </div>

                        </div>

                    </Link>

                ))}

            </div>


            <div className="discover-btn-wrap">

                <button className="discover-btn">

                    Discover the Collection

                </button>

            </div>

        </>

    );

}