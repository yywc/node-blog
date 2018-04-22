<template>
  <el-container>
    <m-header :isArticlePage="true"></m-header>
    <div class="main">
      <h1 class="title">{{this.article.title}}</h1>
      <div class="meta">
        <time :datetime="getTime(article)">{{getTime(article)}}</time>
        <span>/</span>
        <span>点赞数 23 / 阅读数 25 / 评论 11</span>
      </div>
      <p class="content">{{this.article.content}}</p>
      <div class="page">
        <span><< 上一篇</span>
        <span class="next">下一篇 >></span>
      </div>
    </div>
    <el-footer>
      <m-footer></m-footer>
    </el-footer>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import MHeader from '@/common/m-header/m-header'
  import MFooter from '@/common/m-footer/m-footer'
  import {getArticle} from '@/api/index'

  export default {
    name: 'Article',
    data() {
      return {
        article: {}
      }
    },
    created() {
      this._getArticle({articleId: this.$route.params.id})
    },
    methods: {
      _getArticle(id) {
        getArticle(id)
          .then((res) => {
            this.article = res.data[0]
          })
          .catch((e) => {
            console.error('内部错误: ' + e.toString())
          })
      },
      getTime(article) {
        return article.create_date ? article.create_date.split('T')[0] : ''
      }
    },
    components: {
      MFooter,
      MHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/stylus/mixin"

  .el-container
    height: 100%
    .main
      margin: 60px auto 0
      width: 1200px
      height: 100%
      .title
        margin: 70px 0 10px
        font-size: $text-size-large-xx
        text-align: center
      .meta
        margin-bottom: 30px
        color: $text-hint-dark
        text-align: center
        font-size: $text-size-medium
      .content
        padding-bottom: 30px
        line-height: 1.8
        border-bottom: 1px solid $line-dark
      .page
        position: relative
        margin: 20px 0
        color: $text-secondary-dark
        .next
          position: absolute
          right: 0

  .el-footer
    background: $blue-grey-800
</style>
