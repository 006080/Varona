import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  const handlClick = () => {
navigate("/shop")
  }
  return (
    <div className={styles.fon}>
      <div className={styles.sloganBlog}>
        <h1>Unvveil Timeless Beauty</h1>
        <h2>Masterpieces in Wool Designs</h2>
        <Button className={styles.homeButton} onClick={handlClick}>
          Shop Now
        </Button>
      </div>
    </div>
  );
};

export default Home;
