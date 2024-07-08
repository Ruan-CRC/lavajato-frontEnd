<template>
  <div id="calendarContainer">
      <calendar-sidebar
          :events="events"
          :weekends-visible="weekendsVisible"
          @set-weekends-visible="calendarStore.setweekendsVisible"
      />

      <div class="calendar">
          <full-calendar
              ref="fullCalendarAPI"
              class="full-calendar"
              :options="config"
          >
              <template #eventContent="{ timeText, event }">
                  <b>{{ timeText }}</b>
                  <i>{{ event.title }}</i>
              </template>
          </full-calendar>
      </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptlocale from '@fullcalendar/core/locales/pt-br'

import CalendarSidebar from './CalendarSidebar.vue'
import { useCalendarStore } from '@/stores/CalendarStore'

export default {
components: {
  FullCalendar,
  CalendarSidebar
},
data() {
  return {
    events: [],
    weekendsVisible: true,
    calendarApi: null
  }
},
created() {
  this.calendarStore.getEvents()
  this.events = this.calendarStore.events
  this.weekendsVisible = this.calendarStore.weekendsIsVisible
},
mounted() {
  this.calendarApi = this.$refs.fullCalendarAPI.getApi()
},
computed: {
  ...mapStores(useCalendarStore),

  config () {
    return {
      ... this.configOptions,
      ...this.eventHandlers
    }
  },

  configOptions () {
    return {
      editable: true,
      selectable: true,
      locale: ptlocale,
      selectMirror: true,
      dayMaxEvents: true,
      events: this.calendarStore.events,
      weekends: this.calendarStore.weekendsIsVisible,
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      slotDuration: '01:00:00',
      slotLabelFormat: {
        hour: '1-',
        minute: '2-digit',
        omitZeroMinute: false,
        meridiem: 'short'
      },
      initialView: 'dayGridMonth'
    }
  },

  eventHandlers () {
    return {
      dateClick: this.onDateClick,
      eventClick: this.onEventClick,
      eventDrop: this.onEventDrop,
      eventResize: this.onEventDrop,
      select: this.onDateSelect
    }
  }
},
methods: {
  onDateClick (payload) {
    const container = document.querySelector('.fc-button-group button[aria-pressed="true"]')
    if (container.innerHTML === "Mês") {
      this.calendarApi.changeView('timeGridDay')
      return
    }

    const title = prompt('Please enter a new title for your event')
    if (!title) {
      return
    }

    const id = (this.events.length + 1) * 10
    const { start, end, date, allDay } = payload

    return this.calendarStore.createEvent({
      id,
      title,
      date,
      start,
      end,
      allDay
    })
  },
  /* donDateSelect (payload) {
    console.log('chama')
    return this.onDateClick(payload)
  },*/

  onEventClick ({ event }) {
    const confirmed = confirm(`Are you sure you want to delete the event '${event.title}'?`)

    if (!confirmed) {
      return
    }

    return this.calendarStore.deleteEvent(event.id)
  },

  onEventDrop ({ event }) {
    return this.calendarStore.updateEvent(event)
  }
}
}
</script>

<style scoped>
  #calendarContainer {
      display: flex;
      overflow: hidden;
      height: 100%;
  }

  .calendar {
      flex: 1;

      padding: 2em;
  }
</style>