# jar-common-tool

### 地址：https://github.com/JACK-Liang-2020/jar-common-tool

### 项目运行

```
npm i
npm run serve
```

## 1. 简易的车牌号选择器(vue 版本)

### 组件名称 : carInput

```
1.引入组件
2.组件包含一个触发的元素，如div,input
3.使用v-model获取值
```

### 案例： carDemo

```
<car-input v-model="carNum">
   <div>触发</div>
</car-input>
```

## 2. 轻量 pdf 阅读组件 （vue 版）

### 组件名称 : onlinePdf

## 3. 头像上传组件

```
   使用方式：

    <uploadAvatar
      ref="uploadAvatar"
      :resultToBlob="true"
      :showProgressBar="true"
      :showTopBox="true"
      @success="successFun"
    />

   触发上传文件：

   this.$refs.uploadAvatar.chooseFile();

```

```
  参数：
        resultToBlob =》 设置输出的是img文件还是blob文件
        showProgressBar =》 设置是否显示
  事件：



```
