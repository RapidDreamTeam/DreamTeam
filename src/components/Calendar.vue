<template>
  <FullCalender :events="calEvents" locale="en"></FullCalender>
</template>

<script>
import FullCalender from "vue-fullcalendar";
export default {
  components: {
    FullCalender
  },
  data: () => ({
    calEvents: [
      {
        title: "Sunny Out of Office",
        start: "2016-08-25",
        end: "2017-07-27"
      }
    ]
  }),
  methods: {}
};
</script>
