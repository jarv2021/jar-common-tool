## 头像上传组件

！前提模块安装： Cropper，axios
cropperjs 文档：https://github.com/fengyuanchen/cropperjs
axios 文档：http://www.axios-js.com/

```
   使用方式：
    <uploadAvatar ref="uploadAvatar"/>

   触发上传文件：
   this.$refs.uploadAvatar.chooseFile();
```

## 使用

#### Props

| 名称            | 类型    | 默认 | 说明                       |
| :-------------- | :------ | :--- | :------------------------- |
| showTopBox      | Boolean | true | 显示截图的头部 option 栏   |
| showProgressBar | Boolean | true | 显示截图的底部 大小比率栏  |
| resultQuality   | Object  | {}   | 得到截图的大小和质量的设置 |
| uploadConfig    | Object  | {}   | 上传文件的设置             |
| cropperConfig   | Object  | {}   | cropper 插件的设置         |
| wheelConfig     | Object  | {}   | 滚动缩放限制的设置         |
| containerConfig | Object  | {}   | 截图组件容器的设置         |

##### uploadConfig

```
默认值
// 上传接口地址，如果为空，图片不会上传
url: '',
// 默认为post，如果要定制化，建议不要设置url，使用cropSuccess事件接收截图数据
method: 'post',
// 设置截图数据的类型是否为blob
resultToBlob：true,
// 设置上传头部
header:{}
```

##### resultQuality

```
默认值
width: 400,
height: 400,
minWidth: 256,
minHeight: 256,
maxWidth: 4096,
maxHeight: 4096,
fillColor: "#fff",
imageSmoothingEnabled: true,
imageSmoothingQuality: "high"
```

##### cropperConfig:

```
默认值
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
```

##### wheelConfig

```
默认值
// 是否使用自定义缩放值，如果是false则该组件自行设置
customize：false
// 缩放最小值
minZoom: 0,
// 缩放最大值
maxZoom: 1,
// 缩放敏感度
step: 0.1
```

##### containerConfig

```
默认值
// 截图容器宽
width: 500,
// 截图容器高
height: 500
```

#### Events

| 名称              | 说明                                                   |
| :---------------- | :----------------------------------------------------- |
| cropSuccess       | 图片截取完成事件（上传前), 参数( imageDataUrl, field ) |
| cropFail          | 图片截取失败事件                                       |
| cropUploadSuccess | 上传成功， 参数( jsonData, field )                     |
| cropUploadFail    | 上传失败， 参数( status, field )                       |
| zoomRatio         | 接收截图缩放的大小比率值                               |
