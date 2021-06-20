<template>
  <div id="app">
    <div class="app-boxs">
      <template v-for="item of list">
        <div :key="item.id" class="in-app" @click="appClick(item)">
          {{ item.name }}
        </div>
      </template>
    </div>
    <div class="app-view">
      <router-view style="min-height: 90vh" />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      list: [
        {
          id: Math.random(),
          type: "markdom",
          name: "查询资料",
        },
        {
          id: Math.random(),
          type: "car",
          name: "车牌号选择器",
        },
        {
          id: Math.random(),
          type: "pdf",
          name: "pdf阅读组件",
        },
        {
          id: Math.random(),
          type: "scrollPdf",
          name: "scrollPdf阅读组件",
        },
      ],
    };
  },
  methods: {
    appClick(item) {
      this.$router.push(item.type);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./styles/mixin");
#app {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: black;

  padding: 30px;

  box-sizing: border-box;

  display: flex;

  .app-boxs {
    .in-app {
      .utilBtn();

      width: 100px;
      height: 30px;

      margin-top: 15px;
      &:first-child {
        margin-top: 0;
      }
    }
  }

  .app-view {
    margin-left: 15px;
    width: 90%;
    height: 90%;
    min-height: 90vh;
    background: burlywood;
  }
}
</style>
