<template>
  <div class="car-box">
    <car-input v-model="carNum">
      <div class="trigger">触发</div>
    </car-input>
    <div v-if="carNum && carNum.length > 0">
      <p>select：</p>
      {{ carNum.join("") }}
    </div>
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
}
</style>
