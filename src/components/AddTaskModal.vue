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
import moment from "moment";
import AddSubTaskModal from "./AddSubTaskModal";
import { auth, db } from "@/firebase.js";
export default {
  components: { AddSubTaskModal },
  props: {
    dialogVisible: Boolean
  },
  computed: {
    dialog: {
      get() {
        if (this.dialogVisible) {
          console.log("visible");
        }
        return this.dialogVisible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    }
  },
  data() {
    return {
      name: "",
      nameRules: [v => !!v || "Name is required"],
      estimatedTime: 0,
      subTaskDialog: false,
      checkbox: false,
      dueDate: null,
      dateMenu: true,
      subTasks: [],
      days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    };
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
    closeSubTaskDialog(a) {
      this.subTaskDialog = false;
      if (a !== null) {
        this.subTasks = this.subTasks.concat([a]);
        console.log(a);
        console.log(this.subTasks);
      }
    },
    submitTask() {
      console.log("submit");
      const payload = {
        auto: this.checkbox,
        name: this.name,
        estimatedTime: this.estimatedTime,
        dueDate: moment(this.dueDate, "YYYY-M-D").unix(),
        done: false,
        subtask: this.subTasks
      };
      this.clearForm();
      // console.log("uiddddd",uid);
      const task = { uid: auth().currentUser.uid, payload: payload };
      console.log(task);
      this.$store.dispatch("setTask", task);
      this.scheduleTask(payload, auth().currentUser.uid);
    },
    scheduleTask(payload, uid) {
      // if payload.auto === true
      console.log("scheduling");
      this.$store.dispatch("getWorkHours", { uid }).then(() => {
        const workObj = this.$store.getters.getWork;

        // const currentDay = moment().format("dddd");
        // const dueDay = moment(payload.dueDate)
        //   .format("dddd")
        //   .toLowerCase();

        // const currentDayIndex = days.indexOf(currentDay);
        // const dueDayIndex = days.indexOf(dueDay);

        // if (currentDayIndex > dueDayIndex) {
        //   alert("Your due date has been passed.");
        //   return;
        // }

        console.log("before loop");

        const days = Object.keys(workObj);

        for (let i = 0; i < days.length; i++) {
          // console.log("in 1st loop");
          // this is a String
          const day = days[i];

          // this is a list
          const eachDay = workObj[day];

          for (let j = 0; j < eachDay.length; j++) {
            // console.log("in 2nd  loop");
            const eachSlot = eachDay[j];

            const start = moment(eachSlot.startTime, "hh:mm").hours();
            const end = moment(eachSlot.endTime, "hh:mm").hours();
            const hours = end - start;

            console.log("peter is a cunt", start, eachSlot.startTime);
            console.log("sjhu", end, eachSlot.endTime);

            for (let k = 0; k < payload.subtask.length; k++) {
              // console.log("in 3rd loop loop");
              // If task can fit in the slot and the slot is not occupied
              console.log(hours, eachSlot.occupied);
              const kk = eachSlot.key;
              console.log("uri", `${uid}/meta/week/${day}/workHours/${kk}`);
              console.log("misc", payload.subtask, k, hours, eachSlot.occupied);
              if (payload.subtask[k].estimatedTime <= hours && eachSlot.occupied === false) {
                // Occupy the slot and update the subtask to scheduled
                console.log("inside update");
                db()
                  .ref(`${uid}/meta/week/${day}/workHours/${kk}`)
                  .update({ occupied: true });
              } else if (payload.subtask[k].estimatedTime > hours && eachSlot.occupied === false) {
                // Divide the task and occupy that many slots and update the subtask to scheduled
              } else {
                // Fuck
              }
            }
          }
        }
      });
      // {[]}
    }
  }
};
</script>
