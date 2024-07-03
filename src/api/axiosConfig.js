import axios from 'axios';
import router from '../router/index'

// Define as configurações padrões quando cria a instância
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

// Altera as configurações padrões após a instância ser criada
instance.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.response.use(function (response) {
  if(response.status === 401) {
    localStorage.clear()
    router.replace('/login')
  }

  },function (error) {

    return Promise.reject(error);
  }
)

export default instance