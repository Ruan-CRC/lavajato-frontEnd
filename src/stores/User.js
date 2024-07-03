//import axios from "@/api/axiosConfig";
import { defineStore } from "pinia";

export const useUserStore = defineStore('userLogin',{
  state: () => ({
    error: '',
    token: '',
    userInfo: {}
  }),
  getters: {
    getUserInf: (state) => state.userInfo
  },
  actions: {
    // Set setUserInfo
    setUserInfo(...userInfo) {
      this.userInfo = userInfo[0];
    },
    setLogin({ username, password }) {
      const body = JSON.stringify({ username, password })
    
      fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Erro na solicitação')
        }
    
        // Parseia o corpo a resposta JSON
        return res.json()
      })
      .then(data => {
    
        // Salva os dados no localStorage
        localStorage.setItem('userInfo', JSON.stringify(data))
        localStorage.setItem('token', data.token)
    
        // Chama a função para definir as informações do usuário (se existir)
        this.setUserInfo(data)
        this.token = data.token
      })
      .catch(err => {
        this.error = err.message
      })
    }
    
    
    
  },  
})