## 双项轮播组件

### 使用

```
   使用方式：
   <carousel :swiperConfig="swiperConfig" :displayConfig="displayConfig" />
```

#### props

| 名称          | 说明               |
| :------------ | :----------------- |
| swiperConfig  | 轮播总设置         |
| displayConfig | 轮播首项和次项设置 |

##### swiperConfig

```
默认值
// type为number  是否显示next按钮，true则显示
showNext: true,
// type为Array  轮播的图片数组
swiperList:[]

tip：
swiperList的图片来源属性需设置为picture。
例如
swiperList = [
      {
        picture: require("@/assets/c-1.jpg")
      },
      {
        picture: require("@/assets/c-2.jpg")
      },
      {
        picture: require("@/assets/c-3.jpg")
      },
      {
        picture: require("@/assets/c-4.jpg")
      },
      {
        picture: require("@/assets/c-5.jpg")
      }
];
```


##### displayConfig

```
默认值
// type为number  轮播显示图片的宽
width: 614,
// type为number  轮播显示图片的高
height:345,
// type为number  待展示项的左偏移量
subOffsetLeft: 115,
// type为number  待展示项的顶部偏移量
subOffsetTop: 0
```
