<template>
  <div class="markdom-container">
    <JS />
  </div>
</template>

<script>
import JS from "@markdom/JS.md";

export default {
  components: {
    JS
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.markdom-container {
  box-sizing: border-box;
  padding: 10px;
}
</style>
