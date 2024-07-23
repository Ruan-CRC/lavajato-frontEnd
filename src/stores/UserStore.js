import { set } from 'date-fns'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,
    veiculo: [],
  }),
  getters: {
    getUser: state => state.user,
    getVeiculo: state => state.veiculo,
  },
  actions: {
    setUser(user) {
      this.user = user
    },
    setVeiculo(veiculo) {
      this.veiculo.push(veiculo)
    },
    logout() {
      this.user = null
    },
  },
})
