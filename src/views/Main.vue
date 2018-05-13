<template>
    <v-app>
      <Toolbar>
          <v-container fluid>
              <Calendar />
          </v-container>
      </Toolbar>
    </v-app>
</template>

<script>
import Toolbar from "@/components/Toolbar.vue";
import Calendar from "@/components/Calendar.vue";

export default {
  components: {
    Toolbar,
    Calendar
  },
  data: () => ({}),
  methods: {}
};
</script>
