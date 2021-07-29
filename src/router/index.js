import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const constantRoter = [
  {
    path: "/markdom",
    component: () => import("@/components/markdom/index"),
    name: "markdom"
  },
  {
    path: "/car",
    component: () => import("@/components/car/carDemo"),
    name: "car"
  },
  {
    path: "/pdf",
    component: () => import("@/components/pdf/onlinePdf"),
    name: "pdf"
  },
  {
    path: "/scrollPdf",
    component: () => import("@/components/pdf/scrollPdf"),
    name: "pdf"
  },
  {
    path: "/markdom",
    component: () => import("@/components/markdom/index"),
    name: "markdom"
  },
  {
    path: "/uploadAvatar",
    component: () => import("@/components/upload-avatar/demo"),
    name: "uploadAvatar"
  }
];

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoter
});

export default router;
