import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333' // Define a base url que se repete em todas as requisições
});

export default api;