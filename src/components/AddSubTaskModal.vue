<template>
  <v-card>
    <v-card-title>
      <span class="headline">Ahh a sub task</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm8 md8>
              <v-text-field
                v-model="subTaskName"
                :rules="nameRules"
                label="Sub-task Name"
                required
              />
            </v-flex>
            <v-flex xs12 lg6 v-if="!auto">
              <v-menu
                :close-on-content-click="false"
                v-model="timeMenu"
                :nudge-right="40"
                lazy
                transition="scale-transidistion"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="doTime"
                  :rules="[() => !auto ? (doTime !== null) || 'This field is required' : true]"
                  label="Scheduled time"
                  prepend-icon="access_time"
                  readonly
                  required
                ></v-text-field>
                <v-time-picker v-model="doTime" no-title @input="timeMenu = false" format="24hr"></v-time-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 lg6 v-if="!auto">
              <v-menu
                :close-on-content-click="false"
                v-model="dateMenu"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="doDate"
                  :rules="[() => !auto ? (doDate !== null) || 'This field is required' : true]"
                  label="Scheduled date"
                  prepend-icon="event"
                  readonly
                  required
                ></v-text-field>
                <v-date-picker v-model="doDate" no-title @input="dateMenu = false"></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-spacer/>
          <v-btn flat color="primary" @click="closeSubTask">Cancel</v-btn>
          <v-btn :disabled="!valid" flat @click="submitSubTask">Save</v-btn>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: ['visible', 'auto'],
    computed: {
      dialog: {
        get () {
          return this.visible
        },
        set (value) {
          if (!value) {
            if (this.doTime !== null && this.doDate !== null) {
              this.$emit('close', null)
            }
          }
        }
      }
    },
    data () {
      return {
        valid: false,
        subTaskName: "",
        nameRules: [
          v => !!v || 'Name is required',
        ],
        doTime: null,
        doDate: null,
        timeMenu: false,
        dateMenu: false,
      }
    },
    methods: {
      closeSubTask() {
        console.log("cancel");
        this.$emit('close', null);
      },
      submitSubTask() {
        console.log(this.doDate, this.doTime);
        if (!this.auto) {
          this.$emit('close', {"name": this.subTaskName, "time": this.doTime, 'date': this.doDate});
        } else {
          this.$emit('close', {"name": this.subTaskName});
        }
      }
    }
  };
</script>
