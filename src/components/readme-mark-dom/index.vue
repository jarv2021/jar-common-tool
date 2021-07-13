<template>
  <markdown class="readme-mark-dom" />
</template>

<script>
import markdown from "./../../../README.md";
export default {
  name: "readme",
  components: {
    markdown
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.readme-mark-dom {
  margin: 20px;
}
</style>
