import axios from 'axios';

// CENTRALIZAÇÃO DO IP
// Se o seu IP mudar, troque APENAS aqui.
const BASE_URL = 'http://192.168.200.123:8000/api';

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;