import React from 'react';
import { useNavigate } from "react-router-dom";
import style from '../moduleCSS/Client_citys.module.css';

const Client_citys= () => {

    const navigate = useNavigate();

    const handleToClientCommunity = () =>{
        navigate('/client_community')
    }

    return (
        <div className={style.container}>
            <div className={style.topBar}>
                <button className={style.backButton} onClick={handleToClientCommunity}>Повернутися</button>
            </div>

            <div className={style.content}>
                <div className={style.sidebar}>
                    <h3>Топ споживання Електроенергії</h3>
                    <div className={style.list} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        {[...Array(10)].map((_, index) => (
                            <div key={index} className={style.listItem}>Споживач {index + 1}: ХХ МВт</div>
                        ))}
                    </div>
                </div>

                <div className={style.mainContent}>
                    <div className={style.grid}>
                        {[...Array(9)].map((_, index) => (
                            <div key={index} className={style.card}>
                                <div className={style.label}>Селище {index + 1}</div>
                                <div className={style.value}>Споживання (МВт)</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Client_citys;