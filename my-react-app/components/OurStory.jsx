import styles from "../components/OurStory.module.css";
import videoBg from "../src/assets/Podium.mp4";

const OurStory = () => {
  return (
    <div>
   
    <video src={videoBg} loop autoPlay muted/>

    <div className={styles.overlay}>
        {/* <h1 style={{color:"white", marginBottom:"500px"}}>Your Overlay Content Here</h1> */}
    </div>
</div>
  );
};

export default OurStory
