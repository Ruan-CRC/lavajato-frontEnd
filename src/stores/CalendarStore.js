import { defineStore } from 'pinia'
import axios from 'axios'

export const useCalendarStore = defineStore('calendarStore', {
  state: () => ({
    events: [],
    weekendsVisible: true
  }),
  getters: {
    allEvents: state => state.events,
    weekendsIsVisible: state => state.weekendsVisible
  },
  actions: {
    async getEvents () {
      var id = 1
      await axios.get('http://localhost:3333/api/v1/agenda/servicos-agendos')
        .then(response => {
          response.data.data.servicosEmAgendamento.map(servicoAgendado => {
            this.createEvent({
              id: id++,
              title: 'Já está agendado',
              start: servicoAgendado.dataInicio,
            })
        })
      })
    },
    createEvent (event) {
      this.events.push(event)
    },
    updateEvent (eventId) {
      this.events = this.events.map(event => {
        if (event.id === eventId) {
          return { ...event, title: 'Updated' }
        }
        return event
      })
    },
    deleteEvent ( eventId) {
      this.events = this.events.filter(event => event.id !== eventId)
    },
    setweekendsVisible ({ commit }, enabled) {
      return commit(Mutation.SET_WEEKENDS_ENABLED, enabled)
    }
  },
  mutations: {
    
  }
})