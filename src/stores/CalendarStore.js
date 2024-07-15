import { defineStore } from 'pinia'
import api from '../api/axiosConfig'

// const socket = io(import.meta.env.VITE_WEBSOCKET_URL);
const socket = io('http://localhost:3334')

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

      socket.on("connect", (io) => {
        console.log(socket.id);
      });

      socket.emit('agenda:all', '');

      socket.on('agenda:create', (data) => {
        console.log('Agendamento ---------', data)
        this.events = [...this.events, {
          id: id++,
          title: 'Agora',
          start: data.dataInicio,
        }];
      });

      socket.on('agenda:all', (data) => {
        data.servicosEmAgendamento.forEach(agenda => {
          this.events.push({
            id: id++,
            title: 'Já está agendado',
            start: agenda.dataInicio,
          })
        });
      });
    },
    createEvent(event) {
      this.dataEvent = event
    },
    enviarAgendamento(event) {
      console.log('Enviando agendamento', event);
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
