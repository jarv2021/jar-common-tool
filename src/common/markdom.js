import Vue from "vue";
Vue.component("MARKDOM", {
  name: "markdom",
  render: function(createElement) {
    return createElement(this.md);
  },
  props: {
    md: {
      type: [Object, String],
      default: () => {}
    }
  }
});
