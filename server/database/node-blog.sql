-- 创建用户表
DROP TABLE IF EXISTS `blog_user`;
CREATE TABLE `blog_user` (
  uid         INT UNSIGNED AUTO_INCREMENT
  COMMENT '自增ID'
    PRIMARY KEY,
  name        VARCHAR(16)                         NULL
  COMMENT '登录名',
  password    VARCHAR(16)                         NULL
  COMMENT '登录密码',
  nickname    VARCHAR(8)                          NOT NULL
  COMMENT '用户昵称',
  contact     VARCHAR(20)                         NULL,
  ip_address  VARCHAR(16)                         NULL
  COMMENT '游客 IP 地址',
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
  COMMENT '创建时间',
  update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP
  COMMENT '更新时间',
  CONSTRAINT name
  UNIQUE (name),
  CONSTRAINT contact
  UNIQUE (contact)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户信息';
-- 新增用户
INSERT INTO blog_user VALUES (NULL, 'admin', '123456', '测试用户', NULL, NULL, NULL, NULL);



-- 创建文章表
DROP TABLE IF EXISTS `blog_article`;
CREATE TABLE `blog_article` (
  article_id    INT UNSIGNED AUTO_INCREMENT
  COMMENT '文章ID'
    PRIMARY KEY,
  title         VARCHAR(32)                         NOT NULL
  COMMENT '文章标题',
  content       TEXT                                NOT NULL
  COMMENT '文章内容',
  create_time   TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
  COMMENT '创建时间',
  update_time   TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP
  COMMENT '更新时间',
  category      VARCHAR(100)                        NULL,
  tag           VARCHAR(100)                        NULL
  COMMENT '文章标签',
  img           VARCHAR(255)                        NULL
  COMMENT '图片地址',
  read_count    INT UNSIGNED DEFAULT '1'            NOT NULL,
  comment_count INT UNSIGNED DEFAULT '0'            NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文章表';


-- 创建评论表
DROP TABLE IF EXISTS `blog_comment`;
CREATE TABLE `blog_comment` (
  id                  INT UNSIGNED AUTO_INCREMENT
  COMMENT '自增ID'
    PRIMARY KEY,
  article_id          INT UNSIGNED                        NOT NULL
  COMMENT '文章ID',
  user_id             INT UNSIGNED                        NOT NULL
  COMMENT '评论用户ID',
  nickname            VARCHAR(8)                          NOT NULL
  COMMENT '评论用户名称',
  contact             VARCHAR(32)                         NOT NULL
  COMMENT '评论用户联系方式',
  comment             VARCHAR(255)                        NOT NULL
  COMMENT '评论内容',
  target_user_id      INT UNSIGNED                        NULL
  COMMENT '评论目标用户ID',
  create_comment_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
  COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='评论表';
