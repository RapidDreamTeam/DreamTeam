<template>
  <FullCalender :events="calEvents" locale="en"></FullCalender>
</template>

<script>
import FullCalender from 'vue-fullcalendar'
export default {
  components: {
    FullCalender
  },
  data(){
    return {
      calEvents: [
        {
    title : 'Sunny Out of Office',
    start : '2018-05-12',
    end : '2018-05-13'
  }
      ]
    }
  },
  methods: {

  }
}
</script>
