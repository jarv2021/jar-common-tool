<template>
  <div class="banner-swiper-box">
    <div v-if="copySwiperList.length > 0" class="swiper-container">
      <div class="carousel-box">
        <template v-for="(swiperItem, index) of copySwiperList">
          <div
            :ref="`swiperItem${index}`"
            :key="swiperItem.id"
            :style="handleStyle(swiperItem)"
            :class="swiperItem.className"
          >
            <img
              :src="swiperItem.picture"
              class="in-img util-img-load"
              @click="imgClick(swiperItem)"
            />
          </div>
        </template>

        <div class="number-box">
          <template v-for="(item, index) of copySwiperList">
            <div class="in-item" @click="numClick(item)">
              <div class="num">
                {{ `0${index + 1}` }}
              </div>
              <div :class="handlerNumClass(item)">
                <div
                  v-if="item.className === 'display-item'"
                  class="in-progress"
                />
              </div>
            </div>
          </template>
        </div>

        <div v-if="showNextBox" class="next-box" @click="nextClick">
          NEXT
          <div class="right-arrow" style="margin-left:10px;" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "carousel",
  props: {
    swiperConfig: {
      type: [Object],
      default: () => {
        return {
          showNext: true,
          swiperList: []
        };
      }
    },
    displayConfig: {
      type: [Object],
      default: () => {
        return {
          width: 615,
          height: 345,
          // 待展示项的左偏移量
          subOffsetLeft: 115,
          // 待展示项的顶部偏移量
          subOffsetTop: 0
        };
      }
    }
  },
  data() {
    return {
      timer: null,
      loopTime: 5,
      copySwiperList: []
    };
  },
  computed: {
    showNextBox() {
      return (
        this.copySwiperList.length > 1 && this.swiperConfig.showNext === true
      );
    }
  },
  watch: {
    swiperConfig: {
      handler() {
        this.init();
      },
      deep: true
    }
  },
  destroyed() {
    if (this.timer) clearTimeout(this.timer);
  },
  methods: {
    init() {
      this.copySwiperList = JSON.parse(
        JSON.stringify(this.swiperConfig.swiperList)
      );

      this.copySwiperList = this.copySwiperList.map((item, index) => {
        if (index === 0) {
          item.className = "display-item";
        } else if (index === 1) {
          item.className = "carousel-item";
        } else {
          item.className = "hidden-item";
        }
        item.originIndex = index;
        return item;
      });
      this.currentSwiperItem = this.copySwiperList[0];

      this.$nextTick(() => {
        this.setImgLimits();
      });

      this.loop();
    },
    loop() {
      // display-item carousel-item
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        // console.info('loop')
        this.nextClick();
        this.loop();
      }, this.loopTime * 1000);
    },
    handleStyle(item) {
      let displayConfig = this.displayConfig;
      let result = `
      z-index:${100 - item.originIndex};
      opacity:${0.3 - item.originIndex / 30};`;

      if (item.originIndex === this.currentSwiperItem.originIndex) {
        result += `z-index:${200};opacity:1;`;
      }

      // if (item.className === "display-item") {
      //   result += `
      //    width:${displayConfig.width}px;
      //    height:${displayConfig.height}px;
      //   `;
      // }

      if (item.className === "carousel-item") {
        result += `
         left:${displayConfig.subOffsetLeft}px;
         top:${displayConfig.subOffsetTop}px;
        `;
      }

      // console.info("item", item);
      // console.info("result", result);
      return result;
    },
    handlerNumClass(item) {
      return item.className === "display-item"
        ? "in-num-line-active"
        : "in-num-line";
    },
    imgClick(item) {
      if (item.className !== "display-item") {
        this.nextClick();
      }
    },
    numClick(item) {
      if (this.currentSwiperItem.originIndex === item.originIndex) return;

      if (this.timer) clearTimeout(this.timer);
      this.clearDisplay();

      item.className = "display-item";
      this.currentSwiperItem = item;

      let preTaget = this.copySwiperList.find(
        obj => obj.originIndex === item.originIndex - 1
      );
      if (!preTaget) {
        preTaget = this.copySwiperList[this.copySwiperList.length - 1];
      }
      preTaget.className = "hidden-item";

      let nextTaget = this.copySwiperList.find(
        obj => obj.originIndex === item.originIndex + 1
      );
      if (!nextTaget) {
        nextTaget = this.copySwiperList[0];
      }

      nextTaget.className = "carousel-item";

      this.loop();

      this.$forceUpdate();
    },
    nextClick() {
      let target = this.copySwiperList.find(
        item => item.originIndex === this.currentSwiperItem.originIndex + 1
      );
      if (!target) {
        target = this.copySwiperList[0];
      }
      this.numClick(target);
    },
    // 清除进度条
    clearDisplay() {
      let currentProgressArr = document.querySelectorAll(".in-progress");
      if (currentProgressArr.length > 0) {
        for (let itemObj of currentProgressArr) {
          itemObj.classList.remove("display-item");
          itemObj.classList.remove("in-progress");
        }
      }

      this.copySwiperList = this.copySwiperList.map(item => {
        if (item.className === "display-item") {
          item.className = "hidden-item";
        }
        return item;
      });
    },
    setImgLimits() {
      let displayConfig = this.displayConfig;
      let imgArr = document.querySelectorAll(".in-img");
      // console.info("imgArr", imgArr);
      let styleStr = `
           width:${displayConfig.width}px;
           height:${displayConfig.height}px;
           max-width: ${displayConfig.width}px;
           min-width: ${displayConfig.width}px;
           max-height:${displayConfig.height}px;
           min-height:${displayConfig.height}px;
           object-fit: cover;
      `;
      for (let img of imgArr) {
        img.setAttribute("style", styleStr);
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@mixin utilTransition {
  $transitionTime: 1s;
  transition-property: "scale";
  transition-property: "left";
  transition-duration: $transitionTime;
  transition-timing-function: ease;
  transform-style: preserve-3d;
}

@keyframes progressBar {
  0% {
    width: 10%;
    // opacity: 0.1;
  }
  100% {
    width: 100%;
    // opacity: 1;
  }
}

.banner-swiper-box {
  background: #ffffff;

  box-sizing: border-box;
  padding: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  .swiper-container {
    min-width: 1200px;
    margin: 0 auto;

    display: flex;

    .info-box {
      min-width: 415px;

      position: relative;

      .info-title {
        font-size: 32px;
        font-family: "OpenSans-Bold", "OpenSans";
        font-weight: bold;
        color: #3e3e3e;
        line-height: 43px;

        max-width: 415px;
        width: 415px;

        max-height: 172px;

        margin-top: 75px;

        cursor: pointer;
      }

      .info-desc {
        font-size: 16px;
        font-family: "OpenSans";
        color: #868686;
        line-height: 24px;

        max-width: 415px;
        width: 415px;

        max-height: 96px;

        margin-top: 20px;

        cursor: pointer;
      }

      .info-view {
        position: absolute;
        bottom: 43px;

        cursor: pointer;
        user-select: none;

        .view-title-box {
          font-size: 18px;
          font-family: "OpenSans-Semibold", "OpenSans";
          font-weight: 600;
          color: #505050;
          line-height: 24px;

          display: inline-flex;

          .arrow-box {
            display: flex;
            align-items: center;

            margin-top: 4px;
            margin-left: 7px;
          }

          box-sizing: border-box;
          padding-bottom: 5px;
          border-bottom: 1px #505050 solid;
        }

        &:hover {
          .view-title-box {
            color: #7b7b7b;
            border-bottom: 1px #7b7b7b solid;

            .right-arrow {
              border-top: 2px solid #7b7b7b;
              border-right: 2px solid #7b7b7b;
            }
          }
        }

        &:active {
          .view-title-box {
            color: #505050;
            border-bottom: 1px #505050 solid;

            .right-arrow {
              border-top: 2px solid #505050;
              border-right: 2px solid #505050;
            }
          }
        }
      }
    }

    .carousel-box {
      min-width: 747px;
      min-height: 384px;

      // overflow: hidden;

      display: flex;

      margin-top: 67px;
      margin-left: 38px;

      position: relative;

      .display-item {
        position: absolute;
        left: 0;

        z-index: 10;

        @include utilTransition();

        cursor: pointer;

        .in-img {
        }
      }

      .carousel-item {
        transform: scale(0.8);

        position: absolute;
        left: 115px;
        top: 0;

        z-index: 4;

        @include utilTransition();

        cursor: pointer;

        .in-img {
        }
      }

      .hidden-item {
        transform: scale(0.8);
        visibility: hidden;

        position: absolute;
        left: -115px;
        top: 0;

        z-index: 4;

        @include utilTransition();

        .in-img {
        }
      }

      .number-box {
        display: flex;

        position: absolute;
        bottom: 0;
        left: 63px;

        user-select: none;

        .in-item {
          display: flex;
          flex-direction: column;
          align-items: center;

          margin-right: 19px;

          cursor: pointer;

          .num {
            font-size: 16px;
            font-family: "OpenSans";
            color: #6b6b6b;
            line-height: 22px;
          }

          .in-num-line {
            width: 24px;
            height: 2px;
            background: #eeeeee;
            border-radius: 1px;

            transition: width 5s ease;
          }

          .in-num-line-active {
            width: 24px;
            height: 2px;
            background: #eeeeee;
            border-radius: 1px;
          }

          .in-progress {
            animation-name: progressBar;
            animation-duration: 4.5s;
            animation-timing-function: linear;
            animation-iteration-count: 1;

            width: 24px;
            height: 2px;
            background: #ff5fa5;
            border-radius: 1px;
          }

          &:hover {
            color: #6b6b6b;

            .in-num-line {
              background: #6b6b6b;
            }
          }

          &:active {
            color: #6b6b6b;

            .in-num-line {
              background: #6b6b6b;
            }
          }
        }
      }

      .next-box {
        font-size: 18px;
        font-family: "OpenSans-Semibold", "OpenSans";
        font-weight: 600;
        color: #505050;
        line-height: 24px;

        display: flex;
        align-items: center;

        cursor: pointer;
        user-select: none;

        position: absolute;
        top: 158px;
        right: 0;

        &:hover {
          color: #7b7b7b;

          .right-arrow {
            border-top: 2px solid #7b7b7b;
            border-right: 2px solid #7b7b7b;
          }
        }

        &:active {
          color: #505050;

          .right-arrow {
            border-top: 2px solid #505050;
            border-right: 2px solid #505050;
          }
        }
      }
    }
  }
}

$arrrowSize: 5px;
.right-arrow {
  width: $arrrowSize;
  height: $arrrowSize;
  border-top: 2px solid #505050;
  border-right: 2px solid #505050;
  transform: rotate(45deg);

  &:hover {
    //   color: #7b7b7b;
    border-top: 2px solid #7b7b7b;
    border-right: 2px solid #7b7b7b;
  }
}
</style>
