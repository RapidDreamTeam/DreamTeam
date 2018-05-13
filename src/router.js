import Vue from "vue";
import Router from "vue-router";
import Main from "@/views/Main.vue";
import Login from "@/views/Login.vue";
import LandingPage from "@/views/LandingPage.vue";
import PageNotFound from "@/views/PageNotFound.vue";
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
    },
    {
      path: "*",
      name: "Page not found",
      component: PageNotFound
    }
  ]
});
