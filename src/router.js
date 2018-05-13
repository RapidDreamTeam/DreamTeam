import Vue from "vue";
import Router from "vue-router";
import Main from "@/views/Main.vue";
import Login from "@/views/Login";
import LandingPage from "@/views/LandingPage";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Main
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/",
      name: "Dashboard",
      component: LandingPage
    }
  ]
});
