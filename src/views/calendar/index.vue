<template>
  <div id="calendarContainer">
      <calendar-sidebar
          :events="events"
          :weekends-visible="weekendsVisible"
          @set-weekends-visible="calendar.setweekendsVisible"
      />

      <div class="calendar">
          <full-calendar
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
    weekendsVisible: true
  }
},
created() {
  this.events = this.calendar.events
  this.weekendsVisible = this.calendar.weekendsIsVisible
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
      selectMirror: true,
      dayMaxEvents: true,
      events: this.calendar.events,
      weekends: this.calendar.weekendsIsVisible,
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
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
    const title = prompt('Please enter a new title for your event')

    if (!title) {
      return
    }

    const id = (this.events.length + 1) * 10
    const { start, end, date, allDay } = payload

    return this.calendar.createEvent({
      id,
      title,
      date,
      start,
      end,
      allDay
    })
  },

  onDateSelect (payload) {
    return this.onDateClick(payload)
  },

  onEventClick ({ event }) {
    const confirmed = confirm(`Are you sure you want to delete the event '${event.title}'?`)

    if (!confirmed) {
      return
    }

    return this.calendar.deleteEvent(event.id)
  },

  onEventDrop ({ event }) {
    return this.calendar.updateEvent(event)
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