import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../moduleCSS/Register.module.css";
import { SignUp } from '../api/users';

const Register = () => {

  const navigate = useNavigate();
  const [login, setLogin] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

  const handleSingUpClick = async() => {
      try{
          const res = await SignUp(login, phone, password, passwordConfirm);
          console.log(res)
          alert(res.data.message)
          if (res.status === 201){
              navigate('/');
          }
      }catch (error) {
        alert(`Помилка: ${error.response.data && error.response.data.message}`)
        console.log("Error:", error);
      }
    }

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
              <input type="text" placeholder="Введіть логін" value={login} onChange={(e) => setLogin(e.target.value)}/>
            </div>
            <div className={styles.inputGroup}>
              <label>Номер телефону</label>
              <input type="text" placeholder="Введіть номер телефону" value={phone} onChange={(e) => setPhone(e.target.value)}/>
            </div>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.inputGroup}>
              <label>Пароль</label>
              <input type="password" placeholder="Введіть пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className={styles.inputGroup}>
              <label>Підтвердження паролю</label>
              <input type="password" placeholder="Введіть пароль" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
            </div>
          </div>
        </div>
        <button className={styles.button} onClick={handleSingUpClick}>Зареєструватися</button>
      </div>
    </div>
  );
};

export default Register;