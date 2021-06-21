<template>
  <div class="scroll-pdf-box"></div>
</template>

<script>
let pdfjsLib = require("pdfjs-dist");
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

export default {
  name: "scrollPdf",
  props: {
    pdfUrl: {
      type: [String],
      default: "./extre/test.pdf"
    },
    mode: {
      type: [String],
      default: "single"
    }
  },
  data() {
    return {
      pdfDoc: null, //pdfjs 生成的对象
      pageNum: 1, //
      pageRendering: false,
      pageNumPending: null,
      scale: 1, //放大倍数
      page_num: 0, //当前页数
      page_count: 0, //总页数
      maxscale: 2, //最大放大倍数
      minscale: 0.8, //最小放大倍数,
      renderPDFArr: []
    };
  },
  methods: {
    renderPage() {},
    //创建
    createPdfContainer(id, className) {
      var canvasNew = document.createElement("canvas");
      canvasNew.id = id;
      canvasNew.className = className;
      return canvasNew;
    },
    //渲染pdf
    //建议给定pdf宽度
    renderPDF(pdf, i, id) {
      pdf.getPage(i).then(page => {
        var scale = 1.5;
        var viewport = page.getViewport({ scale });

        //
        //  准备用于渲染的 canvas 元素
        //

        var canvas = document.getElementById(id);
        var context = canvas.getContext("2d");
        canvas.width = viewport.width || 698;
        canvas.height = viewport.height || 392;

        //
        // 将 PDF 页面渲染到 canvas 上下文中
        //
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.render(renderContext);

        // this.renderPDFArr.push({
        //   page,
        //   renderContext
        // });

        // if (this.renderPDFArr.length === this.pageNum) {
        //   let promiseArr = [];
        //   for (let i = 0; i < this.pageNum; i++) {
        //     let p = new Promise(resolve => {
        //       let page = this.renderPDFArr[i].page;
        //       let renderContext = this.renderPDFArr[i].renderContext;
        //       resolve(page.render(renderContext));
        //     });
        //     promiseArr.push(p);
        //   }

        //   Promise.all(promiseArr)
        //     .then(result => {
        //       console.log("success", result);
        //     })
        //     .catch(error => {
        //       console.log("error", error);
        //     });
        // }
      });
    },
    //创建和pdf页数等同的canvas数
    createSeriesCanvas(num, template) {
      var id = "";
      var fragment = document.createDocumentFragment();
      for (var j = 1; j <= num; j++) {
        id = template + j;
        fragment.appendChild(this.createPdfContainer(id, "pdfClass"));
      }
      var pdfContainer = document.querySelector(".scroll-pdf-box");
      pdfContainer.appendChild(fragment);
    },
    //读取pdf文件，并加载到页面中
    loadPDF(fileURL) {
      let url = fileURL;
      var loadingTask = pdfjsLib.getDocument({
        url,
        // 65536 * 16
        rangeChunkSize: 65536 * 16
      });
      loadingTask.promise.then(pdf => {
        // console.info("loadingTask", pdf);
        //用 promise 获取页面
        var id = "";
        var idTemplate = "cw-pdf-";
        var pageNum = pdf.numPages;
        this.pageNum = pdf.numPages;
        // console.info("pageNum", pageNum);
        this.$emit("num-pages", pdf.numPages);
        //根据页码创建画布
        this.createSeriesCanvas(pageNum, idTemplate);
        //将pdf渲染到画布上去
        for (var i = 1; i <= pageNum; i++) {
          id = idTemplate + i;
          this.renderPDF(pdf, i, id);
        }
      });
    }
  },
  computed: {},
  created() {
    this.loadPDF(this.pdfUrl);
  }
};
</script>

<style lang="less" scoped>
.scroll-pdf-box {
  // width: 500px;
  // height: 500px;

  display: flex;
  flex-direction: column;
}
</style>
