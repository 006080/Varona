import styles from "./Form.module.css";
import { useState } from "react";
import SubmitModal from "./SubmitModal";

const Form = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
    terms: "no", // Initialize terms to "no" (valid value)
  });

  // State to handle modal visibility
  const [openModal, setOpenModal] = useState(false);

  const fullWidthStyles = [styles.inputWrapper, styles.fullWidth].join(" ");

  // Function to get the correct API endpoint based on environment
  const getApiUrl = () => {
    if (process.env.NODE_ENV === 'production') {
      return 'https://www.nataliyarodionova.com/api/submit'; // Production URL
    }
    return 'http://localhost:4000/api/submit'; // Local development URL
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...formFields };

    console.log('Submitting data:', data);

    try {
      const response = await fetch(getApiUrl(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Reset form fields, but keep terms as 'yes' or 'no' based on user input
        setFormFields({
          name: "",
          surname: "",
          email: "",
          message: "",
          terms: "yes", // Keep the terms value as is
        });

        // Open the modal after successful form submission
        setOpenModal(true);
      } else {
        alert("There was an error submitting the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was a network error.");
    }
  };

  const handleOnChange = (event) => {
    setFormFields((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  // Check if the form is valid (all fields must be filled, and terms must be accepted)
  const isFormValid =
    formFields.name &&
    formFields.surname &&
    formFields.email &&
    formFields.message &&
    formFields.terms === "yes";

  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Contact Us:</h1>
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
                required
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
                required
              />
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formFields.email}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className={fullWidthStyles}>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formFields.message}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className={fullWidthStyles}>
            <legend style={{ color: "grey", fontWeight: "200" }}>
              Do you agree to the terms?
            </legend>
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
          <div>
            <button
              className={styles.button}
              type="submit"
              disabled={!isFormValid}
            >
              Submit
            </button>
            <div className={styles.textArea}>
              <p style={{ fontStyle: "italic", fontFamily: "monospace" }}>
                We will respond to every email within 24 hours, from Monday to Saturday.
              </p>

              <p style={{ fontStyle: "italic", fontFamily: "monospace" }}>
                You can also call us at our toll-free number:{" "}
                <a
                  href="tel:+4917620652851"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  017620652851
                </a>{" "}
                - from 9AM to 9PM EST Monday to Friday, and 10AM to 9PM EST on Saturday.
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* Conditionally render the SubmitModal and pass onClose function */}
      {openModal && <SubmitModal onClose={() => setOpenModal(false)} />}
    </>
  );
};

export default Form;
