## 头像上传组件

```
   ！前提模块安装： Cropper，axios
   cropperjs 文档：https://github.com/fengyuanchen/cropperjs
   axios 文档：http://www.axios-js.com/

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
