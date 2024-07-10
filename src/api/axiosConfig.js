import axios from 'axios';
import router from '../router/index'

// Define as configurações padrões quando cria a instância
const instanceAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

// Altera as configurações padrões após a instância ser criada
// instanceAxios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
instanceAxios.defaults.headers.post['Content-Type'] = 'application/json';

instanceAxios.interceptors.response.use(function (response) {
  if(response.status === 401) {
    localStorage.clear()
    router.replace('/login')
  }

  },function (error) {

    return Promise.reject(error);
  }
)

export default instanceAxios