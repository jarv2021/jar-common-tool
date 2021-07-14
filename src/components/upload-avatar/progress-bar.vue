<template>
  <div class="progress-container-box">
    <div class="less-box" @click="enlessFun" />
    <div class="progress-box" @click="progressClick">
      <div class="progress-btn" @mousedown="progressMousedown" />
      <div class="progress-mask" />
    </div>
    <div class="more-box" @click="enlargeFun" />
  </div>
</template>

<script>
export default {
  props: {
    progressNum: [String, Number],
    wheelConfig: [Object]
  },
  data() {
    return {
      maxRangX: ""
    };
  },
  watch: {
    progressNum: {
      handler(newVal) {
        this.handleProgressNum(newVal);
      },
      deep: true
    }
  },
  mounted() {
    this.initSetting();
  },
  destroyed() {
    let target = document.querySelector("body");
    target &&
      target.removeEventListener("mousemove", this.progressMousemove, false);
  },
  methods: {
    initSetting() {
      this.handleProgressNum(this.progressNum);
    },
    enlessFun() {
      // this.$emit('enless')
    },
    enlargeFun() {
      // this.$emit('enlarge')
    },
    progressMousedown(event) {
      this.leftVal = event.clientX - event.target.offsetLeft;
      this.setDocumentListten();
    },
    setMaxRangX() {
      const scroll = document.querySelector(".progress-box");
      const bar = document.querySelector(".progress-btn");
      this.maxRangX = scroll.offsetWidth - bar.offsetWidth || 216;
    },
    setDocumentListten() {
      let target = document.querySelector("body");
      // let target = document.querySelector(".progress-container-box");
      target &&
        target.addEventListener("mousemove", this.progressMousemove, false);
      // document.addEventListener('mousemove', this.progressMousemove, false)
      document.addEventListener("mouseup", this.progressMouseup, false);
    },
    progressMouseup(event) {
      event.preventDefault();
      // let target = document.querySelector(".progress-container-box");
      let target = document.querySelector("body");
      target &&
        target.removeEventListener("mousemove", this.progressMousemove, false);
    },
    progressMousemove(event) {
      this.setMaxRangX();

      this.setRateView(event);
    },
    setRateView(event) {
      const scroll = document.querySelector(".progress-box");
      const bar = document.querySelector(".progress-btn");

      let barleft = 0;
      const leftVal = this.leftVal;
      barleft = event.clientX - leftVal;

      if (barleft < 0) barleft = 0;
      else if (barleft > this.maxRangX) {
        barleft = scroll.offsetWidth - bar.offsetWidth;
      }

      let rate = barleft / (scroll.offsetWidth - bar.offsetWidth);

      if (rate <= 0.001) rate = 0;
      if (rate >= 0.98) rate = 1;

      this.$emit("progressResult", rate);
    },
    handleProgressNum(num) {
      let wheelConfig = this.wheelConfig;
      let denominator =
        Number(wheelConfig.maxZoom) - Number(wheelConfig.minZoom);

      num = Math.abs(num) / denominator;

      const bar = document.querySelector(".progress-btn");
      const mask = document.querySelector(".progress-mask");
      this.setMaxRangX();

      let barleft = num * this.maxRangX;
      if (barleft < 0) barleft = 0;
      else if (barleft > this.maxRangX) {
        barleft = this.maxRangX;
      }

      if (mask) mask.style.width = barleft + "px";
      if (bar) bar.style.left = barleft + "px";
    },
    progressClick(event) {
      if (
        event.target.className === "progress-box" ||
        event.target.className === "progress-mask"
      ) {
        this.setMaxRangX();
        const bar = document.querySelector(".progress-btn");
        let rate = (event.offsetX - bar.offsetWidth / 2) / this.maxRangX;
        this.$emit("progressResult", rate);
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.progress-container-box {
  width: 100%;
  height: 64px;
  background: #ffffff;

  display: flex;
  align-items: center;

  box-sizing: border-box;
  padding: 0 82px;
  border-radius: 0 0 20px 20px;

  .less-box {
    display: inline-block;
    width: 22px;
    height: 22px;
    background-image: url("./avatar_pop_enless.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;

    // cursor: pointer;
  }

  .more-box {
    display: inline-block;
    width: 22px;
    height: 22px;
    background-image: url("./avatar_pop_enlarge.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;

    // cursor: pointer;
  }

  .progress-box {
    width: 240px;
    height: 6px;
    background: #cccccc;
    border-radius: 3px;

    margin: 0 24px;

    position: relative;
    cursor: pointer;

    .progress-btn {
      width: 24px;
      height: 24px;
      background: #ffffff;
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.16);
      border-radius: 50%;

      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);

      cursor: pointer;
    }

    .progress-mask {
      width: 0;
      height: 6px;
      background: #ff97c4;
      border-radius: 3px;
    }
  }
}
</style>
