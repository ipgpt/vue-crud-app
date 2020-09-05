import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import User from "./views/User";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/vue-crud-app/",
      component: Home
    },
    {
      path: "/vue-crud-app/user",
      component: User
    },
    {
      path: "*",
      name: "catchAll",
      component: Home
    }
  ]
});
