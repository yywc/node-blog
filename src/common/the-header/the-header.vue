<template>
  <header class="header">
    <el-row
      class="row-bg _row-bg_"
      type="flex"
      align="middle"
    >
      <el-col :span="4">
        <!--登录用户编辑-->
        <router-link
          class="user"
          to="/"
        >
              <span class="avatar">
                <img
                  class="avatar-pic"
                  src="@/assets/imgs/avatar.jpg"
                  alt="眼已望穿"
                >
              </span>
          <span class="user-name">眼已望穿</span>
        </router-link>
      </el-col>
      <el-col :span="16">
        <h1 class="title">岂曰无衣 与子同袍</h1>
      </el-col>
      <el-col :span="4">
        <router-link
          to="/writer"
          v-if="$isLogin"
        >
          <el-button
            round
            type="success"
          >
            写文章
          </el-button>
        </router-link>
        <el-button
          class="logout"
          type="text"
          v-if="$isLogin"
          @click="$_logout"
        >
          <i class="iconfont icon-logout"></i>退出
        </el-button>
      </el-col>
    </el-row>
  </header>
</template>

<script type="text/ecmascript-6">
  import Cookies from 'js-cookie'
  import { logout } from '@/api/index'

  export default {
    name: 'TheHeader',
    methods: {
      $_logout() {
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
    height: $height = 50px
    color: $text-secondary-dark
    border-bottom: 1px solid $line-dark
    box-sizing: border-box
    border-bottom 1px solid $line-dark
    background: $white
    z-index: $z-index-medium
    ._row-bg_
      margin: 0 auto
      width: 1200px
      height: $height
      .el-col:last-child
        text-align: right
      .user
        display: inline-block
        height: $height
        line-height: $height
        font-size: $text-size-medium
        .avatar
          display: inline-block
          padding: 0 7px
          width: $dimension = 36px
          .avatar-pic
            display: inline-block
            width: $dimension
            height: $dimension
            vertical-align: middle
            border-radius: 50%
        .user-name
          color: $text-secondary-dark
        &:hover .user-name
          color: $green-500
      .home
        margin-right: 10px
        color: $text-secondary-dark
      .logout
        margin-left: 15px
        color: $text-secondary-dark
        &:hover
          color: $green-500
      .title
        text-align: center
        color: $text-secondary-dark
      .iconfont
        margin-right: 3px
        font-size: $text-size-medium

</style>
