# 前端部分
## 脚手架安装
首先通过 vue-cli 安装 vue 脚手架，一路下来，选择使用 eslint 和 vue-router。完成后打开 package.json 文件，在 dependencies 里添加如下依赖：
```
"markdown-it": "^8.4.1", // 用来支持文章编写 markdown 语法
"highlight.js": "^9.12.0", // markdown 高亮语法
"vuex": "^3.0.1", // vuex 全局状态管理
"nprogress": "^0.2.0", // 路由跳转以及 ajax 请求进度条
"create-keyframe-animation": "^0.1.0" // 创建动画
```
## 目录搭建
### api 文件夹
在 src 目录下创建 api 文件夹，接着创建 config.js 以及 index.js。

+ config.js 用来统一存储需要请求的 url 以及一些其他配置
+ index.js 则是专门用来封装 axios 的请求。

### assets 文件夹
在 assets 文件夹下创建 imgs、js、stylus 三个文件夹。

+ imgs 用来存放一些图片资源

+ js 文件夹下再创建一个 mixin.js、init.js、util.js。mixin.js 用来存放在 vue template 编写过程中引用的相同部分代码；init.js 封装 main.js 中初始化的一些代码；util.js 存放一些工具方法。

+ stylus 文件夹下创建 4 个文件。index.styl、markdown.styl、mixin.styl、reset.styl。index.styl 用来引入其他的 styl 文件，方便一次性在 main.js 中引入，markdown.styl 是用来重写 markdown 文章样式，reset.styl 重置 css 样式，mixin.styl 则是用来编写一些 stylus 的公用变量。

### common 文件夹
用来存放公用组件

### components 文件夹
存放页面组件

### router 文件夹
存放路由配置文件

### store 文件夹
在 store 文件夹下创建 getter.js、index.js、mutation-type.js、mutation.js、state.js，这些是 vuex 的一些配置。

# 服务端部分
在项目根目录创建 server 目录，执行 npm init 初始化。

在 package.json dependencies 中安装依赖。

```
"koa": "^2.5.0", // web 框架
"koa-router": "^7.4.0", // koa 路由控制
"mysql": "^2.15.0", // mysql 操作包
"koa-bodyparser": "^4.2.0", // koa 请求解析
"busboy": "^0.2.14", // 文件上传工具
"ipware": "^1.0.0", // 获取客户端请求的 ip 地址
"debug": "^3.1.0", // 调试工具
"lodash": "^4.17.10", // 工具库
"jsonwebtoken": "^8.3.0", // jwt 工具
"supervisor": "^0.12.0", // node 进程管理
"cross-env": "^5.2.0" // 跨平台定义环境变量
```
执行 npm install 安装依赖

## 目录搭建
### config 文件
创建 config.js 存储配置信息

### controllers
控制器，存放连接数据库与 koa-router 里的方法

### database
数据库操作相关

### middlewares
koa 中间件

### router
koa 路由相关

### index.js
服务入口
