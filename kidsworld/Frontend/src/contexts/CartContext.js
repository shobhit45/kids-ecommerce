import React, { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const backend = process.env.REACT_APP_HOST_DOM || "http://localhost:5000";
  // cart state
  const [cart, setCart] = useState([]);
  const [cartItem, setCartItem] = useState();
  const [cartDetails, setCartDetails] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  // total price state

  const getCartDetails = async () => {
    console.log("going for cart deetials fetch");
    try {
      if (localStorage.getItem("authToken")) {
        const response = await fetch(`${backend}/api/wishlist/getWishList`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authToken"),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch wishlist details");
        }

        const cartData = await response.json();
        // console.log("Cart data:", cartData);
        console.log("cart data is", cartData);
        // Fetch product details for each item in the cart
        const productDetailsPromises = cartData.Data.map(async (item) => {
          const response = await fetch(
            `${backend}/api/products/getProduct/${item.data_ID}`
          );
          if (!response.ok) {
            throw new Error(
              `Failed to fetch product details for item with data_ID: ${item.data_ID}`
            );
          }
          return response.json();
        });

        // Resolve all product details promises
        const productDetailsArray = await Promise.all(productDetailsPromises);
        // console.log("Product details:", productDetailsArray);

        // Update state with cart and product details
        setCartItem(cartData); // cotains the respone
        setCart(cartData.Data); // array of items
        setCartDetails(productDetailsArray);
      }
    } catch (error) {
      console.error("Error while fetching:", error.message);
      alert(error.message || "Error while fetching. Please try again later.");
    }
  };

  useEffect(() => {
    getCartDetails();
  }, []);

  useEffect(() => {
    if (cartDetails) {
      let sum = 0;
      // console.log(cartData, cart);
      cart.forEach((m, k) => {
        sum = sum + cart[k]?.quantity * cartDetails[k]?.price;
      });
      setTotal(sum);
      console.log(total);
    }
  }, [cart, cartDetails]);

  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.quantity;
      }, 0);

      setItemAmount(amount);
    }
  }, [cart]);

  const addToCart = async (dataId, quantity) => {
    try {
      console.log(dataId, quantity);
      const response = await fetch(`${backend}/api/wishlist/CreateWishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ dataId, quantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to wishlist");
      }

      const responseData = await response.json();
      console.log(responseData);
      alert("Item added to wishlist successfully!");
      getCartDetails();
    } catch (error) {
      console.error("Error while adding item to wishlist:", error.message);
      alert(
        error.message ||
          "Error while adding item to wishlist. Please try again later."
      );
    }
  };

  // remove from cart
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };

  // cleart cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        itemAmount,
        total,
        cartItem,
        cartDetails,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
