
import Form from "./Form";
import styles from "./Contacts.module.css";

const Contacts = ({ backgroundImage }) => {
  return (
    <>
   
    <div className={styles.background}>
    {/* <h1 style={{color:'white', marginTop:"80px", marginBottom:"5px", fontSize:'36px'}}>Contacts:</h1> */}
      <div>
      
          <Form />
   
    </div>
    </div>
    </>
  );
};

export default Contacts;