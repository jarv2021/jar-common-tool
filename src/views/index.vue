<template>
  <div class="index-container">
    <article
      class="in-item"
      v-for="item of list"
      :key="item.id"
      @click="itemClick(item)"
    >
      <div class="item-cover" :style="handleCover(item)"></div>
      <div class="item-post">
        <div class="post-title">{{ item.title }}</div>
        <div class="post-desc">{{ item.desc }}</div>
      </div>
    </article>
  </div>
</template>

<script>
import cardImg from "./../assets/card_num_select.png";
import carousel from "./../assets/carousel.jpg";
import pdfRead from "./../assets/pdf_read.jpg";
import uploadAvatar from "./../assets/upload_avatar.jpg";

export default {
  name: "index-container",
  data() {
    return {
      list: [
        {
          id: Math.random(100),
          title: "双项轮播组件",
          cover: carousel,
          desc:
            "一般轮播都是左中右结构的，这个组件的轮播是左右结构的，目前尚未被超越，哈哈哈",
          path: "/carousel"
        },
        {
          id: Math.random(100),
          title: "pdf阅读组件",
          cover: pdfRead,
          desc: "该组件支持滚动翻页和点击翻页功能",
          path: "/pdf"
        },
        {
          id: Math.random(100),
          title: "twittetr头像上传组件",
          cover: uploadAvatar,
          desc: "仿twittetr头像上传组件",
          path: "/uploadAvatar"
        },
        {
          id: Math.random(100),
          title: "vue车牌号选择器组件",
          cover: cardImg,
          desc:
            "这个组件是完全原生的，目前支持非绿车牌，如有需更多支持，敬请github留言",
          path: "/car"
        }
      ]
    };
  },
  methods: {
    handleCover(item) {
      return `
         background-image:url(${item.cover});
         background-size:cover;
        `;
    },
    itemClick(item) {
      this.$router.push(item.path);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.index-container {
  display: grid;
  grid-template-columns: repeat(3, 450px);
  grid-template-rows: repeat(1, 516px);

  grid-row-gap: 30px;
  grid-column-gap: 30px;

  margin: 30px 15px 30px 15px;

  .in-item {
    width: 100%;
    display: inline-block;

    box-sizing: border-box;
    background: #ffffff;

    border-radius: 8px;
    overflow: hidden;

    cursor: pointer;

    &:hover {
      box-shadow: 0 4px 9px rgba(0, 0, 0, 0.3);
      transition: all 0.35s ease;
    }

    .item-cover {
      width: 100%;
      height: 252px;

      border-radius: 8px 8px 0 0;
      background-color: rgba(220, 235, 245, 0.2);
      background-position: center;

      background-size: cover;
      background-repeat: no-repeat;
    }

    .item-post {
      box-sizing: border-box;
      padding: 40px 30px;

      width: 100%;
      height: 252px;

      .post-title {
        text-decoration: none;
        color: #222;
        transition: all 0.2s ease;
        font-size: 27px;
        font-family: "PT Serif", serif;
        line-height: 1.5;
        font-weight: 600;

        margin-bottom: 15px;
      }

      .post-desc {
        font-family: "Roboto", Arial, Helvetica, sans-serif;
        font-size: 15px;
        line-height: 1.6;
        color: #787878;
      }
    }
  }
}
</style>
