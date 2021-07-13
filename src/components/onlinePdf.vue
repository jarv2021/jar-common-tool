<template>
  <div class="pdf-box">
    <div class="left-part">
      <div class="pdf-box">
        <template v-if="showLoading">
          <div class="page-loading">loading</div>
        </template>
        <Pdf
          class="pdf-container"
          :src="src"
          :page="page"
          @num-pages="getToalPage"
          @progress="getProgress"
        />
      </div>
    </div>
    <div class="right-part">
      <div class="page-box" v-if="totalPage && totalPage > 0">
        <template v-for="item of totalPage">
          <div :class="pageClass(item)" :key="item.id" @click="pageClick(item)">
            page {{ item }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Pdf from "vue-pdf";

export default {
  components: {
    Pdf
  },
  data() {
    return {
      // vue-cli3版本脚手架对外暴露的静态文件入口是public文件夹(原来是static文件夹)
      src: "./extre/test.pdf",
      page: 1,
      totalPage: 0,
      progress: 0
    };
  },
  computed: {
    showLoading() {
      return this.progress >= 1 ? false : true;
    }
  },
  methods: {
    pageClass(page) {
      let className = page === this.page ? "in-page in-active" : "in-page";
      return className;
    },
    pageClick(page) {
      this.page = page;
    },
    getToalPage(data) {
      this.totalPage = data;
    },
    getProgress(data) {
      this.progress = data;
    }
  },
  mounted() {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.pdf-box {
  width: 100%;
  height: 100%;
  min-height: 100%;
  background: black;

  display: flex;
  align-items: center;

  .left-part {
    width: 80%;
    height: 100%;
    .pdf-box {
      width: 100%;
      height: 100%;
      .pdf-container {
        width: 100%;
        height: 100%;
      }
    }
  }

  .right-part {
    width: 20%;
    height: 100%;
    .page-box {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .in-page {
        flex: 1;

        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        min-height: 30px;

        cursor: pointer;

        color: white;

        &:hover {
          background: rgba(255, 255, 255, 0.8);
        }
      }
      .in-active {
        background: rgba(255, 255, 255, 0.8);
      }
    }
  }

  .page-loading {
    width: 100%;
    height: 100%;
    color: wheat;

    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
