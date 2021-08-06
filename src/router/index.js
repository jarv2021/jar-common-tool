import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const constantRoter = [
  {
    path: "/",
    component: () => import("@/views/index"),
    name: "index"
  },
  {
    path: "/index",
    component: () => import("@/views/index"),
    name: "index"
  },
  {
    path: "/car",
    component: () => import("@/components/car/carDemo"),
    name: "car"
  },
  {
    path: "/pdf",
    component: () => import("@/components/pdf/pdfDemo"),
    name: "pdf"
  },
  {
    path: "/carousel",
    component: () => import("@/components/carousel/carouselDemo"),
    name: "carousel"
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
