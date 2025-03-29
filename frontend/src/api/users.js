import axios from "axios";

const API_URL = 'http://localhost:7777/api';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_URL;

export const SignUp = async(login, phone, password, passwordConfirm) => {
    try{
        const res = await axios.post ('/users', 
            {
                login: login, 
                phone: phone, 
                password: password, 
                passwordConfirm: passwordConfirm, 
                role: 'user'
            });
        return res;
    }catch (error){
        throw error.response ? error.response : { message: error.message };
    }
}

export const Authentication = async(login, password) => {
    try{
        const res = await axios.post ('/authentication', {
            login: login, 
            password: password
        })
        return res.data;
    } catch (error){
        throw error.response ? error.response : { message: error.message };
    }
}