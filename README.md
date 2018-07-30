# node-blog
浅入深出 vue + node.js + koa2 + mysql 搭建前后端分离单人博客项目。[预览地址](iwangshu.com)

# 使用方式

+ clone 项目到本地，安装依赖。
+ 搭建 mysql 本地环境，创建数据库 nodeblog，创建用户 bloguser，密码设置为 1234
+ cd /blog/server/database，*nix 系统执行 NODE_ENV=development node init-database.js；windows 执行 set NODE_ENV=development node init-database.js
+ cd blog/server，执行 npm run start
+ cd blog 执行 npm run dev
+ 登录账号默认为 admin 123456，项目运行成功后，在地址栏输入 localhost:8080/#/login 进入登录页面，输入账号密码即可登录。

项目即可跑起来。

# 项目大纲
![nodeblog](https://raw.githubusercontent.com/yywc/node-blog/master/doc/nodeblog%E9%A1%B9%E7%9B%AE%E8%AE%BE%E8%AE%A1.png)

# 项目目录

+ 安装 node.js 与 mysql 数据库

+ [项目目录配置](https://github.com/yywc/node-blog/blob/master/doc/config.md)
