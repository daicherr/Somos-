import axios from 'axios';

// CENTRALIZAÇÃO DO IP
// Se o seu IP mudar, troque APENAS aqui.
const BASE_URL = 'http://172.20.10.5:8000/api';

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;