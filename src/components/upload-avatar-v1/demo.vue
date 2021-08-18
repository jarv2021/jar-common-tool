<template>
  <div class="demo-box">
    <div class="upload-btn in-btn" @click="uploadImg">upload</div>
    <div class="content-box">
      <div class="article-box">
        <MARKDOM :md="README" />
      </div>
      <div class="show-box">
        <img :src="successImgUrl" alt="" />
      </div>
    </div>

    <uploadAvatar
      ref="uploadAvatar"
      class="uploadAvatar"
      :uploadConfig="uploadConfig"
      :wheelConfig="wheelConfig"
      :containerConfig="containerConfig"
      :cropperConfig="cropperConfig"
      @cropSuccess="cropSuccess"
      @cropFail="cropFail"
      @cropUploadSuccess="cropUploadSuccess"
      @cropUploadFail="cropUploadFail"
      @zoomRatio="zoomRatio"
    >
      <div slot="footBox" class="save-btn" @click="saveFun">
        save
      </div>
    </uploadAvatar>
  </div>
</template>

<script>
import uploadAvatar from "./upload-avatar";

import README from "./README.md";

export default {
  name: "uploadAvatarIndex",
  components: {
    uploadAvatar
  },
  data() {
    return {
      progressNum: 0,
      successImgUrl: "",
      README,
      wheelConfig: {
        customize: true,
        minZoom: 1,
        maxZoom: 10,
        step: 0.1
      },
      uploadConfig: {
        // https://test1.lovense.com/cam-model-web/common/uploadImage?ctoken=PpaH3lgPt-zl0NEMmKxEy6eW-yQYHRFJHdIYscF2S9GZBHchUFTAW2Jq6rk-9-vqpz3NCmxtF3jwvAg1_Md3BRdUrEIq25Ws-xdiEP0d8L1p21bD9g9J39MI7UP2vuCvRbl-4i4zx1o27T8lkyRBNg
        url: "",
        method: "post",
        resultToBlob: false
      },
      containerConfig: {
        width: 800,
        height: 800
      },
      cropperConfig: {
        // viewMode—定义cropper的视图模式
        viewMode: 1,
        // dragMode —-定义cropper的拖拽模式。
        dragMode: "move",
        // 是否显示雪花背景
        background: true,
        // zoomOnWheel–是否可以通过移动鼠标来放大图像。
        zoomOnWheel: false,
        // cropBoxMovable—是否通过拖拽来移动剪裁框。
        cropBoxMovable: false,
        // cropBoxResizable—是否通过拖动来调整剪裁框的大小。
        cropBoxResizable: false,
        // 辅助中心点
        center: false,
        // 辅助线
        guides: false,
        // 设置鼠标滚轮缩放的灵敏度 默认 0.1
        wheelZoomRatio: 0.1,
        // 裁剪框最小宽度
        minCropBoxWidth: 440,
        // 裁剪框最小高度
        minCropBoxHeight: 440
      }
    };
  },
  mounted() {},
  methods: {
    uploadImg() {
      this.$refs.uploadAvatar.chooseFile();
    },
    cropSuccess(data) {
      // console.info("cropSuccess", data);
      this.successImgUrl = data;
    },
    cropFail(data) {
      // console.info("cropFail", data);
    },
    cropUploadSuccess(data) {
      // console.info("cropUploadSuccess", data);
      this.successImgUrl = data;
    },
    cropUploadFail(data) {
      // console.info("cropUploadFail", data);
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
    },
    saveFun() {
      this.$refs.uploadAvatar.getCropResult();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.demo-box {
  margin: 20px;

  .content-box {
    margin-top: 15px;

    display: flex;
    align-items: center;

    .article-box {
      max-width: 800px;
      max-height: 700px;
      overflow-y: auto;
    }

    .show-box {
      margin-left: 15px;
    }
  }
}

.in-btn {
  @include primaryBtn();
}

.uploadAvatar {
  .save-btn {
    @include primaryBtn();
  }
}
</style>
