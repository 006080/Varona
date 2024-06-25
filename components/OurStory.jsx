import React from 'react';
import styles from "../components/OurStory.module.css";
import videoBg from "../src/assets/Podium.mp4";

const OurStory = () => {
  return (
    <div>
      <video src={videoBg} loop autoPlay muted />
      <div className={styles.overlay}>
        <div className={styles.epigraph}>
          <p>
          
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurStory;