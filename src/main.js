import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase, { db, auth } from "./firebase.js";
import Vuetify from "vuetify";
import "./registerServiceWorker";
import "babel-polyfill";
import "vue-material-design-icons/styles.css";
import FullCalendar from "vue-full-calendar";

Vue.use(FullCalendar);
Vue.use(Vuetify);
Vue.config.productionTip = false;

const unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
  new Vue({
    el: "#app",
    router,
    store,
    firebase,
    auth,
    db,
    render: h => h(App),
    beforeRouteEnter(to, from, next) {
      if (["/"].includes(this.$router.path)) {
        // store.dispatch("signoutWithoutRedirect")

        console.log(firebaseUser.user);

        if (firebaseUser) {
          store.dispatch("currentUser", firebaseUser.user);
        }
        next("/");
      } else if (firebaseUser) {
        console.log(firebaseUser);
        store
          .dispatch("currentUser", firebaseUser.user)
          .then(() => next("/dashboard"));
      } else {
        store.dispatch("signout", null);
      }
      unsubscribe();
    }
  });
});
