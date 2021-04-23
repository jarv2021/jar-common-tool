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

<style lang="less" scoped>
@import url("../styles/mixin");
.car-box {
  margin: 15px;
  .trigger {
    .utilBtn();

    width: 100px;
  }
  .clear-btn {
    .utilBtn();

    width: 100px;
    margin-top: 30px;
  }
}
</style>
