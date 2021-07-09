<template>
  <div class="upload-avatar-box">
    <div class="upload-box">
      <input
        id="uploadsId"
        :value="fileValue"
        type="file"
        style="position:absolute; clip:rect(0 0 0 0);"
        accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="uploadImg($event, 1)"
      />
    </div>
    <div class="upload-dialog" v-if="showDialog">
      <div class="dialog-mask" @click="closeDialog"></div>
      <div class="cropper-show-box">
        <topBox @save="saveFun" @close="closeFun" v-if="showTopBox" />
        <div :style="cropperBoxStyle" class="crop-container">
          <img :src="imgUrl" class="crop-img" />
        </div>
        <progressBar
          v-if="showProgressBar"
          :progressNum="progressNum"
          @progressResult="progressResultFun"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

import progressBar from "./progress-bar";
import topBox from "./top-box";

export default {
  props: {
    resultToBlob: [Boolean],
    showProgressBar: {
      type: Boolean,
      default: false
    },
    showTopBox: {
      type: Boolean,
      default: false
    },
    resultImgQuality: {
      type: [Object],
      default: () => {
        return {
          width: 400,
          height: 400,
          minWidth: 256,
          minHeight: 256,
          maxWidth: 4096,
          maxHeight: 4096,
          fillColor: "#fff",
          imageSmoothingEnabled: true,
          imageSmoothingQuality: "high"
        };
      }
    },
    cropperConfig: {
      type: [Object],
      default: () => {
        return {
          // viewMode—定义cropper的视图模式
          viewMode: 0,
          // dragMode —-定义cropper的拖拽模式。
          dragMode: "move",
          // 是否显示雪花背景
          background: true,
          initialAspectRatio: 1,
          // aspectRatio—-裁剪框的宽高比
          aspectRatio: 1,
          // 设置裁剪框为固定的宽高比
          autoCropArea: 1,
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
          minCropBoxWidth: 400,
          // 裁剪框最小高度
          minCropBoxHeight: 400
        };
      }
    },
    wheelConfig: {
      type: [Object],
      default: () => {
        return {
          minZoom: 0,
          maxZoom: 1,
          step: 0.1
        };
      }
    },
    containerConfig: {
      type: [Object],
      default: () => {
        return {
          width: 500,
          height: 500
        };
      }
    }
  },
  components: {
    progressBar,
    topBox
  },
  data() {
    return {
      myCropper: null,
      imgUrl: "",
      fileValue: "",
      showDialog: false,
      progressNum: 0
    };
  },
  computed: {
    cropperBoxStyle() {
      let cropperContainerWidth = this.containerConfig.width;
      let cropperContainerHeight = this.containerConfig.height;
      if (/px/.test(cropperContainerWidth))
        cropperContainerWidth = cropperContainerWidth.split("px")[0];
      if (/px/.test(cropperContainerHeight))
        cropperContainerHeight = cropperContainerHeight.split("px")[0];
      return `width:${cropperContainerWidth}px;height:${cropperContainerHeight}px;overflow: hidden;`;
    }
  },
  destroyed() {
    this.setWheel(".crop-container", "remove");
  },
  mounted() {},
  methods: {
    cropStart(el) {
      let that = this;
      let target = document.querySelector(el);
      this.myCropper = new Cropper(target, {
        ...that.cropperConfig,
        ready: event => {
          // console.info("ready", event);
          this.myCropper.zoomTo(0.4, [0, 0]);
        },
        crop: event => {
          that.handleCrop(event);
        },
        move: event => {
          that.handleMove(event);
        },
        zoom: event => {
          that.handleZoom(event);
        },
        cropend: event => {
          that.handleCropend(event);
        }
      });
    },
    handleCrop(data) {
      // console.info("handleCrop", data);
    },
    handleCropend(data) {
      // console.info("handleCropend", data);
    },
    handleMove(data) {
      // console.info("handleMove", data);
    },
    handleZoom(data) {
      let ratio = data.detail.ratio;
      this.progressNum = ratio;
      this.$emit("zoomRatio", ratio);
      // console.info("handleZoom", ratio);
    },
    chooseFile() {
      const active = document.getElementById("uploadsId");
      const mouseEvent = document.createEvent("MouseEvents"); // FF的处理
      mouseEvent.initEvent("click", true, true);
      active.dispatchEvent(mouseEvent);
    },
    uploadImg(e) {
      const file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        this.$eltool.warnMsg("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      const reader = new FileReader();
      reader.onload = e => {
        let data = "";
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }

        this.imgUrl = data;
        this.showDialog = true;
        this.$nextTick(() => {
          this.cropStart(".crop-img");
          this.setWheel(".crop-container", "add");
        });
      };
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    closeDialog() {
      this.imgUrl = null;
      this.fileValue = null;
      this.showDialog = false;
    },
    reset() {
      this.myCropper.reset();
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
    setWheel(el, method) {
      let target = document.querySelector(el);
      if (!target) return;
      if (method === "add") {
        if (target && target.addEventListener) {
          //FF,火狐浏览器会识别该方法
          target.addEventListener("DOMMouseScroll", this.handleWheel, false);
        }
        target.onmousewheel = target.onmousewheel = this.handleWheel; //W3C
      } else {
        if (target && target.removeEventListener) {
          //FF,火狐浏览器会识别该方法
          target.removeEventListener("DOMMouseScroll", this.handleWheel, false);
        }
        target.onmousewheel = target.onmousewheel = null; //W3C
      }
    },
    handleWheel(event) {
      // 防止滚动穿透
      event.preventDefault();
      // console.info("handleWheel", event);
      let wheelDelta = event.wheelDelta;
      let step = this.wheelConfig.step;
      let result =
        wheelDelta > 0 ? this.progressNum + step : this.progressNum - step;
      if (result > this.wheelConfig.maxZoom) result = this.wheelConfig.maxZoom;
      if (result < this.wheelConfig.minZoom) result = this.wheelConfig.minZoom;
      this.setZoom(result);
    },
    getCropResult(isEmit = true) {
      var promise = new Promise((resolve, reject) => {
        if (this.resultToBlob) {
          this.myCropper
            .getCroppedCanvas({ ...this.resultImgQuality })
            .toBlob(blob => {
              // console.info("toBlob", blob);
              isEmit && this.$emit("success", blob);
              this.closeDialog();
              resolve(blob);
            });
        } else {
          // .toDataURL("image/jpeg");
          let url = this.myCropper
            .getCroppedCanvas({ ...this.resultImgQuality })
            .toDataURL();
          // console.info("getCropResult", url);
          isEmit && this.$emit("success", url);
          this.closeDialog();
          resolve(url);
        }
      });
      return promise;
    },
    setZoom(val) {
      this.myCropper.zoomTo(val, [0, 0]);
    },
    progressResultFun(data) {
      // console.info("progressResultFun", data);
      this.progressNum = data;
      this.setZoom(data);
    },
    saveFun() {
      this.getCropResult();
    },
    closeFun() {
      this.closeDialog();
    }
  }
};
</script>

<style lang="less" scoped>
.upload-avatar-box {
  .upload-box {
    margin: 20px;
  }
  .upload-dialog {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    .dialog-mask {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
    }

    .cropper-show-box {
      position: absolute;
      top: 50%;
      left: 50%;

      transform: translateY(-50%) translateX(-50%);
      overflow: hidden;
      // width: 500px;
      // height: 500px;
      // width: 100%;
      // height: 100%;

      user-select: none;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .option-box {
        // margin-top: 15px;
      }
    }
  }
}
</style>
