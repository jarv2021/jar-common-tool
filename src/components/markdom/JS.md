# JS 中 find(), findIndex(), filter(), forEach(), some(), every(), map()方法

https://www.cnblogs.com/wfc139/p/10383509.html

1. find()与 findIndex()

find()方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，
直到找出第一个返回值为 true 的成员，然后返回该成员。如果没有符合条件的成员，则返回 undefined。

findIndex()方法的用法与 find()方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。

2. filter()

filter()方法使用指定的函数测试所有元素，并创建一个包含所有通过测试的元素的新数组。

3. forEach()

遍历数组全部元素，利用回调函数对数组进行操作，自动遍历整个数组，且无法 break 中途跳出循环，不可控，不支持 return 操作输出，return 只用于控制循环是否跳出当前循环。

4. some() 和 every()

every()与 some()方法都是 JS 中数组的迭代方法， 只返回布尔值。

every()

判断数组中是否每个元素都满足条件
只有都满足条件才返回 true；
只要有一个不满足就返回 false；

some()

判断数组中是否至少有一个元素满足条件
只要有一个满足就返回 true
只有都不满足时才返回 false

5. map()

map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。

---

# JS offset、client、scroll 家族

https://juejin.cn/post/6869735468771721223

## offset 家族

1. 定位父级
   定义：offsetParent 就是距离该元素最近的、进行过定位的元素；

根据定义还可分为以下几种情况：

a。元素自身有 fixed 固定定位的，父级元素无定位或者有定位的，offsetParent 是 null；

b。元素自身无 fixed 固定定位，父级也没有设置定位，offsetParent 是 body

c。元素自身无 fixed 定位，上级元素中存在定位，offsetParent 是最近的、有定位的元素;

d。<body>...</body> 的 offsetParent 属性值是 null。

2. 偏移量

   offsetTop
   定义：获取该元素相对于页面最近的、设置有定位的父级元素(offsetParent)的顶部坐标位置值：

   offsetLeft
   定义：获取该元素相对于页面最近的、设置有定位的父级元素(offsetParent)的左侧位置值：

3. 宽度和高度
   offsetWidth
   定义：offsetWidht 为该元素可见区域的宽度。
   元素的 offsetWidht = 盒子线宽 + 盒子宽度 + 盒子水平方向内边距

   offsetHeight
   定义：offsetHeight 为该元素可见区域的高度。
   offsetHeight = 盒子线宽 + 盒子高度 + 盒子垂直方向的内边距

## scroll 滚动页面

页面的宽度和高度
scrollHeight 和 scrollWidth
定义：表示网页元素的全部高度和全部宽度，包含由于滚动溢出而无法在网页上不可见的内容。

内容未溢出
当没有滚动条的时候，获取的值和 clientHeight 一样，只包含内边距和宽高

内容溢出
当内容溢出的时候，不管盒子是否设置 overflow: hidden 隐藏或 overflow: scroll 都会按照全部高度计算。

页面被卷起
scrollTop 和 scrollWidth
定义：页面被卷起的高度和宽度，scrollTop 和 scrollWidth 的值是可写的。
未滚动时 s
当元素没有被滚动的时候，scrollTop 的值为零。
滚动
当页面被滚动时，scrollTop 为滚动的数量值
页面被滚动到底部时，符合以下公式：
scrollHeight = clientHeight + scrollTop

---

# js 变动事件

https://www.cnblogs.com/lst619247/p/8873219.html

https://www.cnblogs.com/yhl-0822/articles/7818930.html

DOM2 级的变动（mutation）事件能在 DOM 中的某一部分发生变化时给出提示。变动事件是为 XML 或 HTML DOM 设计的，并不特定于某种语言。DOM2 级定义了如下变动事件：

（1）DOMSubtreeModified：在 DOM 结构中发生的任何变化时触发。这个事件在其他任何事件触发后都会触发。
DOMSubtreeModified
在 DOM 结构中发生任何变化时都会触发 DOMSubtreeModified 事件，该事件在其他任何事件触发后都会触发
该事件的目标是被移除节点的父节点
[注意]IE8-浏览器不支持

（2）DOMNodeInserted：在一个节点作为子节点被插入到另一个节点中时触发。
DOMNodeInserted
在使用 appendChild()、replaceChild()或 insertBefore()向 DOM 中插入节点时，首先触发 DOMNodeInserted 事件
这个事件的目标是被插入的节点，而 event.relatedNode 属性中包含一个对父节点的引用
在这个事件触发时，节点已经被插入到了新的父节点中。这个事件是冒泡的，因此可以在 DOM 的各个层次上处理它
[注意]IE8-浏览器不支持

（3）DOMNodeRemoved：在节点从其父节点中被移除时触发。
DOMNodeRemoved
在使用 removeChild()或 replacechild()从 DOM 中删除节点时，会触发 DOMNodeRemoved 事件。
而 event.relatedNode 属性中包含着对目标节点父节点的引用。
在这个事件触发时，节点尚未从其父节点删除，因此其 parentNode 属性仍然指向父节点。该事件会冒泡
[注意]IE8-浏览器不支持

（4）DOMNodeInsertedIntoDocument：在一个节点被直接插入文档或通过子树间接插入到文档之后触发。这个事件在 DOMNodeInserted 之后触发。
在新插入的节点上面会触发 DOMNodeInsertedIntoDocument 事件。这个事件不冒泡，因此必须在插入节点之前为它添加这个事件处理程序。这个事件的目标是被插入的节点
[注意]该事件只有 chrome/safari/opera 浏览器支持

（5）DOMNodeRemovedFromDocument：在一个节点被直接从文档中移除或通过子树间接从文档中移除之前触发。这个事件在 DOMNodeRemoved 之后触发。
DOMNodeRemovedFromDocument
如果被移除的节点包含子节点，那么在其所有子节点以及这个被移除的节点上会相继触发 DOMNodeRemovedFromDocument 事件，这个事件不会冒泡，目标 target 指向被移除的节点
[注意]该事件只有 chrome/safari/opera 浏览器支持

（6）DOMAttrModified：在特性被修改之后触发。
DOMAttrmodified
当特性被修改后，DOMAttrmodified 事件被触发
[注意]该事件只有 firefox 和 IE8+浏览器支持

（7）DOMCharacterDataModified:在文本节点的值发生变化时触发。
DOMCharacterDataModified
当文本节点的值发生变化时，触发 DOMCharacterDataModified 事件
[注意]该方法只有 chrome/safari/opera 浏览器支持

---

# javascript - 立即执行函数

https://www.cnblogs.com/L-xmin/p/11178599.html

---

# JavaScript exec() 方法

https://www.w3school.com.cn/js/jsref_exec_regexp.asp

定义和用法
exec() 方法用于检索字符串中的正则表达式的匹配。

返回值
返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。

---

# js 事件触发器 dispatchEvent()

https://blog.csdn.net/weixin_33722405/article/details/85892944

https://www.cnblogs.com/boonya/p/11165150.html

---

# HTML5 API --- 页面可见性改变(visibilitychange)事件

https://blog.csdn.net/yl02520/article/details/17174107

visibilitychange 事件是浏览器新添加的一个事件，当浏览器的某个标签页切换到后台，或从后台切换到前台时就会触发该消息

---

# event.stopPropagation()和 event.preventDefault()

https://blog.csdn.net/qq_39207948/article/details/79408323

1.event.stopPropagation()方法

这是阻止事件的冒泡方法，不让事件向 documen 上蔓延，但是默认事件任然会执行，当你掉用这个方法的时候，如果点击一个连接，这个连接仍然会被打开，

2.event.preventDefault()方法

这是阻止默认事件的方法，调用此方法是，连接不会被打开，但是会发生冒泡，冒泡会传递到上一层的父元素；

3.return false ；

这个方法比较暴力，他会同事阻止事件冒泡也会阻止默认事件；写上此代码，连接不会被打开，事件也不会传递到上一层的父元素；
可以理解为 return false 就等于同时调用了 event.stopPropagation()和 event.preventDefault()

---

# js 如何识别出字符串中的回车 \n 并输出换行

https://blog.csdn.net/lianzhang861/article/details/80581042?utm_source=blogxgwz2

str = str.replace(/↵/g,"<br/>");
str=str.replace(/\n/g,"<br/>")

---

# 正则表达式匹配:包含且不包含

https://blog.csdn.net/thewindkee/article/details/52785763

例:包含 admin 且不包含 abc。

---

# localStorage 设置过期时间

https://www.cnblogs.com/ricolee/p/localstorage-expiretime.html

---

# console.log()、console.info()、console.debug()的区别

https://blog.csdn.net/xishaoguo/article/details/80688179

---

# JavaScript 获取当前时间戳 时间戳和日期格式的转换

https://blog.csdn.net/weixin_42333548/article/details/80539239

---

# sessionStorage 的数据会在同一网站的多个标签页之间共享吗？这取决于标签页如何打开

https://www.cnblogs.com/as007012/p/9860605.html

---

# Chrome 浏览器如何强制刷新页面(不使用缓存)？

https://blog.csdn.net/chengyu1769/article/details/100708405

---

# require 和 import 的区别

https://www.cnblogs.com/ranyonsue/p/10861276.html

遵循规范

–require 是 AMD 规范引入方式

–import 是 es6 的一个语法标准，如果要兼容浏览器的话必须转化成 es5 的语法

调用时间

–require 是运行时调用，所以 require 理论上可以运用在代码的任何地方

–import 是编译时调用，所以必须放在文件开头

本质

–require 是赋值过程，其实 require 的结果就是对象、数字、字符串、函数等，再把 require 的结果赋值给某个变量

–import 是解构过程，但是目前所有的引擎都还没有实现 import，我们在 node 中使用 babel 支持 ES6，也仅仅是将 ES6 转码为 ES5 再执行，import 语法会被转码为 require

---

# JS 判断浏览器是否禁用 COOKIE

http://www.song-z.com/article/detail/341/842

---

# 如何获取 input 自定义属性

https://www.cnblogs.com/peng14/p/3338600.html

---

# js 监听页面 copy 事件添加版权信息

https://www.cnblogs.com/fanwenhao/p/9685293.html

---

# 知识点--- SCROLLINTOVIEW()的用法

https://www.cnblogs.com/liaohongwei/p/10868295.html

---

# Js 判断值是否是 NaN

https://www.cnblogs.com/chenmeijiao/p/12060834.html

---

# 【ES6 学习笔记之】Object.assign()

https://www.jianshu.com/p/d5f572dd3776

---

# js 判断 ipv4 ipv6

https://blog.csdn.net/jiegeng2233/article/details/59483744

---

# js 中 for 跳出循环（包括多层循环）return 和 break 的区别

https://blog.csdn.net/weixin_38098192/article/details/84345494

https://www.cnblogs.com/jrystal/p/7067390.html

单层循环

1.for 循环中 return 语句：会直接跳出循环，

因为 js 中 for 是没有局部作用域的概念的，所以只有把 for 循环放在函数中时，才可以在 for 循环中使用 return 语句。

2.for 循环中的 break 语句：和 return 一样会直接跳出循环

与 return 不同的是，使用 break 时，for 循环可以不用一定放在函数中 ；

多层循环：

1.return：和单层循环一样必须放在函数中，否则将会报语法错误

2.break 语句：和单层循环一样，可以可以不用放在函数中

但是在多层循环中与 return 不同的是，break 不是跳出函数，而是跳出最里层的 for 循环，外面的循环和最外层 for 循环后面的语句也将继续执行

---

# js 截取数组 slice(),splice()两种方法

slice()

返回一个索引和另一个索引之间的数据(不改变原数组),slice(start,end)有两个参数(start 必需,end 选填),都是索引,返回值不包括 end

splice()

用来添加或者删除数组的数据,只返回被删除的数据,类型为数组(改变原数组)

https://blog.csdn.net/qq_43627981/article/details/99625825

---

# javascript 如何监听页面刷新和页面关闭事件

https://www.cnblogs.com/qqblog/p/6265008.html

---

# JavaScript 获取浏览器语言的方法

https://www.cnblogs.com/bescheiden/articles/9320597.html

---

# JS 向上取整、向下取整、四舍五入等

https://www.jianshu.com/p/a93bd02d9eb7

---

# js 判断字符串中是否包含某个字符串

https://www.cnblogs.com/ooo0/p/7741651.html

---

# js 中 push(),pop(),unshift(),shift()的用法小结

https://www.cnblogs.com/dyqblog/p/5434803.html

push()和 unshift()

向数组的 尾部/头部 添加若干元素，并返回 数组的 新长度；

pop()和 shift()

从数组的 尾部/头部 删除 1 个元素(删且只删除 1 个)，并返回 被删除的元素；空数组是继续删除，不报错，但返回 undefined；

---

# js 禁止页面滚动

https://www.cnblogs.com/wxcbg/p/10452985.html

---

# JS 获取浏览器信息及屏幕分辨率

https://www.cnblogs.com/Abner5/p/6016973.html

---

# Js 获取移动设备分辨率

https://www.cnblogs.com/YYvam1288/p/5409129.html

---

# 浅谈 JavaScript 异步加载的三种方式——async 和 defer、动态创建 script

https://blog.csdn.net/zhouziyu2011/article/details/60149590

---
