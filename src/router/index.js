import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Game from "../views/Game.vue";
import Login from "../views/Auth/Login.vue";
import Register from "../views/Auth/Register.vue";
import Admin from "../views/Auth/Admin.vue";
import Profile from "../views/Profile.vue";
// import NotFound from "../views/NotFound.vue";

import { useUserStore } from "../store/user";

//These are middlewares
//auth checks for authenticated user
import auth from "./middleware/auth";
//guest checks for non-authenticated user
import guest from "./middleware/guest";
//checks for admin user
import isAdmin from "./middleware/isAdmin";

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
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      middleware: [guest],
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      middleware: [isAdmin],
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
  const store = useUserStore()
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
