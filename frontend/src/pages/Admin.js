import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import style from '../moduleCSS/Admin.module.css';

const Admin = () => {
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    const [currentRights, setCurrentRights] = useState('Поточні права тут');
    const [updatedRights, setUpdatedRights] = useState('');
    const [currentData, setCurrentData] = useState('Поточні дані тут');
    const [updatedData, setUpdatedData] = useState('');

    const navigate = useNavigate();

    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
    };

    const handleAddressChange = (event) => {
        setSelectedAddress(event.target.value);
    };

    const handleUpdateRights = () => {
        setCurrentRights(updatedRights);
        setUpdatedRights('');
    };

    const handleUpdateData = () => {
        setCurrentData(updatedData);
        setUpdatedData('');
    };

    const handleToLogInClick = () => {
        navigate('/');
    };

    return (
        <div className={style.Admin}>
            <div className={style.header}>
                <span className={style.headerText}>Панель Адміністратора</span>
                <button className={style.exitButton} onClick={handleToLogInClick}>Повернутися</button>
            </div>
            <div className={style.body}>
                <div className={style.leftContainer}>
                    <div className={style.inputGroup}>
                        <label className={style.dropdownLabel}>Оберіть Користувача</label>
                        <select className={style.dropdown} value={selectedUser} onChange={handleUserChange}>
                            <option value="">--Оберіть користувача--</option>
                            <option value="User 1">User 1</option>
                            <option value="User 2">User 2</option>
                        </select>
                    </div>
                    <div className={style.inputGroup}>
                        <label className={style.dataLabel}>Поточні права</label>
                        <textarea className={style.textarea} value={currentRights} readOnly />
                    </div>
                    <div className={style.inputGroup}>
                        <label className={style.dataLabel}>Оновити права</label>
                        <select className={style.dropdown} value={updatedRights} onChange={(e) => setUpdatedRights(e.target.value)}>
                            <option value="">Оберіть права</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </select>
                    </div>
                    <div className={style.updateButtonContainer}>
                        <button className={style.updateButton} onClick={handleUpdateRights}>Оновити права</button>
                    </div>
                </div>
                <div className={style.rightContainer}>
                    <div className={style.inputGroup}>
                        <label className={style.dropdownLabel}>Оберіть Адресу</label>
                        <select className={style.dropdown} value={selectedAddress} onChange={handleAddressChange}>
                            <option value="">--Оберіть адресу--</option>
                            <option value="Address 1">Адреса 1</option>
                            <option value="Address 2">Адреса 2</option>
                        </select>
                    </div>
                    <div className={style.inputGroup}>
                        <label className={style.dataLabel}>Поточні дані</label>
                        <textarea className={style.textarea} value={currentData} readOnly />
                    </div>
                    <div className={style.inputGroup}>
                        <label className={style.dataLabel}>Оновлені дані</label>
                        <textarea className={style.textarea} value={updatedData} onChange={(e) => setUpdatedData(e.target.value)} />
                    </div>
                    <div className={style.updateButtonContainer}>
                        <button className={style.updateButton} onClick={handleUpdateData}>Оновити дані</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
