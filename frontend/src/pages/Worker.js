import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import style from '../moduleCSS/Worker.module.css';

const Worker = () => {
    const [selectedCommunity, setSelectedCommunity] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    const [currentData, setCurrentData] = useState('Поточні дані будуть тут');
    const [updatedData, setUpdatedData] = useState('');

    const navigate = useNavigate();

    const handleCommunityChange = (event) => {
        setSelectedCommunity(event.target.value);
    };

    const handleAddressChange = (event) => {
        setSelectedAddress(event.target.value);
        setCurrentData(`Дані для адреси: ${event.target.value}`);
    };

    const handleUpdateData = () => {
        setCurrentData(updatedData);
        setUpdatedData('');
    };

    const handleToLogInClick = () => {
        navigate('/')
    }

    return (
        <div className={style.Worker}>
            <div className={style.header}>
                <span className={style.headerText}>Панель робітника</span>
                <button className={style.exitButton} onClick={handleToLogInClick}>Вихід</button>
            </div>
            <div className={style.body}>
                <div className={style.inputContainer}>
                    <div className={style.inputGroup}>
                        <label htmlFor="community" className={style.dropdownLabel}>
                            Оберіть громаду
                        </label>
                        <select
                            id="community"
                            className={style.dropdown}
                            value={selectedCommunity}
                            onChange={handleCommunityChange}
                        >
                            <option value="">--Оберіть громаду--</option>
                            <option value="Громада 1">Громада 1</option>
                            <option value="Громада 2">Громада 2</option>
                            <option value="Громада 3">Громада 3</option>
                        </select>
                    </div>
                    <div className={style.inputGroup}>
                        <label htmlFor="address" className={style.dropdownLabel}>
                            Оберіть адресу
                        </label>
                        <select
                            id="address"
                            className={style.dropdown}
                            value={selectedAddress}
                            onChange={handleAddressChange}
                        >
                            <option value="">--Оберіть адресу--</option>
                            <option value="Адреса 1">Адреса 1</option>
                            <option value="Адреса 2">Адреса 2</option>
                            <option value="Адреса 3">Адреса 3</option>
                        </select>
                    </div>
                    <div className={style.inputGroup}>
                        <label className={style.dataLabel}>Поточні дані</label>
                        <textarea
                            className={style.textarea}
                            value={currentData}
                            readOnly
                        />
                    </div>
                    <div className={style.inputGroup}>
                        <label className={style.dataLabel}>Оновлені дані</label>
                        <textarea
                            className={style.textarea}
                            value={updatedData}
                            onChange={(e) => setUpdatedData(e.target.value)}
                        />
                    </div>
                    <div className={style.updateButtonContainer}>
                        <button className={style.updateButton} onClick={handleUpdateData}>
                            Оновити дані
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Worker;