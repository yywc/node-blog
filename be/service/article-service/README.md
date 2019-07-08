## 前言

这一部分主要是文章相关内容的服务搭建以及内容编写，文章的增删改查均在这部分进行。

## 踩坑

+ 在这里 tsc 编译时，不需要指定具体文件 `src/index.ts`，默认命令 `tsc` 即可，原因是编译器会从当前目录寻找 `tsconfig.json`，然后就会通过 include 里的配置编译；
+ 在使用 ts-node 配置开发环境时，会使 `tsconfig.json`中的 paths 失效，可以通过安装`tsconfig-paths`依赖解决；
+ 使用 es6 语法 import 第三方库时，需要 `import * as xx from 'xx'`，避免 undefined；

