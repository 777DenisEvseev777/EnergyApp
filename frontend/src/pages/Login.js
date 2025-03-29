import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import style from '../moduleCSS/Login.module.css';

import { Authentication } from '../api/users';

const Login = () => {

    const navigate = useNavigate();
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();

    const handleLogInClick = async() => {
        try{
            const res = await Authentication(login, password)
            if (res.token){
                navigate('/client_community');
            }
            console.log(res);
        }catch (error) {
            console.log("Error:", error.response?.data?.message || error.message || "Невідома помилка");
        }
    }

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
                <div className={style.form}>
                    <div className={style.inputGroup}>
                        <label htmlFor="username">Логін</label>
                        <input type="text" id="username" placeholder="Введіть логін" value={login} onChange={(e) => setLogin(e.target.value)} />
                    </div>
                    <div className={style.inputGroup}>
                        <label htmlFor="password">Пароль</label>
                        <div className={style.passwordContainer}>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                placeholder="Введіть пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="button" onClick={togglePasswordVisibility} className={style.eyeIcon}>
                                {passwordVisible ? 'Сховати' : 'Показати'}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className={style.submitButton} onClick={handleLogInClick}>Авторизуватися</button>
                    <div className={style.orText}>або</div>
                    <button type="button" className={style.registerButton} onClick={handleToSignUp}>Зареєструватися</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
