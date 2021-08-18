## pdf 阅读组件

```
   ！前提模块安装： pdfjs-dist
   pdfjs-dist 文档：https://github.com/mozilla/pdfjs-dist

   使用方式：
   <pdfComponent
              ref="pdfComponent"
              class="in-pdf"
              :pdfConfig="pdfConfig"
              @totalPage="getTotalPage"
            />
```

## 使用

#### pdfConfig

| 名称        | 类型    | 默认  | 说明                                      |
| :---------- | :------ | :---- | :---------------------------------------- |
| src         | String  | ''    | pdf 的路径                                |
| pageTurn    | Boolean | true  | pdf 用翻页阅读模式                        |
| pageScroll  | Boolean | false | pdf 用滚动阅读模式                        |
| currnetPage | Number  | 1     | 当翻页阅读模式,可以改变数值，用于切换页数 |

#### 事件

| 名称      | 类型 | 默认 | 说明                               |
| :-------- | :--- | :--- | :--------------------------------- |
| scroll    | Fun  | ''   | 在滚动阅读模式可以获取当前是第几页 |
| totalPage | Fun  | ''   | 获取总页数                         |

### tip

要注意
// 使用 transpileDependencies 属性配置 node_modules 中指定哪些文件夹或文件需要编译.
