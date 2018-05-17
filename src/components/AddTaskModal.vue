<template>
  <v-card>
    <v-card-title>
      <span class="headline">Add a task</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm8 md8>
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Assignment Name"
              required
            />
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-checkbox v-model="checkbox" label="Auto"></v-checkbox>
          </v-flex>
            <v-flex xs8 v-if="subTasks.length === 0">
              <v-slider :min="1" :max="4" v-model="estimatedTime" label="Estimated Time"></v-slider>
            </v-flex>
            <v-flex xs3 v-if="subTasks.length === 0">
              <v-text-field :rules="[() => (estimatedTime > 0 && estimatedTime <= 4) || 'Out of range']" v-model="estimatedTime" type="number"></v-text-field>
            </v-flex>
          <v-flex>
            <v-list>
              <v-list-tile v-for="(subTask, index) in subTasks" :key="index">
                <v-list-tile-content>
                  <v-list-tile-title v-text="subTask.name"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
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
            v-model="dateMenu"
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
        <v-btn flat @click="submitTask">Save</v-btn>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment';
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
      name: "",
      nameRules: [
        v => !!v || 'Name is required',
      ],
      estimatedTime: 0,
      subTaskDialog: false,
      checkbox: false,
      dueDate: null,
      dateMenu: false,
      subTasks: []
    }
  },
  methods: {
    clearForm() {
      this.name = "";
      this.estimatedTime = 1;
      this.subTaskDialog = false;
      this.checkbox = false;
      this.dateMenu = false;
      this.subTasks = [];
    },
    closeSubTaskDialog (a) {
      this.subTaskDialog = false;
      if (a !== null) {
        this.subTasks = this.subTasks.concat([a]);
        console.log(a);
        console.log(this.subTasks)
      }
    },
    submitTask() {
      console.log("submit");
      const payload = {
        "auto": this.checkbox,
        "name": this.name,
        "estimatedTime": this.estimatedTime,
        "dueDate": moment(this.dueDate, "YYYY-M-D").unix(),
        "done": false,
        "subtask": this.subTasks
      };
      this.clearForm();
      const uid = this.$store.getters.getUid.toString();
      // console.log("uiddddd",uid);
      const task = {'uid': uid,'payload': payload};
      console.log(task);
      this.$store.dispatch('setTask', task)
    }
  }
};
</script>
