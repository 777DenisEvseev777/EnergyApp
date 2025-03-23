import React from 'react';
import { useNavigate } from "react-router-dom";
import style from '../moduleCSS/Client_community.module.css';

const Client_community = () => {

  const navigate = useNavigate();

    const handleToLogInCLick = () => {
      navigate('/')
    }
  
    return (
        <div className={style.container}>
          {}
          <div className={style.topBar}>
            <button className={style.backButton} onClick={handleToLogInCLick}>Повернутися</button>
          </div>
    
          <div className={style.content}>
            {}
            <div className={style.sidebar}>
              <h3>Топ споживання Електроенергії</h3>
              <div className={style.list} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {[...Array(10)].map((_, index) => (
                  <div key={index} className={style.listItem}>Споживач {index + 1}: ХХ МВт</div>
                ))}
              </div>
            </div>
    
            {}
            <div className={style.mainContent}>
              <div className={style.grid}>
                {[...Array(9)].map((_, index) => (
                  <div key={index} className={style.card}>
                    <div className={style.label}>Громада {index + 1}</div>
                    <div className={style.value}>Споживання (МВт)</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    );
};

export default Client_community;
