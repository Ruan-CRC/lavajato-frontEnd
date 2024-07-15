import { defineStore } from 'pinia'
import api from '../api/axiosConfig'

const socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);

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
      return new Promise((resolve, reject) => {
        socket.addEventListener('open', () => {
          console.log('Conectado ao servidor');

          socket.send(JSON.stringify('agenda:all'));
        });

        socket.addEventListener('message', (event) => {
          const events = JSON.parse(event.data);
          console.log('Eventos', events);
          if (events.event === 'agenda:agendados') {
            console.log(`Event: ${events.event}, Payload: ${events.result}`);
          }

          if (events.event === 'agenda:now') {
            this.events = [...this.events, {
              id: id++,
              title: 'Agora',
              start: events.data.dataInicio,
            }];

            return;
          }

          events.result.servicosEmAgendamento.forEach(agenda => {
            this.events.push({
              id: id++,
              title: 'Já está agendado',
              start: agenda.dataInicio,
            })
          });
          resolve(events);
        });

        socket.addEventListener('error', (error) => {
          reject(error);
        });
      });

    },
    createEvent(event) {
      this.dataEvent = event
    },
    enviarAgendamento(event) {
      api.post('api/v1/agenda/create', event)
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
