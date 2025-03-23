import React from "react";
import styles from "../moduleCSS/Register.module.css";

const Register = () => {
  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => window.history.back()}>
        Повернутися
      </button>

      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Реєстрація</h2>
        <div className={styles.form}>
          <div className={styles.leftSide}>
            <div className={styles.inputGroup}>
              <label>Логін</label>
              <input type="text" placeholder="Введіть логін" />
            </div>
            <div className={styles.inputGroup}>
              <label>Номер телефону</label>
              <input type="text" placeholder="Введіть номер телефону" />
            </div>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.inputGroup}>
              <label>Пароль</label>
              <input type="password" placeholder="Введіть пароль" />
            </div>
            <div className={styles.inputGroup}>
              <label>Підтвердження паролю</label>
              <input type="password" placeholder="Введіть пароль" />
            </div>
          </div>
        </div>
        <button className={styles.button}>Зареєструватися</button>
      </div>
    </div>
  );
};

export default Register;