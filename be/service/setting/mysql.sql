-- 创建用户表
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
   id          INT         UNSIGNED PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
   name        VARCHAR(16) NULL                                COMMENT '登录名',
   password    VARCHAR(16) NULL                                COMMENT '登录密码',
   nickname    VARCHAR(16) NOT NULL                            COMMENT '用户昵称',
   contact     VARCHAR(20) NULL                                COMMENT '联系方式',
   ip_address  VARCHAR(16) NULL                                COMMENT '游客 IP 地址',
   create_time DATETIME   NOT NULL DEFAULT CURRENT_TIMESTAMP   COMMENT '创建时间',
   update_time DATETIME   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
   CONSTRAINT name UNIQUE (name),
   CONSTRAINT contact UNIQUE (contact)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户信息';
-- 新增用户
INSERT INTO user (id, name, password, nickname)
                 VALUES (NULL, 'admin', '123456', '测试用户');


-- 创建文章表
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  id            INT          UNSIGNED PRIMARY KEY AUTO_INCREMENT COMMENT '文章ID',
  title         VARCHAR(100) NOT NULL                            COMMENT '文章标题',
  content       TEXT         NOT NULL                            COMMENT '文章内容',
  category      VARCHAR(100) NOT NULL                            COMMENT '文章分类',
  tag           VARCHAR(100) NULL                                COMMENT '文章标签',
  head_img      VARCHAR(255) NULL                                COMMENT '图片地址',
  read_count    INT          NOT NULL DEFAULT 1                  COMMENT '文章阅读数',
  create_time   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP  COMMENT '创建时间',
  update_time   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文章内容';


-- 创建评论表
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  id                  INT          UNSIGNED PRIMARY KEY AUTO_INCREMENT    COMMENT '自增ID',
  article_id          INT          UNSIGNED NOT NULL                      COMMENT '文章ID',
  user_id             INT          UNSIGNED NOT NULL                      COMMENT '评论用户ID',
  nickname            VARCHAR(8)   NOT NULL                               COMMENT '评论用户名称',
  contact             VARCHAR(32)  NOT NULL                               COMMENT '评论用户联系方式',
  content             VARCHAR(255) NOT NULL                               COMMENT '评论内容',
  target_user         INT          UNSIGNED NULL                          COMMENT '评论目标用户ID',
  create_time         DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP     COMMENT '创建时间',
  update_time         DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='评论内容';
