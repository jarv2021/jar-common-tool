<template>
  <div class="car-box">
    <div class="article-box">
      <MARKDOM :md="README" />
    </div>

    <car-input v-model="carNum">
      <div class="trigger">车牌号选择器触发</div>
    </car-input>

    <template v-if="show">
      <div>
        <p>select：</p>
        {{ carNum.join("") }}
      </div>
      <div class="clear-btn" @click="clear">
        clear
      </div>
    </template>
  </div>
</template>

<script>
import README from "./README.md";
import carInput from "./carInput";
export default {
  components: { carInput },
  data() {
    return {
      README,
      carNum: null
    };
  },
  computed: {
    show() {
      return this.carNum && this.carNum.length > 0;
    }
  },
  methods: {
    clear() {
      this.carNum = null;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.car-box {
  margin: 15px;
  .trigger {
    @include utilBtn();
    @include primaryBtn();
  }
  .clear-btn {
    @include utilBtn();
    @include primaryBtn();

    width: 100px;
    margin-top: 30px;
  }
}
</style>
