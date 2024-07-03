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
    createEvent ({ commit }, event) {
      return commit(Mutation.CREATE_EVENT, event)
    },
    updateEvent ({ commit }, updatedEvent) {
      return commit(Mutation.UPDATE_EVENT, updatedEvent)
    },
    deleteEvent ({ commit }, eventId) {
      return commit(Mutation.DELETE_EVENT, eventId)
    },
    setweekendsVisible ({ commit }, enabled) {
      return commit(Mutation.SET_WEEKENDS_ENABLED, enabled)
    }
  },
  mutations: {
    
  }
})