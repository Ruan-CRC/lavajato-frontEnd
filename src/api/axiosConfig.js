import axios from 'redaxios';
import router from '../router/index'

// Define as configurações padrões quando cria a instância
const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`
});

// Altera as configurações padrões após a instância ser criada
// api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
//api.defaults.headers.post['Content-Type'] = 'application/json';

export default api
