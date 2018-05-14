<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="email" prepend-icon="mail" :rules="[rules.required, rules.email]" label="E-mail" />
                  <v-text-field v-model="password" prepend-icon="lock" label="Password" type="password" />
                  <v-text-field v-model="repeatpassword" prepend-icon="lock" label="Repeat Password" type="password" />
                  <v-text-field v-model="firstname" prepend-icon="lock" label="Firstname" type="text" />
                  <v-text-field v-model="lastname" prepend-icon="lock" label="Firstname" type="text" />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import FacebookIcon from "vue-material-design-icons/facebook.vue";
import GoogleIcon from "vue-material-design-icons/google.vue";
export default {
  components: { FacebookIcon, GoogleIcon },
  data: () => ({
    email: "",
    password: "",
    repeatpassword: "",
    firstname: "",
    lastname: "",
    rules: {
      required: value => !!value || "Required.",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    }
  }),
  methods: {
    signup: () => {
      const { username, password } = this;
      this.$store.dispatch("signup", { username, password });
    }
  }
};
</script>
