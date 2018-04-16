--创建用户表
CREATE TABLE IF NOT EXISTS blog_user (
  id          INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT
  COMMENT '自增ID',
  name        VARCHAR(16)  NOT NULL UNIQUE KEY
  COMMENT '登录名',
  password    VARCHAR(16)  NOT NULL
  COMMENT '登录密码',
  nickname    VARCHAR(8)   NOT NULL
  COMMENT '用户昵称',
  create_date TIMESTAMP    NOT NULL
  COMMENT '创建时间'
);
--新增用户
INSERT INTO blog_user VALUES (NULL, 'admin', '123456', '管理员', NULL);


--创建文章表
CREATE TABLE IF NOT EXISTS blog_article (
  id          INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT
  COMMENT '自增ID',
  title       VARCHAR(32)  NOT NULL
  COMMENT '文章标题',
  content     TEXT         NOT NULL
  COMMENT '文章内容',
  create_date TIMESTAMP    NOT NULL
  COMMENT '创建时间',
  catalog     VARCHAR(16) COMMENT '文章分类',
  avatar      VARCHAR(100) COMMENT '图片地址',
  count       INT UNSIGNED COMMENT '浏览数',
  favorite    INT UNSIGNED COMMENT '点赞数'
);
--创建一条测试文章数据
INSERT INTO blog_article VALUES (NULL, 'test', 'test', NULL, NULL, NULL, NULL, NULL);
