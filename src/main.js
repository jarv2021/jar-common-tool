import Vue from "vue";
import App from "./App.vue";
import "./styles/reset.scss";

import router from "./router/index";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
