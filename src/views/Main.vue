<template>
    <v-app>
      <Toolbar>
          <v-container fluid>
              <!-- <List /> -->
              <v-flex xs4>
                <List />
              </v-flex>
            </v-flex xs8>
            <Calendar />
          </v-flex>
          </v-container>
      </Toolbar>
    </v-app>
</template>

<script>
import Toolbar from "@/components/Toolbar.vue";
import Calendar from "@/components/Calendar.vue";
import List from "@/components/List.vue";

export default {
  components: {
    Toolbar,
    Calendar,
    List
  },
  data: () => ({}),
  methods: {}
};
</script>
