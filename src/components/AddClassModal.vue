<template>
  <v-card>
    <v-card-title>
      <span class="headline">Add Class</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm8 md8>
            <v-text-field label="Name" v-model="name" required/>
          </v-flex>
          <v-flex xs12 sm8 md8>
            <v-text-field label="Room Number" v-model="rm" required/>
          </v-flex>
          <v-flex xs12 sm8 md8>
            <v-text-field label="Start Time" v-model="startTime" required/>
          </v-flex>

          <v-flex xs12 sm8 md8>
            <v-text-field label="End Time" v-model="endTime" required/>
          </v-flex>

          <v-flex xs12 sm8 md8>
            <v-text-field label="Alert before" v-model="alertBefore" required/>
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
          this.$emit("close");
        }
      }
    }
  },
  data() {
    return {
      name: "",
      rm: "",
      startTime: "",
      endTime: "",
      alertBefore: 0
    };
  },
  methods: {}
};
</script>
