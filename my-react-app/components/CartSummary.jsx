import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./CartSummary.module.css";

const CartSummary = ({ cartItems }) => {
  const [isOpen, setIsOpen] = useState(true); // Initialize cart summary as open

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const toggleSummary = () => {
    setIsOpen(!isOpen); // Toggle the isOpen state
  };

  if (!isOpen) {
    return null; // Render nothing if isOpen is false (cart summary is closed)
  }

  return (
    <div className={styles.cartSummary}>
      <div className={styles.header}>
        <h3>Order Summary</h3>
        <FontAwesomeIcon icon={faTimes} className={styles.closeIcon} onClick={toggleSummary} />
      </div>
      <div className={styles.itemList}>
        {cartItems.map((item) => (
          <div key={item.name} className={styles.item}>
            <p>{item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
          </div>
        ))}
      </div>
      <p>Total Items: {totalItems}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
    </div>
  );
};

CartSummary.propTypes = {
  cartItems: PropTypes.array.isRequired,
};

export default CartSummary;