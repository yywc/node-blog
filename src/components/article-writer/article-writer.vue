<template>
  <el-container>
    <the-header></the-header>
    <section class="main">
      <div class="title">
        <input type="text" :value="this.article.title" title="标题">
      </div>
      <div class="content">
        <textarea :value="this.article.content" title="文章内容"></textarea>
      </div>
    </section>
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
    name: 'ArticleWriter',
    components: {
      TheFooter,
      TheHeader
    },
    data() {
      return {
        article: {}
      }
    },
    created() {
      this.id = this.$route.params.id
      this.$_getArticle({ articleId: this.id })
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

  .main
    margin: 60px auto 0
    width: 800px
    .title
      margin: 70px 0 10px
      font-size: $text-size-large-xx
      text-align: center

  .el-footer
    width: 100%
    min-width: 1200px
    background: $blue-grey-800
</style>
