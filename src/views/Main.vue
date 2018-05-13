<template>
          <v-container fluid>
              <v-flex xs4>
              </v-flex>
            </v-flex xs8>
            <Calendar />
          </v-flex>
          </v-container>
                <List />





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
