# vue-router 中 hash 模式和 history 模式。

https://www.cnblogs.com/yangsg/p/10621590.html

history 模式的问题
通过 history api，我们丢掉了丑陋的#，但是它也有个问题：不怕前进，不怕后退，就怕刷新，f5，（如果后端没有准备的话）,因为刷新是实实在在地去请求服务器的。
在 hash 模式下，前端路由修改的是#中的信息，而浏览器请求时不会将 # 后面的数据发送到后台，所以没有问题。
但是在 history 下，你可以自由的修改 path，当刷新时，如果服务器中没有相应的响应或者资源，则会刷新出来 404 页面。

---

# vue 移动端调试工具（vconsole）

https://www.cnblogs.com/amang/p/9909545.html

---

# Vue 项目中，防止页面被缩放和放大

https://blog.csdn.net/weixin_43953710/article/details/103183059

---

# vue webpack 打包后静态资源文件名 hash 值去除

https://blog.csdn.net/qq_36497461/article/details/89852181

---

# vue 自定义指令 VNode 详解

https://blog.csdn.net/qq_27626333/article/details/77743719

---

# vue 项目埋点

https://my.oschina.net/u/560237/blog/3209145

---

# vue vscode 属性标签不换行

https://www.cnblogs.com/zhaoyun4122/p/10931549.html

---

# 理解 Vue.mixin，利用 Vue.mixin 正确的偷懒

https://www.cnblogs.com/dengyao-blogs/p/11589962.html

---

# vue 组件中 this 和\$el 指向

https://www.cnblogs.com/mengfangui/p/9722565.html

---

# 手动关闭 elementUI 的 messageBox

https://segmentfault.com/q/1010000011472458

---

# v-html 限制图片宽度

https://blog.csdn.net/qq_42190640/article/details/110854616

https://www.w3h5.com/post/529.html

---

# 使用 http-server 在本地开启 https 服务

https://www.jianshu.com/p/7895c57a321c?from=timeline&isappinstalled=0

---

# 前端 js 几种加密/解密方法

https://www.cnblogs.com/pinkpolk/articles/13600696.html

一、base64 加密
二、MD5 加密（不可逆）
三、sha1 加密（不可逆）
四、编码和解码字符串
使用 JS 函数的 escape()和 unescape()，分别是编码和解码字符串
五、AES/DES 加密解密

---

# vue 项目前端错误收集之 sentry

https://segmentfault.com/a/1190000019304469

# 前端错误日志监控-SENTRY 使用篇

https://www.freesion.com/article/7693914157/

---

### 待补充

vue 路由实现原理
`$forceUpdate()`
