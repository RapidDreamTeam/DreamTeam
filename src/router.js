import Vue from "vue";
import Router from "vue-router";
import Main from "@/views/Main.vue";
import What from "@/views/WhatsUp.vue";
import Hi from "@/views/HiThere.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Main
    },
    {
      path: "/what",
      component: What
    },
    {
      path: "/hi",
      component: Hi
    }
  ]
});
