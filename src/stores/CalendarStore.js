import { defineStore } from 'pinia'
import api from '../api/axiosConfig'

// const socket = io(import.meta.env.VITE_WEBSOCKET_URL);
const socket = io(import.meta.env.VITE_BASE_URL, {
  withCredentials: true
});

export const useCalendarStore = defineStore('calendarStore', {
  state: () => ({
    events: [],
    errorAgenda: false,
    dataEvent: 'selecione a data',
    socketId: '',
    agendaConfirmada: false,
  }),
  getters: {
    allEvents: state => state.events,
  },
  actions: {
    async getEvents() {
      var id = 0;
      
      socket.on("connect", (io) => {
        this.socketId = socket.id;
      });

      socket.emit('agenda:all', '');

      socket.on('agenda:create', (data) => {
        let dataOriginal = new Date(data.dataInicio);
        dataOriginal.setHours(dataOriginal.getHours() + 3);

        this.events.push({
          id: id++,
          title: 'Agendado',
          start: dataOriginal.toISOString(),
        });
      });

      socket.on('agenda:error', (data) => {
        this.errorAgenda = data.error.errors[0];
      });

      socket.on('agenda:confirmada', (data) => {
        this.agendaConfirmada = data;
      });

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
    },
    createEvent(event) {
      this.dataEvent = event
    },
    enviarAgendamento(event) {
      socket.emit('agenda:create', event);
    },
    addError(err) {
      this.errorAgenda = err.error.errors[0];
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
