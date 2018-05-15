<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Sign in</v-toolbar-title>
                <v-spacer />
                
                <v-tooltip bottom>
                  <v-btn slot="activator" icon large @click.stop="facebookSignin">
                    <FacebookIcon style="color: white; font-size: 30px; display: inline-flex; position: relative;" />
                  </v-btn>
                  <span>Sign in with Facebook</span>
                </v-tooltip>
                
                <v-tooltip right>
                  <v-btn slot="activator" icon large  @click.stop="googleSignin">
                    <GoogleIcon style="color: white;font-size: 30px;"/>
                  </v-btn>
                  <span>Sign in with Google</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Email" type="text" v-model="email" />
                  <v-text-field prepend-icon="lock" name="password" label="Password" type="password" v-model="password"/>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click.stop="emailSignin">Sign In</v-btn>
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
    password: ""
  }),
  methods: {
    emailSignin() {
      const { email, password } = this;
      this.$store.dispatch("emailSignin", { username: email, password }).catch(err => alert(err.message));
    },
    facebookSignin() {
      this.$store.dispatch("facebookSignin").catch(err => alert(err.message));
    },
    googleSignin() {
      this.$store.dispatch("googleSignin").catch(err => alert(err.message));
    }
  }
};
</script>
