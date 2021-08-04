<template>
  <div class="pdf-container">
    <div class="in-nav">
      <div
        :class="isScroll ? 'in-item' : 'in-item-active'"
        @click="isScroll = false"
      >
        翻页阅读
      </div>
      <div
        :class="isScroll ? 'in-item-active' : 'in-item'"
        @click="isScroll = true"
      >
        滚动阅读
      </div>
    </div>

    <div class="in-content">
      <!-- <MARKDOM :md="README" /> -->
      <div class="in-pdf-box">
        <template v-if="isScroll">
          <scrollPdf />
        </template>
        <template v-else>
          <onlinePdf />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import onlinePdf from "./onlinePdf";
import scrollPdf from "./scrollPdf";

import README from "./README.md";

export default {
  name: "pdf-container",
  components: {
    scrollPdf,
    onlinePdf
  },
  data() {
    return {
      README,
      isScroll: false
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.pdf-container {
  .in-nav {
    display: flex;
    align-items: center;

    margin: 10px;
    .in-item {
      @include greenTextBtn();
      margin: 5px;
      color: #191d1c;
    }
    .in-item-active {
      @include greenTextBtn();
      margin: 5px;
    }
  }
  .in-content {
    display: flex;

    .in-pdf-box {
      width: 99%;
      max-height: 90vh;
      overflow-y: auto;
    }
  }
}
</style>
