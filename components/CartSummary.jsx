import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./CartSummary.module.css";
import { useCart } from "./CartContext";

const CartSummary = ({ onClose }) => {
  const { cartItems, removeFromCart } = useCart();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className={styles.cartSummary}>
      <div className={styles.header}>
        <h3>Order Summary</h3>
        <FontAwesomeIcon icon={faTimes} className={styles.closeIcon} onClick={onClose} />
      </div>
      <div className={styles.itemList}>
        {cartItems.map((item) => (
          <div key={item.name} className={styles.item}>
            <p>{item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
            <button style={{backgroundColor:"black", marginBottom:"15px"}} onClick={() => removeFromCart(item.name)}>Remove</button>
          </div>
        ))}
      </div>
      <p>Total Items: {totalItems}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
    </div>
  );
};

CartSummary.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CartSummary;