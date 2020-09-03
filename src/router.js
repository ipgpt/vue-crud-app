import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import Edit from "./views/Edit";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/edit",
      component: Edit
    }
  ]
});
