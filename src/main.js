import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase, { db, auth } from "./firebase";
import Vuetify from "vuetify";
import "./registerServiceWorker";
import "babel-polyfill";
import "vue-material-design-icons/styles.css";

Vue.use(Vuetify);
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  firebase,
  auth,
  db,
  render: h => h(App),
  created: () => {}
});
