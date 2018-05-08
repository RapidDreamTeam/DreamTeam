import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "./firebase";
import "./registerServiceWorker";

Vue.config.productionTip = false;

// Can reference firebase using Vue.firebase.auth()......
Vue.firebase = firebase;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
