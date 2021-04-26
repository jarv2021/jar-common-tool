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

# dom 元素上添加断点（使用 dom breakpoint 找到修改属性的 javascript 代码）

https://www.cnblogs.com/fangsmile/p/11943414.html

---

# localStorage 设置过期时间

https://www.cnblogs.com/ricolee/p/localstorage-expiretime.html

---

# console.log()、console.info()、console.debug()的区别

https://blog.csdn.net/xishaoguo/article/details/80688179

---

# git 撤销 pull 命令

https://www.cnblogs.com/yangsg/p/11975867.html

---

# git commit 之后，想撤销 commit

https://www.cnblogs.com/lfxiao/p/9378763.html

---

# git 合并某次（或多次）提交到当前分支，还原正在的解决冲突的合并

https://blog.csdn.net/fyj13925475957/article/details/107985244

---

# vue-router 中 hash 模式和 history 模式。

https://www.cnblogs.com/yangsg/p/10621590.html

history 模式的问题
通过 history api，我们丢掉了丑陋的#，但是它也有个问题：不怕前进，不怕后退，就怕刷新，f5，（如果后端没有准备的话）,因为刷新是实实在在地去请求服务器的。
在 hash 模式下，前端路由修改的是#中的信息，而浏览器请求时不会将 # 后面的数据发送到后台，所以没有问题。
但是在 history 下，你可以自由的修改 path，当刷新时，如果服务器中没有相应的响应或者资源，则会刷新出来 404 页面。

---

# 视频标签 video 的一些特殊属性详解

http://caibaojian.com/h5-video.html

---

# APP 唤起那点破事

https://libin1991.github.io/2020/03/21/APP%E5%94%A4%E8%B5%B7%E9%82%A3%E7%82%B9%E7%A0%B4%E4%BA%8B/

---

# 内容安全策略（CSP）详解

https://www.cnblogs.com/both-eyes/p/10841875.html

---

# 你不知道的 web 生命周期

https://juejin.cn/post/6844904133321818119

---

# 页面生命周期 API 及 H5 唤起 App 踩坑心得

https://juejin.cn/post/6844904151353131015

---
