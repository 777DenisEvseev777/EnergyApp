import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import style from '../moduleCSS/Client_community.module.css';
import axios from 'axios';

const Client_community = () => {

  const navigate = useNavigate();
  const [communities, setCommunities] = useState([]);
  const sortedCommunities = [...communities].sort((a, b) => b.consumption - a.consumption);

  useEffect(() => {
    const fetchGetCommunities = async() =>{
      try{
        const res = await axios.get('/community');
        setCommunities(res.data)
        console.log(res.data)
      }catch (error){
        throw error.response ? error.response : { message: error.message };
      }
    }
    fetchGetCommunities();
  }, [])

  const handleToCityClick = (community) => {
    navigate('/client_citys', {state: {community}});
  }

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
                {sortedCommunities.map((community) => (
                  <div className={style.listItem}>{community.name}: {parseFloat(community.consumption.toFixed(3))} МВт</div>
                ))}
              </div>
            </div>
    
            {}
            <div className={style.mainContent}>
              <div className={style.grid}>
                {communities.map((community) => (
                  <div className={style.card} onClick={() => handleToCityClick(community)}>
                    <div className={style.label}>{community.name}</div>
                    <div className={style.value}>{parseFloat(community.consumption.toFixed(3))} (МВт)</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    );
};

export default Client_community;
