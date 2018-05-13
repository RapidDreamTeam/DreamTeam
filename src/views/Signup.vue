<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Sign up</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="email" :rules="[rules.required, rules.email]" label="E-mail">
                  <v-text-field v-model="password" id="password" prepend-icon="lock" label="Password" type="password" />
                  <v-text-field prepend-icon="lock" label="Firstname" type="text" />
                  <v-text-field prepend-icon="lock" label="Firstname" type="text" />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary">Sign In</v-btn>
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
  data: () => ({ email: "", password: "" }),
  methods: {}
};
</script>
