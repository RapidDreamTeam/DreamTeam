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
    <!-- <v-btn @click.native.stop="dialog=!dialog" icon>
      <v-icon>{{ "add" }}</v-icon>
    </v-btn> -->
    <v-dialog v-model="dialog" max-width="500px">
      <AddTaskModal @close="dialog=false" />
    </v-dialog>
    <!-- <v-btn
      fab
      bottom
      right
      color="blue"
      dark
      fixed
      @click.stop="dialogClass = !dialogClass"
    >
    <v-icon>add</v-icon>
    </v-btn> -->
    <!-- <v-btn @click.native.stop="dialogClass=!dialogClass" icon>
      <v-icon>{{ "add" }}</v-icon>
    </v-btn> -->
    
    <v-dialog v-model="addClassDialog" max-width="500px">
      <AddClassModal @close="$store.dispatch('setClassModal', {'modal': false})" />
    </v-dialog>

    <v-dialog v-model="workFreeModal" max-width="500px">
      <AddFreeTime @close="$store.dispatch('setWorkFreeModal', {'modal': false})" />
    </v-dialog>
  </v-app>
</template>

<script>
import Calendar from "@/components/Calendar.vue";
import List from "@/components/List.vue";
import AddTaskModal from "@/components/AddTaskModal";
import AddClassModal from "@/components/AddClassModal";
import AddFreeTime from "@/components/AddFreeTime";
import { mapGetters } from "vuex";

export default {
  props: ["dialogClass"],
  components: {
    Calendar,
    List,
    AddTaskModal,
    AddClassModal,
    AddFreeTime
  },
  data: () => ({
    dialog: false,
    addTaskDialog: false
    // addClassDialog: false
  }),
  methods: {
    dialogClose() {
      this.dialog = false;
    },
    dialogClassClose() {
      this.dialogClass = false;
    }
  },
  computed: {
    ...mapGetters({
      addClassDialog: "getClassDialog",
      workFreeModal: "getWorkFreeModal"
    })
  }
};
</script>
