<template>
  <header class="header" id="header">
    <el-row
      class="row-bg _row-bg_"
      type="flex"
      align="middle">
      <el-col :span="7">
        <!--登录用户编辑-->
        <a
          class="user"
          href="javascript:void(0);"
          @click="toPath">
              <span class="avatar">
                <img
                  class="avatar-pic"
                  src="@/assets/imgs/avatar.jpg"
                  alt="眼已望穿">
              </span>
          <span class="user-name">眼已望穿</span>
        </a>
        <router-link
          class="btn-to-writer"
          to="/writer"
          v-if="$isLogin">
          <el-button
            round
            type="success">
            写文章
          </el-button>
        </router-link>
      </el-col>
      <el-col :span="10">
        <h1 class="title">岂曰无衣 与子同袍</h1>
      </el-col>
      <el-col :span="7">
        <input
          class="search-input"
          type="text"
          placeholder="搜索"
          v-model.trim="articleTitle"
          @keydown.enter="handleEnter">
        <i class="iconfont icon-search" @click="search"></i>
        <el-button
          class="logout"
          type="text"
          v-if="$isLogin"
          @click="_logout">
          <i class="iconfont icon-logout"></i>退出
        </el-button>
      </el-col>
    </el-row>
  </header>
</template>

<script type="text/ecmascript-6">
  import { logout } from '@/api/index'
  import { mapGetters } from 'vuex'
  import { setDataV } from '@/assets/js/util'

  export default {
    name: 'TheHeader',
    data() {
      return {
        articleTitle: this.articleTitleOfSearch
      }
    },
    computed: {
      ...mapGetters([
        'articleTitleOfSearch'
      ])
    },
    created() {
      this.$nextTick(() => {
        setDataV(document.getElementById('header'))
      })
    },
    watch: {
      // 动态改变搜索框里的内容
      articleTitleOfSearch(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.articleTitle = newVal
        }
      }
    },
    methods: {
      _logout() {
        if (!this.$isLogin) {
          location.href = '/'
        } else {
          logout()
            .then((res) => {
              console.log(res)
              if (res.code === 0) {
                location.href = '/'
              } else {
                console.error(res.data.msg)
              }
            })
            .catch((error) => {
              console.error('内部错误: ' + error.toString())
            })
        }
      },
      search() {
        const url = this.articleTitle ? '/search/' + encodeURIComponent(this.articleTitle) : '/search/0'
        this.$router.push(url)
      },
      handleEnter() {
        this.search()
      },
      toPath() {
        if (this.$route.path === '/') {
          window.location.reload()
        } else {
          this.$router.push('/')
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/stylus/mixin"

  .header
    position: fixed
    top: 0
    right: 0
    left: 0
    height: $height = 55px
    color: $text-secondary-dark
    border-bottom: 1px solid $line-dark
    box-sizing: border-box
    border-bottom 1px solid $line-dark
    background: $white
    z-index: $z-index-medium
    ._row-bg_
      margin: 0 auto
      padding: 0 25px
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
          color: $green-400
      .btn-to-writer
        margin-left: 40px
      .home
        margin-right: 10px
        color: $text-secondary-dark
      .title
        text-align: center
        color: $text-secondary-dark
      .icon-search
        position: relative
        top: 3px
        left: -35px
        color: $text-hint-dark
        font-size: $text-size-large-x
        cursor: pointer
        extend-click()
      .search-input
        padding: 0 35px 0 15px
        width: 130px
        height: 40px
        line-height: 40px
        color: $text-secondary-dark
        border: none
        border-radius: 20px
        box-sizing: border-box
        background: $gray-200
        transition: all .3s
        outline: none
        no-wrap()
        &:focus
          width: 200px
          color: $text-secondary-dark
          border: 1px solid $green-100
          background: $green-50
      .logout
        margin-left: 40px
        color: $text-secondary-dark
        &:hover
          color: $green-400
        .icon-logout
          margin-right: 3px
          font-size: $text-size-medium

</style>
