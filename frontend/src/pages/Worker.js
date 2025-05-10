import React, { useState, useEffect, use } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import style from '../moduleCSS/Worker.module.css';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';

const Worker = () => {
    const [updatedData, setUpdatedData] = useState('');

    const [community, setCommunity] = useState('');
    const [communities, setCommunities] = useState([]);

    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('');

    const [addresses, setAddresses] = useState([]);
    const [address, setAddress] = useState('');
    const [currentAddress, setCurrentAddress] = useState();

    const {user} = useUser();

    const navigate = useNavigate();

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
            alert("Дані збігаюця");
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
            setUpdatedData('');
            alert(res.data.message);
            console.log(res.data)
        }catch (error){
            console.log(error)
        }
    }

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

export default Worker;