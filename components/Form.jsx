import styles from "./Form.module.css";
import { useState } from "react";

const Form = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    surname: "",
    email: "",
    country: "",
    message: "",
    terms: "",
  });

  const fullWidthStyles = [styles.inputWrapper, styles.fullWidth].join(" ");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { ...formFields };
    console.log(data);
  };

  const handleOnChange = (event) => {
    setFormFields((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>

      <br></br>


      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputWrapperRow}>
            <div className={styles.inputItem}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formFields.name}
                onChange={handleOnChange}
              />
            </div>
            <div className={styles.inputItem}>
              <label htmlFor="surname">Surname:</label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={formFields.surname}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formFields.email}
              onChange={handleOnChange}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="country">Country:</label>
            <select
              id="country"
              name="country"
              value={formFields.country}
              onChange={handleOnChange}
            >
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="Mexico">Mexico</option>
            </select>
          </div>
          <div className={fullWidthStyles}>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formFields.message}
              onChange={handleOnChange}
            />
          </div>
          <div className={fullWidthStyles}>
            <legend style={{color:'grey', fontWeight:"200"}}>Do you agree to the terms?</legend>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="terms"
                  value="yes"
                  checked={formFields.terms === "yes"}
                  onChange={handleOnChange}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="terms"
                  value="no"
                  checked={formFields.terms === "no"}
                  onChange={handleOnChange}
                />{" "}
                No
              </label>
            </div>
          </div>
          <div >
            <button
              className={styles.button}
              type="submit"
              // disabled={formFields.terms === "no" || formFields.terms === ""}
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <br></br>
      <br></br>
      <br></br>

    </>
  );
};

export default Form;
