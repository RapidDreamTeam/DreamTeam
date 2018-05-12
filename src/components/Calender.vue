<template>
  <v-app>
    <Calendar startDate="2018-03-07" :dateData="data">
  <div slot="header-left">
    <Button>month</Button>
    <Button>week</Button>
  </div>

  <div
    :class="['calendar-item', { 'is-otherMonth': !isCurMonth }]"
    slot-scope="item"
  >
    <div
      :class="['calendar-item-date']">
      {{item.date.date}}
    </div>
    <div class="calendar-item-name">{{item.data.title}}</div>
  </div>
</Calendar>

  </v-app>
</template>

<script>
import "vue2-event-calendar/default.css";
import Calendar from "vue2-event-calendar";
export default {
  components: {
    Calendar
  },
  methods: {
    renderHeader({ prev, next, selectedDate }) {
      const h = this.$createElement;

      const prevButton = h(
        "div",
        {
          on: {
            click: prev
          }
        },
        ["prev"]
      );

      const nextButton = h(
        "div",
        {
          on: {
            click: next
          }
        },
        ["next"]
      );

      return h("div", [prevButton, selectedDate, nextButton]);
    }
  }
};
</script>
