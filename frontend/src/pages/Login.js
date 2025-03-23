import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import style from '../moduleCSS/Login.module.css';

const Login = () => {

    const navigate = useNavigate();

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleToSignUp = () => {
        navigate('/register')
    }

    return (
        <div className={style.Login}>
            <div className={style.container}>
                <h1>Закарпаття Енерго</h1>
                <form className={style.form}>
                    <div className={style.inputGroup}>
                        <label htmlFor="username">Логін</label>
                        <input type="text" id="username" placeholder="Введіть логін" />
                    </div>
                    <div className={style.inputGroup}>
                        <label htmlFor="password">Пароль</label>
                        <div className={style.passwordContainer}>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                placeholder="Введіть пароль"
                            />
                            <button type="button" onClick={togglePasswordVisibility} className={style.eyeIcon}>
                                {passwordVisible ? 'Сховати' : 'Показати'}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className={style.submitButton}>Авторизуватися</button>
                    <div className={style.orText}>або</div>
                    <button type="button" className={style.registerButton} onClick={handleToSignUp}>Зареєструватися</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
