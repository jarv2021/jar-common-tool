<template>
  <div class="car-box">
    <car-input v-model="carNum">
      <div class="trigger">触发</div>
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
import carInput from "./carInput";
export default {
  components: { carInput },
  data() {
    return {
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
