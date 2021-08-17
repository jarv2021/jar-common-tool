<template>
  <div id="app">
    <div class="app-boxs">
      <div class="info-box">
        <img
          class="info-logo"
          :src="logo"
          alt="一个可以fork的工具库"
          @click="logoClick"
        />
        <div class="site-name">Components</div>
        <div class="site-description">一个可以fork的工具库</div>
      </div>
      <div class="navlist">
        <template v-for="item of list">
          <div :key="item.id" class="in-app" @click="appClick(item)">
            {{ item.name }}
          </div>
        </template>
      </div>
    </div>
    <div class="app-view">
      <router-view />
    </div>
  </div>
</template>

<script>
import logo from "./assets/logo.png";
export default {
  name: "App",
  components: {},
  data() {
    return {
      logo,
      list: [
        {
          id: Math.random(),
          type: "index",
          name: "首页"
        },
        {
          id: Math.random(),
          type: "carousel",
          name: "双项轮播"
        },
        {
          id: Math.random(),
          type: "car",
          name: "vue车牌号选择器"
        },
        {
          id: Math.random(),
          type: "pdf",
          name: "pdf阅读组件"
        },
        {
          id: Math.random(),
          type: "uploadAvatar",
          name: "头像上传"
        }
      ]
    };
  },
  methods: {
    appClick(item) {
      this.$router.push(item.type);
    },
    logoClick() {
      this.appClick({
        id: Math.random(),
        type: "index",
        name: "首页"
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  min-height: 100vh;

  box-sizing: border-box;

  display: flex;

  .app-boxs {
    width: 20%;
    min-width: 200px;

    background-size: cover;
    background-color: #f8f9fa;

    .info-box {
      margin: 100px auto 0 auto;
      .info-logo {
        width: 200px;
        height: 200px;

        max-width: 200px;
        max-height: 200px;

        display: block;
        margin: 0 auto;

        cursor: pointer;
      }
      .site-name {
        color: #343a40;
        cursor: pointer;
        font-family: "Noto Serif", "PT Serif", source-han-serif-sc,
          "Source Han Serif SC", "Source Han Serif CN", "Source Han Serif TC",
          "Source Han Serif TW", "Source Han Serif", "Songti SC", SimSon, serif;
        font-weight: 700;
        font-size: 28px;
        letter-spacing: 1px;

        text-align: center;

        &:hover {
          color: #099268;
          text-decoration: none;
          transition: all 0.5s;
        }
      }
      .site-description {
        text-align: center;

        margin: 15px auto;
        color: #868e96;
        font-size: 16px;
      }
    }

    .navlist {
      margin-top: 50px;

      user-select: none;

      font-family: "Noto Serif", "PT Serif", source-han-serif-sc,
        "Source Han Serif SC", "Source Han Serif CN", "Source Han Serif TC",
        "Source Han Serif TW", "Source Han Serif", "Songti SC", SimSon, serif;
      font-weight: 500;
      font-size: 18px;

      box-sizing: border-box;
      padding: 0 40px;

      // display: grid;
      // grid-template-columns: repeat(2, 50%);

      .in-app {
        margin: 10px;
        text-align: left;

        @include greenTextBtn();
      }
    }
  }

  .app-view {
    padding-left: 15px;
    flex: 1;
    min-width: 1484px;

    height: 100vh;

    overflow-x: hidden;
    overflow-y: auto;

    background: #f5fafc;
  }
}
</style>
