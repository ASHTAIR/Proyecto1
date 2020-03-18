import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://prueba-a9ab0.firebaseio.com/'
});

export default instance;