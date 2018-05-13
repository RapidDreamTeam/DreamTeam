<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs4>
        <List />
      </v-flex>
      <v-flex xs8>
        <Calendar />
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import Calendar from "@/components/Calendar.vue";
import List from "@/components/List.vue";

export default {
  components: {
    Calendar,
    List
  },
  data: () => ({}),
  methods: {}
};
</script>
