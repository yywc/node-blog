<template>
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
</template>

<script type="text/ecmascript-6">
  import Cookies from 'js-cookie'
  import {logout} from '@/api/index'

  export default {
    name: 'MHeader',
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
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
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

</style>
