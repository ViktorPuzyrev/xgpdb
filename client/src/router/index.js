import Vue from "vue";
import VueRouter from "vue-router";
import MainView from "../views/MainView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: MainView,
    meta: { title: "Главная страница - XGPdb" },
  },
  {
    path: "/:id(\\w{12})",
    name: "Game",
    component: () => import(/* webpackChunkName: "Game" */ "../views/GameView"),
    meta: { title: "Страница игры - XGPdb" },
  },
  {
    path: "*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "../views/NotFound"),
    meta: { title: "Страница не найдена - XGPdb" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
