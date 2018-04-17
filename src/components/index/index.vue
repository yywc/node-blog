<template>
  <el-container id="index">
    <header class="header">
      <el-row type="flex" class="row-bg _row-bg_" align="middle">
        <el-col :span="4">
          <!--登录用户编辑-->
          <el-button class="user" type="text">
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
          <el-button v-if="this.$isLogin" @click="logout" type="text">退出</el-button>
        </el-col>
      </el-row>
    </header>
    <el-main>
      <ArticleItem :articles="this.articles"></ArticleItem>
    </el-main>
    <el-footer>111</el-footer>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import {logout, getAllArticle} from '@/api/index'
  import Cookies from 'js-cookie'
  import ArticleItem from '@/common/article-item/article-item'

  export default {
    name: 'Index',
    data() {
      return {
        articles: []
      }
    },
    created() {
      getAllArticle()
        .then((res) => {
          if (res.status === 1) {
            this.articles = res.data
            console.log(res.data)
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
                console.error(res.data.msg)
              }
            })
            .catch((error) => {
              console.error('内部错误: ' + error.toString())
            })
        }
      }
    },
    components: {
      ArticleItem
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .header
    height: 300px
    background: #333
    ._row-bg_
      margin: 0 auto
      width: 1200px
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
          border-left: 1px solid rgba(255, 255, 255, 0.3)
          border-right: 1px solid rgba(255, 255, 255, 0.3)
          img
            display: inline-block
            width: 36px
            height: 36px
            vertical-align: middle
            border-radius: 50%
        .user-name
          color: #fff
      .title
        text-align: center
        color: #fff

</style>
