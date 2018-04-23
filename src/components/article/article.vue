<template>
  <el-container>
    <the-header :is-article-page="true"></the-header>
    <div class="main">
      <h1 class="title">{{ this.article.title }}</h1>
      <div class="meta">
        <time :datetime="getTime">{{ getTime }}</time>
        <span>/</span>
        <span>点赞数 23 / 阅读数 25 / 评论 11</span>
      </div>
      <p class="content">{{ this.article.content }}</p>
      <div class="page">
        <span>上一篇</span>
        <span class="next">下一篇</span>
      </div>
    </div>
    <el-footer>
      <the-footer></the-footer>
    </el-footer>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import TheHeader from '@/common/the-header/the-header'
  import TheFooter from '@/common/the-footer/the-footer'
  import { getArticle } from '@/api/index'

  export default {
    name: 'Article',
    components: {
      TheFooter,
      TheHeader
    },
    data() {
      return {
        article: {}
      }
    },
    computed: {
      getTime() {
        return this.article.create_date ? this.article.create_date.split('T')[0] : ''
      }
    },
    watch: {
      '$route'(to, from) {
        // data数据操作
        if (to.name === 'Article') {
          this.$_getArticle({ articleId: this.$route.params.id })
        }
      }
    },
    created() {
      this.$_getArticle({ articleId: this.$route.params.id })
    },
    methods: {
      $_getArticle(id) {
        getArticle(id)
          .then((res) => {
            this.article = res.data[0]
          })
          .catch((e) => {
            console.error('内部错误: ' + e.toString())
          })
      }
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
