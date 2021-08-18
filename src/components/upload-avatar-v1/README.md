## 头像上传组件 （此组件为纯截图版）

## 组件需求和思路分析

```
需求：
1.需允许上传 gif|jpg|jpeg|png|bmp|GIF|JPG|PNG 等比较通用的图片格式
2.鼠标滚轮可以缩放，并且获取缩放的百分比
3.截图框不能拖动，上传的图片可以拖动，但是图片的拖动不能离开截图框

扩展：
1.是否做上传图片大小限制
2.是否截图框和上传图片都能拖动
3.上传图片是否按比例变大或缩小，填满截图框

思路：
1.参考vue-Cropper，使用了cropperjs，并且裁剪了许多功能，使功能集中于缩放和裁剪两项
2.cropperjs 并没有提供方法返回缩放的精确数值，所以组件改用了 监听 DOMMouseScroll 事件，根据一定的比率换算，设置缩放大小
3.细化截图的结果输出，分别返回 cropSuccess， cropFail， cropUploadSuccess ，cropUploadFail事件

```

## 使用

```
   ！前提模块安装： cropperjs，axios
   cropperjs 文档：https://github.com/fengyuanchen/cropperjs
   axios 文档：http://www.axios-js.com/

   使用方式：
    <uploadAvatar ref="uploadAvatar"/>

   触发上传文件：
   this.$refs.uploadAvatar.chooseFile();

   保存截图：
   this.$refs.uploadAvatar.getCropResult();
```

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

#### slot

| 名称    | 说明                    |
| :------ | :---------------------- |
| footBox | 自定义截图容器的 footer |
| topBox  | 自定义截图容器的 header |
