--创建用户表
CREATE TABLE IF NOT EXISTS blog_user (
  uid         INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT
  COMMENT '用户ID',
  name        VARCHAR(16)  NOT NULL UNIQUE KEY
  COMMENT '登录名',
  password    VARCHAR(16)  NOT NULL
  COMMENT '登录密码',
  nickname    VARCHAR(8)   NOT NULL
  COMMENT '用户昵称',
  create_time TIMESTAMP    NOT NULL
  COMMENT '创建时间',
  ip_address  VARCHAR(16)  NULL
  COMMENT '游客 IP 地址'
);
--新增用户
INSERT INTO blog_user VALUES (NULL, 'admin', '123456', '眼已望穿', NULL, NULL);


--创建文章表
CREATE TABLE IF NOT EXISTS blog_article (
  article_id     INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT
  COMMENT '文章ID',
  title          VARCHAR(32)  NOT NULL
  COMMENT '文章标题',
  content        TEXT         NOT NULL
  COMMENT '文章内容',
  create_time    TIMESTAMP    NOT NULL             DEFAULT CURRENT_TIMESTAMP
  COMMENT '创建时间',
  update_time    TIMESTAMP    NOT NULL             DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  COMMENT '更新时间',
  category        VARCHAR(100) NOT NULL
  COMMENT '文章分类',
  tag            VARCHAR(100) COMMENT '文章标签',
  img            VARCHAR(255) COMMENT '图片地址',
  read_count     INT UNSIGNED NOT NULL                    DEFAULT '0'
  COMMENT '浏览数',
  comment_count INT UNSIGNED NOT NULL                    DEFAULT '0'
  COMMENT '评论数'
);
--创建一条测试文章数据
INSERT INTO blog_article VALUES (NULL, 'test', 'test', NULL, NULL, '技术', NULL, NULL, 1, 0);


--创建评论表
CREATE TABLE IF NOT EXISTS blog_comment (
  id             INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT
  COMMENT '评论ID',
  article_id     INT UNSIGNED NOT NULL
  COMMENT '文章ID',
  user_id        INT UNSIGNED NOT NULL
  COMMENT '评论用户ID',
  nickname       VARCHAR(8)   NOT NULL
  COMMENT '评论用户名称',
  email          VARCHAR(32)  NOT NULL
  COMMENT '评论用户邮箱',
  content        VARCHAR(255) NOT NULL
  COMMENT '评论内容',
  target_user_id INT UNSIGNED NOT NULL
  COMMENT '评论目标用户ID',
  create_time    TIMESTAMP    NOT NULL             DEFAULT CURRENT_TIMESTAMP
  COMMENT '创建时间'
);

--更新文章
UPDATE `blog_article` SET `title`='new title' WHERE `article_id` = 1;

--删除文章
DELETE FROM `blog_article` WHERE `article_id` = 1;

--发表评论
INSERT INTO `blog_comment`` VALUES (NULL, 57, 1, '长夜无梦', '12423534@qq.com', 'mark一下，以后写 markdown 用得上。', NULL, NULL);

