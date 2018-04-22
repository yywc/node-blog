<template>
  <header class="header">
    <el-row type="flex" class="row-bg _row-bg_" align="middle">
      <el-col :span="4">
        <!--登录用户编辑-->
        <router-link class="user" to="/">
              <span class="avatar">
                <img src="@/assets/imgs/avatar.jpg" alt="">
              </span>
          <span class="user-name">眼已望穿</span>
        </router-link>
      </el-col>
      <el-col :span="16">
        <h1 class="title">岂曰无衣 与子同袍</h1>
      </el-col>
      <el-col :span="4">
        <router-link to="/">
          <el-button class="home" v-if="isArticlePage" type="text">
            <i class="iconfont icon-home"></i>首页
          </el-button>
        </router-link>
        <el-button class="logout" v-if="this.$isLogin" @click="logout" type="text"><i
          class="iconfont icon-logout"></i>退出
        </el-button>
      </el-col>
    </el-row>
  </header>
</template>

<script type="text/ecmascript-6">
  import Cookies from 'js-cookie'
  import {logout} from '@/api/index'

  export default {
    name: 'MHeader',
    props: {
      isArticlePage: {
        type: Boolean,
        default: false
      }
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
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~@/assets/stylus/mixin"

  .header
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
        font-size: $text-size-medium
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
      .home
        margin-right: 10px
      .logout, .home
        color: $text-secondary-light
        &:hover
          color: $green-500
      .title
        text-align: center
        color: $text-primary-light
      .iconfont
        margin-right: 3px
        font-size: $text-size-medium

</style>
