import Nav from "../Components/Nav";
import {
  FaTrash,
  FaMinus,
  FaPlus
} from "react-icons/fa";

import { useCart } from "../context/CartContext";

import "../Styles/usecart.css"

export default function Cart() {

  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty
  } = useCart();

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Nav />

      <div className="cart-page">

        <h1 className="cart-title">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (

          <div className="empty-cart">

            <h2>
              Your Cart Is Empty
            </h2>

            <p>
              Add some luxury products
              to your cart.
            </p>

          </div>

        ) : (

          <>

            <div className="cart-container">

              {cart.map((item) => (

                <div
                  className="cart-card"
                  key={item._id}
                >

                  <img
                    src={item.image}
                    alt={item.title}
                  />

                  <div className="cart-info">

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      ₹{item.price}
                    </p>

                    <div className="qty-box">

                      <button
                        onClick={() =>
                          decreaseQty(
                            item._id
                          )
                        }
                      >
                        <FaMinus />
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQty(
                            item._id
                          )
                        }
                      >
                        <FaPlus />
                      </button>

                    </div>

                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeFromCart(
                        item._id
                      )
                    }
                  >
                    <FaTrash />
                  </button>

                </div>

              ))}

            </div>

            <div className="cart-summary">

              <h2>
                Total: ₹{totalPrice}
              </h2>

              <button className="checkout-btn">
                Proceed To Checkout
              </button>

            </div>

          </>

        )}

      </div>
    </>
  );
}