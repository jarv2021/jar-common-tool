import Vue from "vue";
import "../styles/MARKDOM.scss";

Vue.component("MARKDOM", {
  name: "markdom",
  render: function(createElement) {
    return createElement(this.md, {
      class: "markdom-container"
    });
  },
  props: {
    md: {
      type: [Object, String],
      default: () => {}
    }
  }
});
