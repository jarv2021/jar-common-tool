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

<style lang="less" scoped>
.readme-mark-dom {
  margin: 20px;
}
</style>
