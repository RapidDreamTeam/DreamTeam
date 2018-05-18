<template>
	<full-calendar :config="config" :events="events.concat(hours)"/>
</template>

<script>
import FullCalender from "vue-full-calendar";
import { auth } from "@/firebase.js";

export default {
  components: {
    FullCalender
  },
  data() {
    return {
      // events: [
      //   {
      //       title  : 'event1',
      //       start  : '2010-01-01',
      //   },
      //   {
      //       title  : 'event2',
      //       start  : '2018-05-15',
      //       end    : '2018-05-16',
      //   },
      //   {
      //       title  : 'event3',
      //       start  : '2018-05-15T18:30:00',
      //       allDay : false,
      //   },
      // ]
    };
  },
  computed: {
    events() {
      return this.$store.getters.getTasksAsCalendar;
    },
    hours() {
      return this.$store.getters.getHoursAsCalendar;
    }
  },
  methods: {},
  beforeMount: function() {
    console.log("mount", auth().currentUser.uid);
    this.$store.dispatch("getFreeHours", auth().currentUser.uid);
    this.$store.dispatch("getLectureHours", auth().currentUser.uid);
  }
};
</script>

<style>
@import "~fullcalendar/dist/fullcalendar.css";
</style>
