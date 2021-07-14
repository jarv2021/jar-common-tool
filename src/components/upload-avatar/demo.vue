<template>
  <div class="demo-box">
    <div class="upload-btn in-btn" @click="uploadImg">upload</div>
    <uploadAvatar
      ref="uploadAvatar"
      :resultToBlob="true"
      :showProgressBar="true"
      :showTopBox="true"
      :uploadConfig="uploadConfig"
      :wheelConfig="wheelConfig"
      @cropSuccess="cropSuccess"
      @cropFail="cropFail"
      @cropUploadSuccess="cropUploadSuccess"
      @cropUploadFail="cropUploadFail"
      @zoomRatio="zoomRatio"
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
      progressNum: 0,
      wheelConfig: {
        customize: false,
        minZoom: 0.5,
        maxZoom: 2,
        step: 0.1
      },
      uploadConfig: {
        // https://test1.lovense.com/cam-model-web/common/uploadImage?ctoken=PpaH3lgPt-zl0NEMmKxEy6eW-yQYHRFJHdIYscF2S9GZBHchUFTAW2Jq6rk-9-vqpz3NCmxtF3jwvAg1_Md3BRdUrEIq25Ws-xdiEP0d8L1p21bD9g9J39MI7UP2vuCvRbl-4i4zx1o27T8lkyRBNg
        url: "",
        method: "post",
        resultToBlob: false
      }
    };
  },
  methods: {
    uploadImg() {
      this.$refs.uploadAvatar.chooseFile();
    },
    cropSuccess(data) {
      console.info("cropSuccess", data);
      this.setDownload(data, "cropSuccess");
    },
    cropFail(data) {
      console.info("cropFail", data);
    },
    cropUploadSuccess(data) {
      console.info("cropUploadSuccess", data);
    },
    cropUploadFail(data) {
      console.info("cropUploadFail", data);
    },
    zoomRatio(data) {
      // console.info("zoomRatio", data);
    },
    setDownload(url, name) {
      let link = document.createElement("a");
      //设置下载的文件名
      link.download = name;
      link.style.display = "none";
      //设置下载路径
      link.href = url;
      //触发点击
      document.body.appendChild(link);
      link.click();
      //移除节点
      document.body.removeChild(link);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
