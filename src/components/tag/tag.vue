<template>
  <section>
    <the-nav class="nav-wrapper"></the-nav>
    <div class="main">
      <div class="article-wrapper">
        <article-item :articles="this.articles"></article-item>
      </div>
      <pagination
        ref="pagination"
        :page="page"
        @handleCurrentChange="handleCurrentChange"
      >
      </pagination>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import ArticleItem from '@/common/article-item/article-item'
  import TheNav from '@/common/the-nav/the-nav'
  import Pagination from '@/common/pagination/pagination'
  import { getArticlesByTag } from '@/api/index'

  export default {
    name: 'Tag',
    components: {
      ArticleItem,
      TheNav,
      Pagination
    },
    data() {
      return {
        articles: [],
        page: {},
        tag: ''
      }
    },
    activated() {
      this.tag = this.$route.params.tag
      this._getArticlesByTag(1, this.tag)
    },
    methods: {
      _getArticlesByTag(page, tag) {
        const data = {
          p: page,
          t: tag
        }
        getArticlesByTag(data)
          .then((res) => {
            this.articles = res.data.data
            this.page = res.data
          })
          .catch((e) => {
            console.error('内部错误: ' + e.toString())
          })
      },
      handleCurrentChange(page) {
        this._getArticlesByTag(page, this.tag)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/stylus/mixin"

  .nav-wrapper
    margin: 60px 0 0

  .main
    margin: 60px auto 50px
    width: 1000px
    .article-wrapper
      margin: 0 auto 50px
      width: 1000px

</style>
