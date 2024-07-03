import { defineStore } from 'pinia'

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    events: [
      { id: 10, title: 'All day event', date: new Date(), allDay: true },
      { id: 20, title: 'Timed event', start: new Date() },
      { id: 30, title: 'Timed event', start: new Date() }
    ],
    weekendsVisible: true
  }),
  getters: {
    allEvents: state => state.events,
    weekendsIsVisible: state => state.weekendsVisible
  },
  actions: {
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