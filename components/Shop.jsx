import { useState } from "react";
import CardProduct from "../components/CardProduct";
import CartSummary from "../components/CartSummary";
import scarf from "../src/assets/scarf.jpg";
import trousers from "../src/assets/trousers.jpg";
import top from "../src/assets/top.png";
import img1 from "../src/assets/collar.jpg";
import mantel from "../src/assets/manto.jpg";
import sweater from "../src/assets/sweater.jpg";
import styles from "../components/Shop.module.css";

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
        image={img1}
        name="COLLAR"
        price={180}
        description="Made entirely from 100% cotton, this collar ensures comfort and breathability. The ruffled style, adorned with delicate lace detailing, exudes vintage elegance. Convenient drawstrings at the front allow for easy closure or adjustment."
      />
      <CardProduct
        onClick={addToCart}
        image={scarf}
        name="SCARF"
        price={220}
        description="This exquisite scarf, crafted from 100% Italian Wool, boasts a luxurious feel and timeless appeal. The loosely spun wool creates a cosy texture, perfect for chilly days. Available in various shades."
      />
      <CardProduct
        onClick={addToCart}
        image={trousers}
        name="TROUSERS"
        price={1120}
        description="These 100% woolen trousers offer both style and versatility. The upper part of the trousers is removable, allowing you to mix and match with other wardrobe items. Geometric pattern crafted by hand."
      />
      <CardProduct
        onClick={addToCart}
        image={sweater}
        name="SWEATER"
        price={820}
        description="This luxurious sweater combines the softness of cashmere with intricate handmade woolen patterns. Crafted from premium cashmere, this sweater offers unparalleled comfort. Available in various shades."
      />
      <CardProduct
        onClick={addToCart}
        image={mantel}
        name="SHAWL"
        price={320}
        description="Crafted from high-quality cashmere, this shawl ensures warmth and elegance. Whether draped over your shoulders during cool evenings or worn as a statement piece, this shawl complements any outfit."
      />
      <CardProduct className={styles.top}
        onClick={addToCart}
        image={top}
        name="Woolen TOP"
        price={220}
        description="This exquisite scarf, crafted from 100% Italian Wool, boasts a luxurious feel and timeless appeal. The loosely spun wool creates a cosy texture, perfect for chilly days. Available in various shades."
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