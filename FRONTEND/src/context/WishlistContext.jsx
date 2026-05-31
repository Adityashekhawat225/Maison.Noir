import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(
      localStorage.getItem("wishlist")
    ) || [];
  });

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const toggleWishlist = (product) => {

    const exists = wishlist.find(
      (item) => item._id === product._id
    );

    if (exists) {

      setWishlist(
        wishlist.filter(
          (item) => item._id !== product._id
        )
      );

    } else {

      setWishlist([
        ...wishlist,
        product
      ]);

    }
  };

  const removeFromWishlist = (id) => {

    setWishlist(
      wishlist.filter(
        (item) => item._id !== id
      )
    );

  };

  const isWishlisted = (id) => {

    return wishlist.some(
      (item) => item._id === id
    );

  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        isWishlisted
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () =>
  useContext(WishlistContext);