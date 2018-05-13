<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Sign in</v-toolbar-title>
                <v-spacer></v-spacer>
                
                <v-tooltip bottom>
                  <v-btn slot="activator" icon large target="_blank">
                    <FacebookIcon style="color: white; font-size: 30px; display: inline-flex; position: relative;" />
                  </v-btn>
                  <span>Sign in with Facebook</span>
                </v-tooltip>
                
                <v-tooltip right>
                  <v-btn slot="activator" icon large target="_blank">
                    <GoogleIcon style="color: white;font-size: 30px;"/>
                  </v-btn>
                  <span>Sign in with Google</span>
                </v-tooltip>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
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
  data: () => ({}),
  methods: {}
};
</script>
