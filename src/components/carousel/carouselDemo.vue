<template>
  <div class="carousel-demo">
    <carousel :swiperConfig="swiperConfig" :displayConfig="displayConfig" />
  </div>
</template>

<script>
import carousel from "./carousel";
export default {
  name: "carousel-demo",
  components: {
    carousel
  },
  data() {
    return {
      swiperConfig: {
        showNext: true,
        swiperList: []
      },
      displayConfig: {
        width: 614,
        height: 345,
        // 待展示项的左偏移量
        subOffsetLeft: 115,
        // 待展示项的顶部偏移量
        subOffsetTop: 0
      }
    };
  },
  mounted() {
    this.swiperConfig.swiperList = [
      {
        picture: require("@/assets/c-1.jpg")
      },
      {
        picture: require("@/assets/c-2.jpg")
      },
      {
        picture: require("@/assets/c-3.jpg")
      },
      {
        picture: require("@/assets/c-4.jpg")
      },
      {
        picture: require("@/assets/c-5.jpg")
      }
    ];
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.carousel-demo {
}
</style>
