<template>
	<full-calendar :config="config" :events="events"/>
</template>

<script>
import FullCalender from "vue-full-calendar";
export default {
  components: {
    FullCalender
  },
  data() {
    return {
      events: [
        {
            title  : 'event1',
            start  : '2010-01-01',
        },
        {
            title  : 'event2',
            start  : '2018-05-15',
            end    : '2018-05-16',
        },
        {
            title  : 'event3',
            start  : '2018-05-15T18:30:00',
            allDay : false,
        },
      ]
    }
  },
  methods: {}
};
</script>

<style>
    @import '~fullcalendar/dist/fullcalendar.css';
</style>
