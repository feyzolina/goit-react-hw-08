import { useState } from "react";
import styles from "./Home.module.css";
import LoginForm from "../components/LoginForm/LoginForm";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";

const Home = () => {
  const [activeForm, setActiveForm] = useState(null);

  return (
    <div className={styles["home-container"]}>
      <h1 className={styles["home-title"]}>Hoşgeldiniz!</h1>
      <p className={styles["home-description"]}>
        Uygulamamıza giriş yapın veya kayıt olun.
      </p>
      {activeForm === null && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
          <button
            className={styles["home-btn"]}
            onClick={() => setActiveForm("login")}
          >
            Login
          </button>
          <button
            className={styles["home-btn"]}
            onClick={() => setActiveForm("register")}
          >
            Register
          </button>
        </div>
      )}
     {activeForm === "login" && (
  <div style={{ position: "relative" }}>
    <button
      className={styles["back-btn"]}
      onClick={() => setActiveForm(null)}
      aria-label="Geri"
    >
      &#8592;
    </button>
    <LoginForm />
  </div>
)}
{activeForm === "register" && (
  <div style={{ position: "relative" }}>
    <button
      className={styles["back-btn"]}
      onClick={() => setActiveForm(null)}
      aria-label="Geri"
    >
      &#8592;
    </button>
    <RegistrationForm />
  </div>
)}
    </div>
  );
};

export default Home;