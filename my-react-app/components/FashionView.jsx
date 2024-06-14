import Nav from "./Nav";
import logo from "../src/assets/Logo.webp";
import Cart from "./Cart";
import User from "../src/assets/User";
import styles from "../components/FashionView.module.css";
import { useNavigate } from "react-router-dom";

const FashionView = () => {
  const navigate = useNavigate();
  return (
    <>
    <Nav className={Nav}>
      <div className={styles.navigation}>
        <div>
          <img onClick= {()=>navigate("/")} src={logo} alt="Shopping Cart" width={130} />
        </div>

        <div className={styles.navbar}>
          <ul>
            <li>
              <p onClick={() => navigate("/ourstory")}>Our Story</p>
            </li>
            <li>
              <p onClick={() => navigate("/ourservice")}>Our Service</p>
            </li>
            <li>
              <p onClick={() => navigate("/blog")}>Blog</p>
            </li>
            <li>
              <p onClick={() => navigate("/shop")}>Shop</p>
            </li>
            <li>
              <p onClick={() => navigate("/contacts")}>Contacts</p>
            </li>
          </ul>
        </div>

        <div className={styles.icons}>
          <Cart></Cart>
          <User></User>
        </div>
      </div>
    </Nav>

    </>
  );
};

export default FashionView;
