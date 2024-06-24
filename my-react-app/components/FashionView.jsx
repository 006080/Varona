import React, { useState } from "react";
import Header from "./Header";
import CartSummary from "./CartSummary";
import Shop from "./Shop";
import styles from "./FashionView.module.css";

const FashionView = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === product.name);
      if (existingItem) {
        return prevItems.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prevItems, product];
      }
    });
  };

  return (
    <div className={styles.container}>
      <Header setCartIsOpen={setCartIsOpen} />

      {cartIsOpen && <CartSummary cartItems={cartItems} onClose={() => setCartIsOpen(false)} />}

      <div className={styles.content}>
        <Shop addToCart={addToCart} />
      </div>
    </div>
  );
};

export default FashionView;