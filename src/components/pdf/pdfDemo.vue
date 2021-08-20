<template>
  <div class="pdf-demo">
    <div class="in-nav">
      <div
        :class="pdfConfig.pageScroll ? 'in-item' : 'in-item-active'"
        @click="navClick"
      >
        翻页阅读
      </div>
      <div
        :class="pdfConfig.pageScroll ? 'in-item-active' : 'in-item'"
        @click="navClick"
      >
        滚动阅读
      </div>
    </div>

    <div class="in-content">
      <div class="in-pdf-box">
        <template v-if="pdfConfig.pageTurn">
          <div class="in-page-turn">
            <pdfComponent
              class="in-pdf"
              ref="pdfComponent"
              :pdfConfig="pdfConfig"
              @totalPage="getTotalPage"
            />

            <div class="page-num-box">
              <template v-for="item of totalPage">
                <div class="in-btn" :key="item" @click="pageClick(item)">
                  {{ item }}
                </div>
              </template>
            </div>
          </div>
        </template>
        <template v-if="pdfConfig.pageScroll">
          <div class="in-page-scroll">
            <pdfComponent
              class="in-pdf"
              ref="pdfComponent"
              :pdfConfig="pdfConfig"
              @totalPage="getTotalPage"
              @scroll="scrollFun"
            />
          </div>
        </template>
      </div>

      <div class="article-box">
        <MARKDOM :md="README" />
      </div>
    </div>
  </div>
</template>

<script>
import README from "./README.md";

import pdfComponent from "./pdfComponent";

export default {
  name: "pdf-demo",
  components: {
    pdfComponent
  },
  data() {
    return {
      README,
      pdfConfig: {
        src: "./extre/suffer.pdf",
        currnetPage: 1,
        pageTurn: true,
        pageScroll: false
      },
      totalPage: 0
    };
  },
  methods: {
    navClick() {
      // this.pdfConfig.pageTurn = !this.pdfConfig.pageTurn;
      // this.pdfConfig.pageScroll = !this.pdfConfig.pageTurn;

      this.pdfConfig = {
        ...this.pdfConfig,
        pageTurn: !this.pdfConfig.pageTurn,
        pageScroll: !!this.pdfConfig.pageTurn
      };
    },
    getTotalPage(data) {
      this.totalPage = data;
    },
    pageClick(item) {
      this.pdfConfig.currnetPage = item;
    },
    scrollFun(page) {
      // console.info(page);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.pdf-demo {
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

    .article-box {
      max-width: 437px;
    }

    .in-pdf-box {
      width: 99%;
      margin: 0 10px;

      .in-page-scroll {
        max-height: 90vh;
        overflow-y: auto;
        .in-pdf {
          max-width: 1000px;

          max-height: 90vh;
          overflow-y: auto;
        }
      }

      .in-page-turn {
        display: flex;

        .in-pdf {
          max-width: 1000px;

          max-height: 90vh;
          overflow-y: auto;
        }

        .page-num-box {
          display: flex;
          flex-direction: column;

          margin-left: 15px;

          .in-btn {
            width: 150px;
            @include utilBtn();
            @include primaryBtn();

            margin: 10px 0;
          }
        }
      }
    }
  }
}
</style>
