import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const constantRoter = [
  {
    path: "/",
    redirect: "/index"
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
    path: "/uploadAvatarV1",
    component: () => import("@/components/upload-avatar-v1/demo"),
    name: "uploadAvatarV1"
  },
  {
    path: "/uploadAvatarV2",
    component: () => import("@/components/upload-avatar-v2/demo"),
    name: "uploadAvatarV2"
  }
];

const router = new Router({
  mode: "hash",
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoter
});

export default router;
