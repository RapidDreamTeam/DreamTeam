<template>
  <v-app light>
    <v-toolbar color="blue darken-3" dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <span class="hidden-sm-and-down">Advance Scheduler</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn class="blue darken-3" dark large href="/signin">
        Sign in
      </v-btn>
    </v-toolbar>
    <v-content>
      <section>
        <v-parallax src="/assets/img/agenda-appointment-business-1020323.jpg" height="600">
          <v-layout column align-center justify-center>
            <img src="/assets/img/vuetify.png" alt="Vuetify.js" height="200">
            <h1 class="headline mb-2 display-1 text-xs-center" style="color: black;">Advanced Scheduler</h1>
            <div class="subheading mb-3 text-xs-center" style="color: black;">Hackathon 2</div>
            <v-btn class="blue darken-3" dark large href="/register">
              Sign up
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout column
          wrap class="my-5" align-center>
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">The best way to schedule your week.</h2>
              <span class="subheading" id="subhead">
                "Trust us." - Sanchit Chawla
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md6>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Elegent Design</div>
                    </v-card-title>
                    <v-card-text style="color: black;">
                      Our application is designed to best suit the needs of
                      a university student. Usually students have the same classes
                      every week, so we opted for a weekly and daily calender.
                      I mean are you seeing this page?
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md6>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline" >Fast Scheduling</div>
                    </v-card-title>
                    <v-card-text>
                      All you would have to do is click the add icon on your
                      bottom right, and input the task name, subtask names
                      and the rest of the details, then click schedule my life
                      button to get your life sorted in the right way!
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax src="/assets/img/adults-agenda-cafe-1056551.jpg" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">Scheduling has never been easier</div>
            <em>Kick-start your week today!</em>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              href="/register"
            >
              Sign up
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Dream Team</div>
                </v-card-title>
                <v-card-text>
                
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: "Advance Sc"
    };
  }
};
</script>

<style>
#subhead {
  font-style: italic;
}
</style>
