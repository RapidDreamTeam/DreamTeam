import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "./firebase";
import Vuetify from "vuetify";
import "./registerServiceWorker";
import "babel-polyfill";
// import "vuetify/dist/vuetify.min.css";
import "vue-material-design-icons/styles.css";

Vue.use(Vuetify);
Vue.config.productionTip = false;

// Can reference firebase using Vue.firebase.auth()......
Vue.$firebase = firebase;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
