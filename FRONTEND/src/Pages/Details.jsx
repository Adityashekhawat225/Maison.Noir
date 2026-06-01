import axios from "axios";
import slugify from "slugify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import { toast } from "sonner";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useWishlist } from "../context/WishlistContext";
import "../Styles/details.css";

export default function Details() {

    const { slug } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const {
        toggleWishlist,
        isWishlisted,
    } = useWishlist();

    useEffect(() => {

        const getSingleProduct = async () => {

            try {

                const { data } = await axios.get(
                    "https://maison-noir-jt67.onrender.com/api/v1/products"
                );

                const foundProduct = data.find(
                    (item) =>
                        slugify(
                            item.title.trim(),
                            {
                                lower: true,
                                strict: true,
                            }
                        ) === slug
                );

                setProduct(foundProduct);

            } catch (error) {

                console.log(error);

                toast.error(
                    "Something Went Wrong"
                );

            } finally {

                setLoading(false);

            }

        };

        getSingleProduct();

    }, [slug]);

    if (loading) {

        return <h1>Loading...</h1>;

    }

    if (!product) {

        return <h1>Product Not Found</h1>;

    }

    return (

        <>

            <Nav />

            <div className="details-page">

                <div className="details-left">

                    <img
                        src={product.image}
                        alt={product.title}
                        className="details-image"
                    />

                </div>

                <div className="details-right">

                    <p className="details-code">

                        M28548

                    </p>

                    <h1 className="details-title">

                        {product.title}

                    </h1>

                    <h2 className="details-price">

                        ₹{product.price?.toLocaleString()}

                    </h2>

                    <p className="details-tax">

                        (M.R.P. incl. of all taxes)

                    </p>

                    <div
                        className="wishlist-btn"
                        onClick={() => {

                            const alreadyAdded =
                                isWishlisted(product._id);

                            toggleWishlist(product);

                            if (alreadyAdded) {

                                toast.error(
                                    `${product.title} removed from wishlist`
                                );

                            } else {

                                toast.success(
                                    `${product.title} added to wishlist`
                                );

                            }

                        }}
                    >

                        {
                            isWishlisted(product._id)
                                ? <FaHeart size={24} color="red" />
                                : <FiHeart size={24} />
                        }

                    </div>

                    <button
                        className="details-btn"
                        onClick={() =>
                            toast.success(
                                "Added To Cart"
                            )
                        }
                    >

                        Contact Concierge Services

                    </button>

                    <p className="details-support">

                        Our Digital Concierge is available if you have any
                        question on this product.

                        <span>

                            Contact us

                        </span>

                    </p>

                    <p className="details-description">

                        {product.description}

                    </p>

                    <div className="read-more">

                        Read More

                    </div>

                    <div className="info-section">

                        <span>

                            Sustainability

                        </span>

                        <span>+</span>

                    </div>

                    <div className="info-section">

                        <span>

                            Product Care

                        </span>

                        <span>+</span>

                    </div>

                    <div className="info-section">

                        <span>

                            Find in Store

                        </span>

                        <span>+</span>

                    </div>

                    <div className="delivery-section">

                        <div className="delivery-item">

                            <span>

                                Delivery & Returns

                            </span>

                            <span>›</span>

                        </div>

                        <div className="delivery-item">

                            <span>

                                Gifting

                            </span>

                            <span>›</span>

                        </div>

                    </div>

                </div>

            </div>

            <Footer />

        </>

    );

}