import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const constantRoter = [
  {
    path: "/car",
    component: () => import("@/components/carDemo"),
    name: "car"
  },
  {
    path: "/pdf",
    component: () => import("@/components/onlinePdf"),
    name: "pdf"
  }
];

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoter
});

export default router;
