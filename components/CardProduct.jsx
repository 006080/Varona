import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import styles from "./CardProduct.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useCart } from './CartContext';

const CardProduct = ({ name, image, price, description }) => {
  const [count, setCount] = useState(0);
  const { addToCart } = useCart();

  const increment = () => setCount(count + 1);
  const decrement = () => count > 0 && setCount(count - 1);

  const itemAdd = () => {
    const product = { name, price, quantity: count };
    addToCart(product);
  };

  const [selectedStars, setSelectedStars] = useState(0);
  const handleStarClick = (starIndex) => setSelectedStars(starIndex + 1);

  return (
    <div className={styles.fashionItem}>
      <div className={styles.imageControl}>
        <img src={image} alt={name} />
      </div>

      <div className={styles.info}>
        <h3>{name}</h3>
        <div className={styles.notes}>
          <p className={styles.description}>Description:</p>
          <p>{description}</p>
        </div>

        <div className={styles.starPrice}>
          <p style={{ fontSize: "30px", fontStyle: "italic" }}>${price}</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {[...Array(5)].map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                style={{ color: index < selectedStars ? "yellow" : "grey", cursor: "pointer" }}
                onClick={() => handleStarClick(index)}
              />
            ))}
          </div>
        </div>

        <div className={styles.quanty}>
          <div className={styles.incriment}>
            <p className={styles.incr} onClick={decrement}>-</p>
            <p className={styles.incr}>{count}</p>
            <p className={styles.incr} onClick={increment}>+</p>
          </div>
          <Button onClick={itemAdd}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

CardProduct.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default CardProduct;