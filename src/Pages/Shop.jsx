import { useState } from "react";
import CardProduct from "../../components/CardProduct";
import CartSummary from "../../components/CartSummary";
import styles from "./Shop.module.css";

// Cloudinary imports
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

// Initialize Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: "dwenvtwyx" // Replace with your Cloudinary cloud name
  }
});

// Define your Cloudinary images
const collarImage = cld.image('collar_vzz5yo'); // Replace with your public ID
const scarfImage = cld.image('image_6483441_8_lr6b1a'); // Replace with your public ID
const trousersImage = cld.image('trousers_x3ryc0'); // Replace with your public ID

const Shop = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const addToCart = (product) => {
    // Check if the product is already in cart
    const existingProductIndex = cartItems.findIndex(
      (item) => item.name === product.name
    );

    if (existingProductIndex !== -1) {
      // Product already exists in cart, update quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingProductIndex].quantity += product.quantity;
      setCartItems(updatedCartItems);
    } else {
      // Product does not exist in cart, add new product
      setCartItems([...cartItems, product]);
    }
    // Show cart summary when an item is added
    setCartIsOpen(true);
  };

  const handleCloseCart = () => {
    setCartIsOpen(false);
  };

  return (
    <div className={styles.shop}>
      <CardProduct
        onClick={addToCart}
        image={<AdvancedImage cldImg={collarImage} alt="COLLAR" />}
        name="COLLAR"
        price={180}
        description="Made entirely from 100% cotton, this collar ensures comfort and breathability. The ruffled style, adorned with delicate lace detailing, exudes vintage elegance. Convenient drawstrings at the front allow for easy closure or adjustment."
      />

      <CardProduct
        onClick={addToCart}
        image={<AdvancedImage cldImg={scarfImage} alt="SCARF" />}
        name="SCARF"
        price={180}
        description="Made entirely from 100% cotton, this scarf ensures comfort and breathability. The ruffled style, adorned with delicate lace detailing, exudes vintage elegance. Convenient drawstrings at the front allow for easy closure or adjustment."
      />

      <CardProduct
        onClick={addToCart}
        image={<AdvancedImage cldImg={trousersImage} alt="TROUSERS" />}
        name="TROUSERS"
        price={180}
        description="Made entirely from 100% cotton, these trousers ensure comfort and breathability. The ruffled style, adorned with delicate lace detailing, exudes vintage elegance. Convenient drawstrings at the front allow for easy closure or adjustment."
      />
      

      {cartIsOpen && (
        <div>
          <CartSummary cartItems={cartItems} onClose={handleCloseCart} />
        </div>
      )}
    </div>
  );
};

export default Shop;