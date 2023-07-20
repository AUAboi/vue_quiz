import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Game from "../views/Game.vue";
import Login from "../views/Auth/Login.vue";
import Admin from "../views/Auth/Admin.vue";
// import NotFound from "../views/NotFound.vue";

import store from "../store";

//These are middlewares
//auth checks for authenticated user
import auth from "./middleware/auth";
//guest checks for non-authenticated user
import guest from "./middleware/guest";

import middlewarePipeline from "./kernel/middlewarePipeline";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",

    component: () => import("../views/About.vue"),
  },
  {
    path: "/rules",
    name: "Rules",
    component: () => import("../views/Rules.vue"),
  },
  {
    path: "/quiz-game/",
    name: "Game",
    component: Game,

  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      middleware: [guest],
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//Midlleware for components
router.beforeEach((to, from, next) => {
  if (to.name == "NotFound") {
    return next();
  }
  //this middleware variable checks if componenet has middleware and what middleware

  let middleware = to.matched
    .map((matched) => {
      return matched.meta.middleware;
    })
    .filter((middleware) => {
      return middleware != undefined;
    })
    .flat();

  //if theres no middleware
  if (!middleware.length) {
    return next();
  }

  const context = {
    to,
    from,
    next,
    router,
    store,
  };

  //calls middlewarePipeline to check every middleware on a given componenet
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
