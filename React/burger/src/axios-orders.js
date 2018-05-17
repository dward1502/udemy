import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://burger-c72a3.firebaseio.com/'
});

export default instance;