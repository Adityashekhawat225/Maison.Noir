import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({
  children
}) => {

  const [cart, setCart] = useState(() => {
    return JSON.parse(
      localStorage.getItem("cart")
    ) || [];
  });

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

  }, [cart]);

  const addToCart = (product) => {

    const exists = cart.find(
      item => item._id === product._id
    );

    if (exists) {

      toast.info(
        "Product already in cart"
      );

      return;
    }

    setCart([
      ...cart,
      {
        ...product,
        quantity: 1
      }
    ]);

    toast.success(
      "Added to cart successfully"
    );
  };

  const removeFromCart = (id) => {

    setCart(
      cart.filter(
        item => item._id !== id
      )
    );

    toast.success(
      "Product removed"
    );
  };

  const increaseQty = (id) => {

    setCart(
      cart.map(item =>
        item._id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1
            }
          : item
      )
    );
  };

  const decreaseQty = (id) => {

    setCart(
      cart.map(item =>
        item._id === id
          ? {
              ...item,
              quantity:
                Math.max(
                  1,
                  item.quantity - 1
                )
            }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);