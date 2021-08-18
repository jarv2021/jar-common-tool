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
        <slot name="topBox" />
        <div :style="cropperBoxStyle" class="crop-container">
          <img :src="imgUrl" class="crop-img" />
        </div>
        <progressBar
          v-if="showProgressBar"
          :progressNum="progressNum"
          @progressResult="progressResultFun"
        />
        <slot name="footBox" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

import progressBar from "./progress-bar";
import topBox from "./top-box";

export default {
  props: {
    // 显示缩放百分比
    showProgressBar: {
      type: Boolean,
      default: false
    },
    // 显示头部按钮
    showTopBox: {
      type: Boolean,
      default: false
    },
    // 输出裁剪图片的质量设置
    resultQuality: {
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
    // 上传图片配置
    uploadConfig: {
      type: [Object],
      default: () => {
        return {
          url: "",
          method: "post",
          resultToBlob: true,
          header: {}
        };
      }
    },
    // cropperjs的配置
    cropperConfig: {
      type: [Object],
      default: () => {
        return {
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
        };
      }
    },
    // 滚轮缩放的配置
    wheelConfig: {
      type: [Object],
      default: () => {
        return {
          customize: false,
          minZoom: 0,
          maxZoom: 1,
          step: 0.1
        };
      }
    },
    // 截图容器大小的配置
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
    this.closeDialog();
  },
  mounted() {
    this.copyWheelConfig = JSON.parse(JSON.stringify(this.wheelConfig));
  },
  methods: {
    // 截图组件初始化
    cropingStart(el) {
      let that = this;
      let target = document.querySelector(el);
      this.myCropper = new Cropper(target, {
        ...that.cropperConfig,
        ready: event => {
          let copyWheelConfig = that.copyWheelConfig;
          let cropperConfig = that.cropperConfig;
          let zoom = copyWheelConfig.minZoom;
          let containerConfig = that.containerConfig;

          if (copyWheelConfig.customize === false) {
            let naturalHeight = event.target.naturalHeight;
            let naturalWidth = event.target.naturalWidth;

            let targetVal =
              naturalHeight > naturalWidth ? naturalWidth : naturalHeight;
            copyWheelConfig.minZoom = cropperConfig.minCropBoxWidth / targetVal;
            copyWheelConfig.maxZoom = copyWheelConfig.minZoom + 2;
            zoom = copyWheelConfig.minZoom;
          }

          let cropBoxLeft =
            containerConfig.width / 2 - cropperConfig.minCropBoxWidth / 2;
          let cropBoxTop =
            containerConfig.height / 2 - cropperConfig.minCropBoxHeight / 2;

          that.setZoom(zoom);

          that.myCropper.setCropBoxData({
            left: cropBoxLeft,
            top: cropBoxTop,
            width: cropperConfig.minCropBoxWidth,
            height: cropperConfig.minCropBoxHeight
          });

          that.$forceUpdate();
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
    handleCrop() {
      // console.info("handleCrop", data);
    },
    handleCropend() {
      // console.info("handleCropend", data);
    },
    handleMove() {
      // console.info("handleMove", data);
    },
    chooseFile() {
      const active = document.getElementById("uploadsId");
      const mouseEvent = document.createEvent("MouseEvents"); // FF的处理
      mouseEvent.initEvent("click", true, true);
      active.dispatchEvent(mouseEvent);
    },
    // 设置缩放比率
    handleZoom(data) {
      let ratio = data.detail.ratio;
      this.ratio = ratio;
      this.setProgressNum();
      this.$emit("zoomRatio", ratio);
    },
    // 触发上传
    uploadImg(e) {
      const file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        // 图片类型必须是.gif,jpeg,jpg,png中的一种
        this.$emit("cropFail", {
          message: "图片类型必须是.gif,jpeg,jpg,png中的一种"
        });
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
          this.cropingStart(".crop-img");
          this.setWheel(".crop-container", "add");
        });
      };
      reader.onerror = e => {
        this.$emit("cropFail", e);
      };
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    // 关闭上传弹窗
    closeDialog() {
      // console.info("closeDialog");
      this.imgUrl = null;
      this.fileValue = null;
      this.showDialog = false;

      this.setWheel(".crop-container", "remove");
      this.myCropper && this.myCropper.destroy();
      this.myCropper = null;
    },
    // 截图组件重置
    reset() {
      this.myCropper.reset();
    },
    // 设置鼠标滚轮事件监听
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
    // 处理滚轮事件，处理数据
    handleWheel(event) {
      // 防止滚动穿透
      event.preventDefault();
      if (this.cropperConfig.zoomOnWheel === false) {
        // console.info("handleWheel", event);
        let wheelDelta = event.wheelDelta;
        let step = this.copyWheelConfig.step;
        let result = wheelDelta > 0 ? this.ratio + step : this.ratio - step;
        if (result > this.copyWheelConfig.maxZoom)
          result = this.copyWheelConfig.maxZoom;
        if (result < this.copyWheelConfig.minZoom)
          result = this.copyWheelConfig.minZoom;
        this.setZoom(result);
      }
    },
    // 生成截图
    getCropResult() {
      let that = this;
      var promise = new Promise((resolve, reject) => {
        if (that.uploadConfig.resultToBlob) {
          that.myCropper
            .getCroppedCanvas({ ...that.resultQuality })
            .toBlob(blob => {
              let uploadConfig = that.uploadConfig;
              let method = uploadConfig.method.trim().toLocaleLowerCase();
              let header = uploadConfig.header;
              let url = uploadConfig.url;

              that.$emit("cropSuccess", blob);
              if (uploadConfig.url && method === "post") {
                const param = new FormData();
                param.append("file", blob);
                that
                  .createRequest(header)
                  .post(url, param, {
                    headers: { "Content-Type": "multipart/form-data" }
                  })
                  .then(res => {
                    that.$emit("cropUploadSuccess", res);
                    resolve(res);
                  })
                  .catch(err => {
                    that.$emit("cropUploadFail", err);
                    reject(err);
                  });
              } else {
                resolve(blob);
              }
              that.closeDialog();
            });
        } else {
          // .toDataURL("image/jpeg");
          let url = that.myCropper
            .getCroppedCanvas({ ...that.resultQuality })
            .toDataURL();
          // console.info("getCropResult", url);
          that.$emit("cropSuccess", url);
          that.closeDialog();
          resolve(url);
        }
      });
      return promise;
    },
    // 设置截图组件的缩放
    setZoom(val) {
      this.myCropper.zoomTo(val, [0, 0]);
    },
    // 处理百分比组件的拖动
    progressResultFun(data) {
      this.setZoom(this.getRate(data));
    },
    // 生成截图
    saveFun() {
      this.getCropResult();
    },
    // 关闭弹窗
    closeFun() {
      this.closeDialog();
    },
    // 统一创建http请求
    createRequest(header) {
      const instance = axios.create({
        header,
        timeout: 10000
      });
      return instance;
    },
    // 设置缩放百分比
    setProgressNum() {
      let wheelConfig = this.copyWheelConfig;
      let denominator =
        Number(wheelConfig.maxZoom) - Number(wheelConfig.minZoom);
      let rate = Math.abs(this.ratio - wheelConfig.minZoom) / denominator;
      this.progressNum = rate;
    },
    // 获取根据百分比组件传递值，换算的比率
    getRate(data) {
      let rate = 0;
      let wheelConfig = this.copyWheelConfig;
      let minVal = wheelConfig.minZoom;
      rate =
        minVal +
        data *
          Math.abs(Number(wheelConfig.maxZoom) - Number(wheelConfig.minZoom));
      return rate;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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

      .crop-container {
        /deep/.cropper-view-box {
          outline-color: #ff2d89;
        }
        ::v-deep.cropper-view-box {
          outline-color: #ff2d89;
        }
      }
    }
  }
}
</style>
