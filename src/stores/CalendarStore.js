import { defineStore } from 'pinia'
import api from '../api/axiosConfig'

// const socket = io(import.meta.env.VITE_WEBSOCKET_URL);
const socket = io('http://localhost:3333/', {
  withCredentials: true
})

export const useCalendarStore = defineStore('calendarStore', {
  state: () => ({
    events: [],
    dataEvent: 'selecione a data',
  }),
  getters: {
    allEvents: state => state.events,
  },
  actions: {
    async getEvents() {
      var id = 0;

      await api.get('api/v1/agenda/servicos-agendos')
        .then(response => {
          response.data.forEach(agenda => {
            this.events.push({
              id: id++,
              title: 'Agendado',
              start: agenda.dataInicio,
            })
          });
        })

      socket.on("connect", (io) => {
        console.log(socket.id);
      });

      socket.emit('agenda:all', '');

      socket.on('agenda:create', (data) => {
        console.log('5454', data);
        this.events.push({
          id: id++,
          title: 'Agendado',
          start: data.dataInicio,
        });
      });

      socket.on('agenda:all', (data) => {
        console.log('-0-0-0', data);
        data.forEach(agenda => {
          this.events.push({
            id: id++,
            title: 'Agendado',
            start: agenda.dataInicio,
          })
        });
      });
    },
    createEvent(event) {
      this.dataEvent = event
    },
    enviarAgendamento(event) {
      socket.emit('agenda:create', event);
    },
    updateEvent(eventId) {
      this.events = this.events.map(event => {
        if (event.id === eventId) {
          return { ...event, title: 'Updated' }
        }
        return event
      })
    },
    deleteEvent(eventId) {
      this.events = this.events.filter(event => event.id !== eventId)
    },
  },
  mutations: {

  }
})
