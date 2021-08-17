<template>
  <div class="pdf-container" @scroll="handlerScroll" />
</template>

<script>
const pdfjsLib = require("pdfjs-dist");
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default {
  name: "pdf-container",
  props: {
    pdfConfig: {
      type: Object,
      default: () => {
        return {
          src: "./extre/suffer.pdf",
          pageTurn: false,
          pageScroll: false,
          currnetPage: 1
        };
      }
    }
  },
  data() {
    return {
      pageNum: 1,
      currentPdfObj: null,
      pdfContainder: "#pdfCanvas",
      idTemplate: "cw-pdf-"
    };
  },
  watch: {
    pdfConfig: {
      handler(newVal, oldVal) {
        let target = document.querySelector(".pdf-container canvas");
        if (newVal.pageTurn !== oldVal.pageTurn) {
          this.init();
        } else if (target) {
          this.renderPDF(
            this.currentPdfObj,
            newVal.currnetPage,
            this.pdfContainder
          );
        } else {
          this.init();
        }
      },
      deep: true
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      this.deleteCanvas();
      this.loadPDF(this.pdfConfig.src);
    },
    // 读取pdf文件，并加载到页面中
    loadPDF(fileURL) {
      let url = fileURL;

      // 新建pdf加载对象
      const loadingTask = pdfjsLib.getDocument({
        url,
        // rangeChunkSize 参数，就是设置分块大小，默认是64k,可以修改这个数字 65536 * 16
        rangeChunkSize: 65536 * 16
      });

      // 进度
      loadingTask.onProgress = status => {
        const ratio = status.loaded / status.total;
        this.$emit("progress", ratio);
      };

      // 加载 用 promise 获取页面
      loadingTask.promise.then(pdf => {
        this.currentPdfObj = pdf;
        this.setTotalPage(pdf);

        if (this.pdfConfig.pageTurn) {
          this.createPdfContainer();
          this.renderPDF(
            this.currentPdfObj,
            this.pdfConfig.currnetPage,
            this.pdfContainder
          );
        }

        if (this.pdfConfig.pageScroll) {
          this.renderAllPage();
        }
      });
    },
    // 创建canvas
    createPdfContainer(id, className) {
      if (this.pdfConfig.pageScroll) {
        const canvasNew = document.createElement("canvas");
        canvasNew.id = id;
        canvasNew.className = className;
        return canvasNew;
      }
      if (this.pdfConfig.pageTurn) {
        let container = document.querySelector(".pdf-container");
        if (container) {
          const canvasNew = document.createElement("canvas");
          canvasNew.id = "pdfCanvas";
          container.appendChild(canvasNew);
        }
      }
    },
    //创建和pdf页数等同的canvas数
    createSeriesCanvas(num, template) {
      var id = "";
      var fragment = document.createDocumentFragment();
      for (var j = 1; j <= num; j++) {
        id = template + j;
        fragment.appendChild(this.createPdfContainer(id, `pdfClass-${id}`));
      }
      const pdfContainer = document.querySelector(".pdf-container");
      pdfContainer.appendChild(fragment);
    },
    // 删除canvas
    deleteCanvas() {
      let container = document.querySelector(".pdf-container");
      if (container) {
        let boxs = container.querySelectorAll("canvas");
        for (let box of boxs) {
          box && box.remove();
        }
      }

      this.currentPdfObj = null;
    },
    // 渲染pdf  //建议给定pdf宽度
    renderPDF(pdf, i, container) {
      pdf.getPage(i).then(page => {
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        // 准备用于渲染的 canvas 元素
        const canvas = this.pdfConfig.pageTurn
          ? document.querySelector(container)
          : document.getElementById(container);
        if (canvas) {
          const context = canvas.getContext("2d");
          canvas.width = viewport.width || 698;
          canvas.height = viewport.height || 392;

          // 将 PDF 页面渲染到 canvas 上下文中
          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };

          page.render(renderContext);
        }
      });
    },
    // 处理容器滚动事件
    handlerScroll() {
      this.$emit("scroll", this.getCurrnetPage());
    },
    // 获取单个canvas高度
    getCanvasHeight() {
      let nomalHeight = null;
      const pdfPage = document.querySelector(".pdf-container");
      if (pdfPage) {
        const canvasEl = pdfPage.querySelector("canvas");
        if (canvasEl) {
          nomalHeight = canvasEl.clientHeight;
        }
      }
      return nomalHeight || 1576;
    },
    // 获取当前页数
    getCurrnetPage() {
      const pdfMain = document.querySelector(".pdf-container");
      const scrollTop = pdfMain.scrollTop;
      const clientHeight = pdfMain.clientHeight;
      // const scrollHeight = pdfMain.scrollHeight;

      // 确定当前页数
      const nomalHeight = this.getCanvasHeight();

      let result = 1;
      result = Math.ceil((scrollTop + clientHeight) / nomalHeight);

      if (result > this.pageNum) result = this.pageNum;

      return result;
    },
    // 设置总页数
    setTotalPage(pdf) {
      // 总页数
      const pageNum = pdf.numPages;
      this.pageNum = pageNum;
      this.$emit("totalPage", pageNum);
    },
    // 渲染所有pdf内容
    renderAllPage() {
      // 设置前置标识
      const idTemplate = this.idTemplate;

      //根据页码创建画布
      this.createSeriesCanvas(this.pageNum, idTemplate);
      //将pdf渲染到画布上去
      for (var i = 1; i <= this.pageNum; i++) {
        let id = idTemplate + i;
        this.renderPDF(this.currentPdfObj, i, id);
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.pdf-container {
  width: 100%;
  height: 100%;
}
</style>
