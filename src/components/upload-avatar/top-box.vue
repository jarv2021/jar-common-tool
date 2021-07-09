<template>
  <div class="top-box">
    <div class="title-box">
      <span class="back-arrow" @click="close" />
      <span>Update Profile Picture</span>
    </div>
    <div class="save-btn" @click="save">
      save
    </div>
  </div>
</template>

<script>
export default {
  name: "topBox",
  methods: {
    save() {
      this.$emit("save");
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="less" scoped>
.top-box {
  display: flex;
  align-items: center;

  justify-content: space-between;

  box-sizing: border-box;
  padding: 0 30px;

  width: 100%;
  height: 70px;
  background: #ffffff;

  border-radius: 20px 20px 0 0;

  .title-box {
    font-size: 20px;
    font-family: OpenSans-Semibold, OpenSans;
    font-weight: 600;
    color: #333333;
    line-height: 30px;

    display: flex;
    align-items: center;

    .back-arrow {
      display: inline-block;
      width: 20px;
      height: 20px;
      background-image: url("./return-arrow.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;

      margin-right: 10px;
      cursor: pointer;
    }
  }

  .save-btn {
    width: 80px;
    height: 30px;
    background: #ff2d89;
    border-radius: 18px;

    font-size: 14px;
    font-family: OpenSans-Semibold, OpenSans;
    font-weight: 600;
    color: #ffffff;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
    &:active {
      opacity: 0.8;
    }
  }
}
</style>
