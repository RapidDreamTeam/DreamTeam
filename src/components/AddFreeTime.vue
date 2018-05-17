<template>
  <v-card>
    <v-card-title>
      <span class="headline">Add Free Time</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm8 md8>
            <v-subheader v-text="'Multiple (Chips) with persistent hint'"></v-subheader>
          </v-flex>
          <v-flex xs12 sm6>
            <v-select
              :items="days"
              v-model="picked"
              label="Select"
              multiple
              chips
              hint="What are the target regions"
              persistent-hint
            ></v-select>
        </v-flex>
          <v-flex xs12 sm8 md8>
            <v-time-picker v-model="startTime" color="green lighten-1" header-color="primary" ></v-time-picker>
          </v-flex>
          <v-flex xs12 sm8 md8>
            <v-time-picker v-model="endTime" color="green lighten-1" header-color="primary"></v-time-picker>
          </v-flex>
        </v-layout>
        <v-spacer/>
        <v-btn flat @click="dialog = false">Cancel</v-btn>
        <v-btn flat color="primary" @click="dialog = false">Save</v-btn>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { auth } from "@/firebase.js";
export default {
  components: {},
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
          this.onSave();
          this.$emit("close");
        }
      }
    }
  },
  data() {
    return {
      startTime: null,
      endTime: null,
      name: "",
      days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
      picked: []
    };
  },
  methods: {
    onSave() {
      this.$store.dispatch("setFreeTime", {
        days: this.picked,
        startTime: this.startTime,
        endTime: this.endTime,
        uid: auth().currentUser.uid.toString()
      });
    }
  }
};
</script>
