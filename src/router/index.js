import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Category from "../views/Category.vue";
import Game from "../views/Game.vue";
import Login from "../views/Auth/Login.vue";
import Admin from "../views/Auth/Admin.vue";
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
    path: "/choose-category",
    name: "Category",
    component: Category,
  },
  {
    path: "/quiz-game/:category",
    name: "Game",
    component: Game,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
