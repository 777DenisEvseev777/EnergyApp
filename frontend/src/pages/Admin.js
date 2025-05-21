import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import style from '../moduleCSS/Admin.module.css';
import {useUser} from '../contexts/UserContext';
import axios from 'axios';

const Admin = () => {
    const {user} = useUser();
    const [updatedRights, setUpdatedRights] = useState('');
    const [currentData, setCurrentData] = useState('Поточні дані тут');

    const [users, setUsers] = useState([]);
    const [selectUser, setSelectUser] = useState('');
    const [currentUser, setCurrentUser] = useState('');

    const [updatedData, setUpdatedData] = useState('');
    
    const [community, setCommunity] = useState('');
    const [communities, setCommunities] = useState([]);
    
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('');
    
    const [addresses, setAddresses] = useState([]);
    const [address, setAddress] = useState('');
    const [currentAddress, setCurrentAddress] = useState();

    useEffect (() => {
        const fetchUsers = async() =>{
            try{
                const res = await axios.get('http://localhost:7777/api/getusers');
                console.log(res.data.users)
                setUsers(res.data.users)
            }catch(error){
                console.log(error)
            }
        }
        fetchUsers();
    }, [])

    useEffect (() => {
        const fetchUsers = async() =>{
            try{
                console.log(selectUser)
                const res = await axios.get('http://localhost:7777/api/getuser', {
                    params: { userId: selectUser}
                });
                console.log(res.data.user)
                setCurrentUser(res.data.user)
            }catch(error){
                console.log(error)
            }
        }
        fetchUsers();
    }, [selectUser])

    useEffect (() => {
        const fetchCommunity = async() =>{
            try{
                const res = await axios.get('http://localhost:7777/api/community');
                console.log(res.data)
                setCommunities(res.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchCommunity();
    }, [])

    useEffect (() => {
        const fetchCity = async() =>{
            try{
                const res = await axios.get('http://localhost:7777/api/city', {
                    params: { commun_id: community }
                });
                setCities(res.data)
                setAddresses([])
                setCity('');
                setCurrentAddress('');
                console.log(res.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchCity();
    }, [community])

    useEffect (() => {
        const fetchAddress = async() =>{
            try{
                const res = await axios.get('http://localhost:7777/api/addresses', {
                    params: { city_id: city }
                });
                setAddresses(res.data)
                setAddress('')
                setCurrentAddress('')
                console.log(res.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchAddress();
    }, [city]);

    useEffect (() => {
        const fetchAddress = async() =>{
            try{
                const res = await axios.get('http://localhost:7777/api/address', {
                    params: { addr_id: address }
                });
                setCurrentAddress(res.data.consumption)
                console.log(res.data.consumption)
            }catch(error){
                console.log(error)
            }
        }
        fetchAddress();
    }, [address]);

    const handleUpadateDate = async() =>{

        const sum = Number(updatedData);

        if (sum === currentAddress){
            alert("Дані збігаються");
            return 0;
        }

        setCurrentAddress(sum);

        try{
            const res = await axios.patch('http://localhost:7777/api/addresses', {
                consumption: updatedData,
                addr_id: address,
                city_id: city,
                commun_id: community
            })
            alert(res.data.message);
            setUpdatedData('');
            console.log(res.data)
        }catch (error){
            console.log(error)
        }
    }

    const navigate = useNavigate();

    const handleUpdateRights = async() => {

        if (currentUser.role === updatedRights){
            alert("Права доступу користувача збігаються");
            return 0;
        }

        if (currentUser.role === "admin"){
            alert("Неможливо змінити права доступу Адміна");
            return 0;
        }

        try{
            const res = await axios.patch ('http://localhost:7777/api/user', {
                userId: currentUser._id,
                role: updatedRights
            });
            console.log(res)
            alert(res.data.message);
            const res2 = await axios.get('http://localhost:7777/api/getuser', {
                params: { userId: selectUser}
            });
            console.log(res2.data.user)
            setCurrentUser(res2.data.user)
        }catch (error){
            console.log(error)
        }
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
                        <select value={selectUser} onChange={(e) => setSelectUser(e.target.value)} className={style.dropdown}>
                            <option value="" disabled>Вибір користувача</option>
                            {users.map((user) => (
                                <option key={user._id} value={user._id}>{user.login}</option>
                            ))}
                        </select>
                    </div>
                    <div className={style.inputGroup}>
                        <label className={style.dataLabel}>Поточні права</label>
                        <textarea className={style.textarea} value={currentUser.role} readOnly />
                    </div>
                    <div className={style.inputGroup}>
                        {user && currentUser.role != 'admin' && <>
                        <label className={style.dataLabel}>Оновити права</label>
                        <select className={style.dropdown} value={updatedRights} onChange={(e) => setUpdatedRights(e.target.value)}>
                            <option value="">Виберіть права</option>
                            <option value="user">user</option>
                            <option value="worker">worker</option>
                        </select></>}
                    </div>
                    <div className={style.updateButtonContainer}>
                        <button className={style.updateButton} onClick={handleUpdateRights}>Оновити права</button>
                    </div>
                </div>
                <div className={style.rightContainer}>
                    <div className={style.inputGroup}>
                        <label htmlFor="community" className={style.dropdownLabel}>
                            Оберіть громаду
                        </label>
                        <select value={community} onChange={(e) => setCommunity(e.target.value)} className={style.dropdown}>
                        <option value="" disabled>Вибір громади</option>
                            {communities.map((community) => (
                                <option key={community._id} value={community._id}>{community.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={style.inputGroup}>
                        <label htmlFor="community" className={style.dropdownLabel}>
                                Оберіть населений пункт
                        </label>
                        <select value={city} onChange={(e) => setCity(e.target.value)} className={style.dropdown}>
                            <option value="" disabled>Вибір населеного пункту</option>
                            {cities.map((city) => (
                                <option key={city._id} value={city._id}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={style.inputGroup}>
                        <label htmlFor="address" className={style.dropdownLabel}>
                            Оберіть адресу
                        </label>
                        <select value={address} onChange={(e) => setAddress(e.target.value)} className={style.dropdown}>
                            <option value="" disabled>Вибір адресу</option>
                            {addresses.map((address) => (
                                <option key={address._id} value={address._id}>вул. {address.name} буд.  
                                    {address.house} {address.apartment && <>кв. {address.apartment}</>}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={style.inputGroup}>
                        <label className={style.dataLabel}>Поточні дані</label>
                        <textarea
                        className={style.textarea}
                            value={currentAddress && `${currentAddress} кВт.год`}
                            readOnly
                        />
                    </div>
                    <div className={style.inputGroup}>
                        <label className={style.dataLabel}>Оновлені дані</label>
                        <textarea
                            className={style.textarea}
                            value={updatedData}
                            onChange={(e) => setUpdatedData(e.target.value)}
                            placeholder='Додати кВт.год'
                        />
                    </div>
                    <div className={style.updateButtonContainer}>
                        <button className={style.updateButton} onClick={handleUpadateDate}>
                            Оновити дані
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
