
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import styles from '../LoginForm/LoginForm.module.css';
const ContactForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      name,
      number,
    };

    dispatch(addContact(newContact));
    setName("");
    setNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input className={styles.inputField}
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input className={styles.inputField}
        type="tel"
        placeholder="Phone number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button className={styles.inputField} type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;
