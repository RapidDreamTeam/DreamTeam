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
            <v-text-field label="First Day of Class" v-model="firstDay" required/>
          </v-flex>
        </v-layout>

        <v-flex xs12 sm8 md8>
          <v-text-field label="Second Day of Class" v-model="secondDay" required/>
        </v-flex>
      </v-layout>

          <v-flex xs12 sm8 md8>
            <v-text-field label="Alert before" v-model="alertBefore" required/>
          </v-flex>
        </v-layout>

        <v-spacer/>
        <v-btn flat @click="dialog = false">Cancel</v-btn>
        <v-btn flat color="primary" @click="submitClass">Save</v-btn>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  components: {  },
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
      rm: 0,
      startTime: "",
      endTime: "",
      alertBefore: 0,
      firstDay : "",
      secondDay: ""
    }
  },
  methods: {
    submitClass() {
      console.log("submit");

      const days = [this.firstDay, this.secondDay]
      const payload = {
        "name": this.name,
        "room": this.rm,
        "startTime": this.startTime,
        "endTime": this.endTime,
        "day": days
      };
      const uid = this.$store.getters.getUid.toString();
      // console.log("uiddddd",uid);
      const class2 = {'uid': uid,'payload': payload};
      console.log(class2);
      this.$store.dispatch('setClass', class2)
    }
  }
};
</script>
