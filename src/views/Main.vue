<template>
  <v-app>
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
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-btn @click.native.stop="dialog=!dialog" icon>
      <v-icon>{{ "add" }}</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <AddTaskModal @close="dialog=false" />
    </v-dialog>
  </v-app>
</template>

<script>
import Calendar from "@/components/Calendar.vue";
import List from "@/components/List.vue";
import AddTaskModal from "../components/AddTaskModal";

export default {
  components: {
    Calendar,
    List,
    AddTaskModal
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    dialogClose() {
      this.dialog = false
    }
  },
};
</script>
