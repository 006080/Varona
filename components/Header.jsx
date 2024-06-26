import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import logo from "../src/assets/Logo.webp";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import CartSummary from "./CartSummary";
import { useCart } from "./CartContext";

const Header = () => {
  const navigate = useNavigate();
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [menu, openMenu] = useState(false);
  const { cartItems } = useCart();

  const isContactPage = location.pathname === "/contacts";

  const handleCartClick = () => {
    setCartIsOpen(!cartIsOpen);
  };

  const toggleMenu = () => {
    openMenu(!menu);
  };

  return (
    <Nav>
    <div className={`${styles.navigation} ${isContactPage ? styles.blackBackground : ''}`}>
        <div onClick={()=> navigate("/")} className={styles.logo}>
          <img className={styles.logotype} onClick={() => navigate("/")} src={logo} alt="Shopping Cart" />
        </div>
        <div className={styles.navbar}>
          <ul className={styles.navLinks}>
            <li><p onClick={() => navigate("/ourstory")}>Our Story</p></li>
            <li><p onClick={() => navigate("/ourservice")}>Our Service</p></li>
            <li><p onClick={() => navigate("/blog")}>Blog</p></li>
            <li><p onClick={() => navigate("/shop")}>Shop</p></li>
            <li><p onClick={() => navigate("/contacts")}>Contacts</p></li>
          </ul>
        </div>
        <div className={styles.icons}>
          <div>
            <FontAwesomeIcon onClick={handleCartClick} className={styles.cartIcon} icon={faCartShopping} />
            {cartItems.length > 0 && <span className={styles.cartCount}>{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>}
            {cartIsOpen && <CartSummary cartItems={cartItems} onClose={() => setCartIsOpen(false)} />}
          </div>
          <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
          <FontAwesomeIcon className={styles.burgerIcon} onClick={toggleMenu} icon={faBars} />
        </div>
        {menu && (
          <div className={styles.dropdownMenu}>
            <ul className={styles.dropdownLinks}>
              <li><p onClick={() => navigate("/ourstory")}>Our Story</p></li>
              <li><p onClick={() => navigate("/ourservice")}>Our Service</p></li>
              <li><p onClick={() => navigate("/blog")}>Blog</p></li>
              <li><p onClick={() => navigate("/shop")}>Shop</p></li>
              <li><p onClick={() => navigate("/contacts")}>Contacts</p></li>
            </ul>
          </div>
        )}
      </div>
    </Nav>
  );
};

export default Header;