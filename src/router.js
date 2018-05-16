import Vue from "vue";
import Router from "vue-router";
import Main from "@/views/Main.vue";
import Signin from "@/views/Signin.vue";
import Register from "@/views/Register.vue";
import LandingPage from "@/views/LandingPage.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import Notification from "@/views/Notification.vue";
import { auth } from "@/firebase.js";

Vue.use(Router);

const AuthGuard = (to, from, next) => {
  if (auth().currentUser) {
    next();
  } else {
    next("/register");
  }
};

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Main
      // beforeEnter: AuthGuard
    },
    {
      path: "/signin",
      name: "Sign In",
      component: Signin
    },
    {
      path: "/register",
      name: "Register",
      component: Register
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
    },
    {
      path: "/notification",
      name: "Sign up for Notifications",
      component: Notification
    }
  ]
});
