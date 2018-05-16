<template>
  <v-card>
    <v-card-title>
      <span class="headline">Ahh a task</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm8 md8>
            <v-text-field label="Assignment Name" required/>
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-checkbox v-model="checkbox" label="Auto"/>
          </v-flex>
          <v-btn @click.native.stop="subTaskDialog=!subTaskDialog" icon>
            <v-icon>{{ "add" }}</v-icon>
          </v-btn>
          <v-dialog v-model="subTaskDialog" max-width="400px">
            <AddSubTaskModal @close="closeSubTaskDialog" :auto="this.checkbox" />
          </v-dialog>
        </v-layout>
        <v-flex xs11 sm5>
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            v-model="menu2"
            :nudge-right="40"
            :return-value.sync="dueDate"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
          <v-text-field
            slot="activator"
            v-model="dueDate"
            label="Add a due date"
            prepend-icon="access_time"
            readonly
          ></v-text-field>
          <v-date-picker v-model="dueDate" @change="$refs.menu.save(dueDate)"></v-date-picker>
        </v-menu>
      </v-flex>
        <v-spacer/>
        <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
        <v-btn flat @click="dialog = false">Save</v-btn>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import AddSubTaskModal from "./AddSubTaskModal";
export default {
  components: { AddSubTaskModal },
  props: {
    dialogVisible: Boolean,
  },
  computed: {
    dialog: {
      get () {
        if (this.dialogVisible) {
          console.log("visible");
        }
        return this.dialogVisible;
      },
      set (value) {
        if (!value) {
          this.$emit('close');
        }
      }
    }
  },
  data () {
    return {
      subTaskDialog: false,
      checkbox: false,
      dueDate: null,
      menu2: true,
      subTasks: []
    }
  },
  methods: {
    closeSubTaskDialog (a) {
      this.subTaskDialog = false;
      this.subTasks = this.subTasks.concat([a]);
      console.log(a);
      console.log(this.subTasks)
    },
  }
};
</script>
