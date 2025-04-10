import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import style from '../moduleCSS/Client_citys.module.css';
import axios from 'axios';

const Client_citys= () => {

    const location = useLocation();
    const navigate = useNavigate();
    const {community} = location.state;
    const [cities, setCities] = useState([]);
    const sortedCities = [...cities].sort((a, b) => b.consumption - a.consumption);

    useEffect(() => {
        const fetchGetCities = async() =>{
          try{
            const res = await axios.get('/city', {
                params: { commun_id: community._id }
            });
            setCities(res.data)
            console.log(res.data)
          }catch (error){
            throw error.response ? error.response : { message: error.message };
          }
        }

        fetchGetCities();
      }, [])

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
                        {sortedCities.map((city) => (
                            <div className={style.listItem}>{city.name} ({city.type}): {parseFloat(city.consumption.toFixed(3))} МВт</div>
                        ))}
                    </div>
                </div>

                <div className={style.mainContent}>
                    <div className={style.grid}>
                        {cities.map((city) => (
                            <div className={style.card}>
                                <div className={style.label}>{city.name}</div>
                                <div className={style.value}>{parseFloat(city.consumption.toFixed(3))} (МВт)</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Client_citys;