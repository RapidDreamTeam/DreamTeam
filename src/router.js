import Vue from "vue";
import Router from "vue-router";
import Main from "@/views/Main.vue";
import Signin from "@/views/Signin.vue";
import Signup from "@/views/Signup.vue";
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
      path: "/signin",
      name: "Sign In",
      component: Signin
    },
    {
      path: "/signup",
      name: "Sign Up",
      component: Signup
    },
    {
      path: "/",
      name: "Home",
      component: LandingPage
    },
    {
      path: "*",
      name: "Page not found",
      component: PageNotFound
    }
  ]
});
