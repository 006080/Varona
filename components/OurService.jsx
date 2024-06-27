import React from 'react';
import styles from "../components/OurService.module.css";
import viola from "../src/assets/Fiola.jpeg";
import couple from "../src/assets/cople.jpg";
import sommer from "../src/assets/sommer.jpg";
import mialejournal from "../src/assets/MIA-LE-JOURNAL-07.jpg";
import woolen from "../src/assets/woolen.jpg";
import bissiol from "../src/assets/bissiol.jpg";
import mialogo from "../src/assets/LOGO-WEB-BIANCO.png";
import revista from "../src/assets/revista.jpg";
import undrogin from "../src/assets/undrogin.jpg";

const OurService = () => {
  return (
    <div className={styles.ordnung}>
      <section>
        <img src={viola} alt="Viola" />
      </section>
      <section className={styles.sectionStyle}>
        <div className={styles.textContainer}>
          <h1>Our Mission:</h1>
          <p>
            Welcome to VARONA, where elegance meets poetry in the realm of Fashion.
            Inspired by the graceful allure of crows, our brand crafts
            sophisticated wardrobe essentials and accessories for both men and
            women from the finest Italian wool and cashmere. In shades of grey,
            white, and black, VARONA embodies a captivating amalgamation of
            refinement and lyrical resonance. Explore our collection and embrace
            the timeless charm that defines VARONA - where every piece tells a
            story, and style becomes a poetic manifestation of uniqueness.
          </p>
        </div>
      </section>
      <section>
        <img src={woolen} alt="Woolen" />
      </section>
      <section className={styles.sectionMission}>
        <div className={styles.textContainer}>
          <h1>Our Style:</h1>
          <p>
            Our mission is more than just creating handmade knitwear. Recognizing
            the uniqueness of each client, our approach is far from
            one-size-fits-all. We take the time to understand, adapt, and create
            bespoke pieces that resonate with your individual style. We set the
            highest standards, ensuring every piece is a testament to quality,
            personalized service, and guarantees of satisfaction. Your trust is
            our most cherished possession. Beyond transactions, Varona is a haven
            of care and warmth. We build relationships, providing personalized
            attention to ensure you feel embraced throughout your journey with us.
          </p>
        </div>
      </section>
      <section>
        <img src={couple} alt="Couple" />
      </section>
      <section className={styles.sectionMaterials}>
        <div className={styles.textContainer}>
          <h1>Materials:</h1>
          <p>
            Welcome to VARONA, where elegance meets poetry in the realm of Fashion.
            Inspired by the graceful allure of crows, our brand crafts
            sophisticated wardrobe essentials and accessories for both men and
            women from the finest Italian wool and cashmere. In shades of grey,
            white, and black, VARONA embodies a captivating amalgamation of
            refinement and lyrical resonance. Explore our collection and embrace
            the timeless charm that defines VARONA - where every piece tells a
            story, and style becomes a poetic manifestation of uniqueness.
          </p>
        </div>
      </section>
      <section>
        <img src={sommer} alt="Sommer" />
      </section>
      <section className={styles.sectionService}>
        <div className={styles.textContainer}>
          <h1>Our Concept:</h1>
          <p>
          Varona is more than a brand; It's an embodiment of elegance, a fusion of mystery, and a celebration of timeless shades like black, grey, and white. Founded by Nataliya Rodionova, Varona originated from the creative depths cultivated during her education at a sartorial school in Ukraine and Istituto Marangoni in Milan.
          </p>
        </div>
      </section>
      <section className={styles.miaLogoContainer}>
        <a href="https://www.mia-lejournal.com/fashion/569-the-beauty-of-solitude.html" target="_blank" rel="noopener noreferrer">
          <img src={mialejournal} alt="Miale Journal" />
          <img className={styles.miaLogo} src={mialogo} alt="MIA Logo" />
        </a>
      </section>
      <section className={styles.sectionService}>
        <div className={styles.textContainer}>
          <h1>Our Service:</h1>
          <p>
            We specialize in creating exclusive, handmade items and accessories
            tailored for both men and women. Using only premium natural materials,
            we're here to turn your boldest visions into reality.
          </p>
        </div>
      </section>
      <section>
        <img className={styles.fullWidthImage} src={revista} />
      </section>
      <section className={styles.sectionCustomers}>
        <div className={styles.textContainer}>
          <h1>Our Customers:</h1>
          <p>
            We specialize in creating exclusive, handmade items and accessories
            tailored for both men and women. Using only premium natural materials,
            we're here to turn your boldest visions into reality.
          </p>
        </div>
      </section>
      <section>
        <img className={styles.fullWidthImage} src={undrogin} />
      </section>
      
      <section className={styles.sectionCustomers}>
        <div className={styles.textContainer}>
          <h1>Our Customers:</h1>
          <p>
            We specialize in creating exclusive, handmade items and accessories
            tailored for both men and women. Using only premium natural materials,
            we're here to turn your boldest visions into reality.
          </p>
        </div>
      </section>
      
      <section>
        <img className={styles.fullWidthImage} src={bissiol} alt="Bissiol" />
      </section>
    </div>
  );
};

export default OurService;