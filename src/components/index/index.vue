<template>
  <el-container>
    <header class="header">
      <nav class="top">
        <el-row type="flex" class="row-bg _row-bg_" align="middle">
          <el-col :span="4">
            <!--登录用户编辑-->
            <el-button class="user" type="text" onclick="location.reload()">
              <span class="avatar">
                <img src="@/assets/imgs/avatar.jpg" alt="">
              </span>
              <em class="user-name">眼已望穿</em>
            </el-button>
          </el-col>
          <el-col :span="16">
            <h1 class="title">岂曰无衣 与子同袍</h1>
          </el-col>
          <el-col :span="4">
            <el-button class="logout" v-if="this.$isLogin" @click="logout" type="text"><i
              class="iconfont icon-logout"></i>退出
            </el-button>
          </el-col>
        </el-row>
      </nav>
      <img src="~@/assets/imgs/header.png" @click="extraScene" alt="无欲则刚">
    </header>
    <nav class="nav">
      <ul class="menu">
        <li>
          <a href="#"><i class="iconfont icon-home"></i>首页</a>
        </li>
        <li>
          <a href="#"><i class="iconfont icon-computer"></i>技术</a>
        </li>
        <li>
          <a href="#"><i class="iconfont icon-page"></i>杂谈</a>
        </li>
        <li>
          <a href="#"><i class="iconfont icon-category"></i>分类</a>
        </li>
        <li>
          <a href="#"><i class="iconfont icon-message"></i>留言</a>
        </li>
        <li>
          <a href="#"><i class="iconfont icon-statistics"></i>统计</a>
        </li>
        <li>
          <a href="#"><i class="iconfont icon-people"></i>关于</a>
        </li>
      </ul>
    </nav>
    <el-main>
      <div class="article-wrapper">
        <ArticleItem :articles="this.articles"></ArticleItem>
      </div>
    </el-main>
    <el-footer>
      <em>版权所有 © (2018 - ?)</em>
      <em class="dividing">|</em>
      <em>独家赞助: 深圳市爱望舒科技有限公司 (我还没注册)</em>
      <em class="dividing">|</em>
      <a href="https://github.com/yywc" target="_blank">
        <i class="iconfont icon-github"></i>
      </a>
      <em class="dividing">|</em>
      <a href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=gyjyywc@gmail.com" target="_blank">
        <i class="iconfont icon-email"></i>
      </a>
      <em class="dividing">|</em>
      <a href="https://weibo.com/u/3294217170" target="_blank">
        <i class="iconfont icon-microblog"></i>
      </a>
    </el-footer>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import ArticleItem from '@/common/article-item/article-item'
  import Cookies from 'js-cookie'
  import {logout, getAllArticle} from '@/api/index'

  export default {
    name: 'Index',
    data() {
      return {
        articles: []
      }
    },
    created() {
      this.extraSceneTrigger = 0
      getAllArticle()
        .then((res) => {
          if (res.status === 1) {
            this.articles = res.data
          } else {
            console.error('内部错误: ' + res.data)
          }
        })
        .catch((e) => {
          console.error('内部错误: ' + e.toString())
        })
    },
    methods: {
      logout() {
        if (!this.$isLogin) {
          window.location.reload()
        } else {
          logout()
            .then((res) => {
              if (res.status === 1) {
                Cookies.remove('TOKEN')
                window.location.reload()
              } else {
                console.error(res.msg)
              }
            })
            .catch((error) => {
              console.error('内部错误: ' + error.toString())
            })
        }
      },
      extraScene() {
        this.extraSceneTrigger++
        if (this.extraSceneTrigger > 5) {
          this.$alert('将子无怒，秋以为期', '眼已望穿', {
            showConfirmButton: false,
            center: true,
            lockScroll: false,
            callback: () => {
            }
          })
          // alert('将子无怒，秋以为期')
        } else if (!this.extraSceneTimer) {
          this.extraSceneTimer = setTimeout(() => {
            this.extraSceneTrigger = 0
            this.extraSceneTimer = null
          }, 1500)
        }
      }
    },
    components: {
      ArticleItem
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/stylus/mixin"

  .header
    padding-top: 100px;
    height: 120px
    .top
      position: fixed
      top: 0
      right: 0
      left: 0
      height: 60px
      color: $text-secondary-light
      border-bottom: 1px solid $line-dark
      box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.7)
      box-sizing: border-box
      background: $blue-grey-800
      z-index: $z-index-top
      ._row-bg_
        margin: 0 auto
        width: 1200px
        height: 100%
        .el-col:last-child
          text-align: right
        .user
          display: inline-block
          height: 100%
          .avatar
            display: inline-block
            padding: 0 7px
            width: 36px
            height: 100%
            img
              display: inline-block
              width: 36px
              height: 36px
              vertical-align: middle
              border-radius: 50%
          .user-name
            color: $text-secondary-light
          &:hover .user-name
            color: $green-500
        .logout
          color: $text-secondary-light
          &:hover
            color: $green-500
        .title
          text-align: center
          color: $text-primary-light
        .iconfont
          margin-right: 3px
          font-size: $text-size-medium
          vertical-align: middle
    img
      display: block
      margin: 0 auto
      width: 400px

  .nav
    margin-bottom: 40px
    width: 100%
    height: 40px
    .menu
      margin: 0 auto
      width: 1200px
      height: 40px
      line-height: 40px
      text-align: center
      li
        display: inline-block
        padding: 0 15px
        color: $text-secondary-dark
        &:hover
          color: $green-500
      .iconfont
        margin-right: 3px

  .article-wrapper
    margin: 0 auto
    width: 1200px

  .el-footer
    display: flex
    align-items: center
    font-size: $text-size-small
    justify-content: center
    color: $text-secondary-light
    background: $blue-grey-800
    border-top: 1px solid $line-dark;
    .dividing
      margin: 0 7px
      font-size: $text-size-large
    .iconfont
      font-size: $icon-size-large-x
      &:hover
        color: $green-500
</style>
