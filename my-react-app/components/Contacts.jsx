
import Form from "./Form";
import styles from "./Contacts.module.css";

const Contacts = ({ backgroundImage }) => {
  return (
    <div className={styles.background}>
      <div className={styles.content}>
          <Form />
      </div>
    </div>
  );
};

export default Contacts;