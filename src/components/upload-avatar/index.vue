<template>
  <div class="demo-box">
    <div class="upload-btn in-btn" @click="uploadImg">upload</div>
    <uploadAvatar
      ref="uploadAvatar"
      :resultToBlob="true"
      :showProgressBar="true"
      :showTopBox="true"
      @success="successFun"
    />
  </div>
</template>

<script>
import uploadAvatar from "./upload-avatar";

export default {
  name: "uploadAvatarIndex",
  components: {
    uploadAvatar
  },
  data() {
    return {
      progressNum: 0
    };
  },
  methods: {
    uploadImg() {
      this.$refs.uploadAvatar.chooseFile();
    },
    successFun(data) {
      console.info("successFun", data);
    }
  }
};
</script>

<style lang="less" scoped>
.demo-box {
  margin: 20px;
}
.in-btn {
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

  width: 100px;
  height: 50px;
  background: white;
  border-radius: 8px;

  user-select: none;
}
</style>
