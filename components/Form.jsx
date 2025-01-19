import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./Form.module.css";
import SubmitModal from "./SubmitModal";

const Form = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
    terms: "no",
  });

  const [status, setStatus] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const recaptchaRef = useRef();

  const fullWidthStyles = [styles.inputWrapper, styles.fullWidth].join(" ");

  const getApiUrl = () => {
    if (import.meta.env.VITE_NODE_ENV === "production") {
      return `${import.meta.env.VITE_API_BASE_URL_PROD}/api/feedback`;
    }
    return `${import.meta.env.VITE_API_BASE_URL_LOCAL}/api/feedback`;
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const captchaToken = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset(); 

      const data = { ...formFields, captchaToken };

      const response = await fetch(getApiUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormFields({
          name: "",
          surname: "",
          email: "",
          message: "",
          terms: "no",
        });
        setOpenModal(true); 
        setStatus("Message sent successfully!");
      } else {
        try {
          const errorData = await response.json();
          setStatus(errorData.message || "There was an error sending the message.");
        } catch (jsonError) {
          setStatus("An unknown error occurred. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("Network error. Please try again later.");
    }
  };

  const handleOnChange = (event) => {
    setFormFields((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

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
      <ReCAPTCHA
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          size="invisible"
          ref={recaptchaRef}
        />
      {openModal && <SubmitModal onClose={() => setOpenModal(false)} />}
    </>
  );
};

export default Form;

