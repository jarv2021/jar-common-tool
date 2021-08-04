<template>
  <div class="carousel-demo">
    <carousel :swiperList="swiperList" />
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
      swiperList: []
    };
  },
  mounted() {
    this.swiperList = [
      {
        picture:
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fyouimg1.c-ctrip.com%2Ftarget%2Ftg%2F210%2F360%2F468%2F12c6835f2b124851b7e18c7dc6fdc281.jpg&refer=http%3A%2F%2Fyouimg1.c-ctrip.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630662527&t=df9cdb9a8660a0f5bddb0490b498a742"
      },
      {
        picture:
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.wangchao.net.cn%2Ffengjing%2F1324806063809.jpg&refer=http%3A%2F%2Fimage.wangchao.net.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630662527&t=6f00272bebb9423028cde39c1d75dd4f"
      },
      {
        picture:
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fyouimg1.c-ctrip.com%2Ftarget%2Ftg%2F623%2F064%2F163%2Fce3f1a0a55164e0a8957acde6683aef2.jpg&refer=http%3A%2F%2Fyouimg1.c-ctrip.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630662527&t=7ef1ea112ec1ca021810cb336958395d"
      },
      {
        picture:
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fyouimg1.c-ctrip.com%2Ftarget%2Ftg%2F106%2F069%2F371%2F3f53bff8412e46deb6e59af671bb1529.jpg&refer=http%3A%2F%2Fyouimg1.c-ctrip.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630662527&t=b6c6149456d6eb5ed061868a99f06922"
      },
      {
        picture:
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201504%2F02%2F153728xb7jhx43434y7334.png&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630662527&t=2f2033098050377cc28f6b8f0ef23596"
      }
    ];
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.carousel-demo {
}
</style>
