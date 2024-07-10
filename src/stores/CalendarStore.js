import { defineStore } from 'pinia'
import axios from 'axios'

const socket = new WebSocket('http://localhost:3333');

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
      var id = 1
      await axios.get('http://localhost:3333/api/v1/agenda/servicos-agendos')
        .then(response => {
          if (response.data.data.servicosEmAgendamento) {
            response.data.data.servicosEmAgendamento.map(servicoAgendado => {
              this.createEvent({
                id: id++,
                title: 'Já está agendado',
                start: servicoAgendado.dataInicio,
              })
            })
          }
        })

      return new Promise((resolve, reject) => {
        socket.addEventListener('open', () => {
          console.log('Conectado ao servidor');

          socket.send(JSON.stringify('agenda:agendados'));
        });

        socket.addEventListener('message', (event) => {
          const events = JSON.parse(event.data);
          if (events.event === 'agenda:agendados') {
            console.log(`Event: ${events.event}, Payload: ${events.result}`);
          }

          this.createEvent({
            id: id++,
            title: 'Já está agendado',
            start: events.dataInicio,
          })
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
