import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const constantRoter = [
  {
    path: "/readme",
    component: () => import("@/components/readme-mark-dom"),
    name: "readme"
  },
  {
    path: "/car",
    component: () => import("@/components/carDemo"),
    name: "car"
  },
  {
    path: "/pdf",
    component: () => import("@/components/onlinePdf"),
    name: "pdf"
  },
  {
    path: "/scrollPdf",
    component: () => import("@/components/scrollPdf"),
    name: "pdf"
  },
  {
    path: "/markdom",
    component: () => import("@/components/markdom"),
    name: "markdom"
  },
  {
    path: "/uploadAvatar",
    component: () => import("@/components/upload-avatar"),
    name: "uploadAvatar"
  }
];

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoter
});

export default router;
