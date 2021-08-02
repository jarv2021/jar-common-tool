<template>
  <div class="markdom-container"></div>
</template>

<script>
import JS from "./JS.md";
// import JS from "@markdom/JS.md";

export default {
  name: "markdom",
  components: {},
  data() {
    return {
      JS
    };
  },
  mounted() {
    console.info("JS", JS);
  },
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.markdom-container {
  box-sizing: border-box;
  padding: 10px;
}
</style>
