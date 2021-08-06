<template>
  <div class="index-container">
    <article class="in-item" v-for="item of list" :key="item.id">
      <div class="item-cover" :style="handleCover(item)"></div>
      <div class="item-post">
        <div class="post-title">{{ item.title }}</div>
        <div class="post-desc">{{ item.desc }}</div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "index-container",
  data() {
    return {
      list: [
        {
          id: Math.random(100),
          title: "10 Best books of all time",
          cover: "https://lokmont-jekyll.netlify.app/images/pages/17.jpg",
          desc:
            "Neutra cornhole fanny pack brooklyn dreamcatcher hashtag bitters pickled YOLO photo booth deep v single-origin coffee portland cloud bread. Next..."
        },
        {
          id: Math.random(100),
          title: "That I take with me on tour",
          cover: "https://lokmont-jekyll.netlify.app/images/pages/3.jpg",
          desc:
            "Literally lomo blue bottle pabst retro snackwave brooklyn taiyaki bitters. Stumptown tilde bespoke dreamcatcher enamel pin, pok pok blog drinking..."
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

  margin: 30px 15px 0 15px;

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
