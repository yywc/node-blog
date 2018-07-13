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
  import { searchArticle, getAllArticle } from '@/api/index'
  import { mapMutations } from 'vuex'

  export default {
    name: 'Search',
    components: {
      ArticleItem,
      TheNav,
      Pagination
    },
    data() {
      return {
        articles: [],
        page: {},
        category: 0,
        title: '0'
      }
    },
    created() {
      this.getArticles()
    },
    watch: {
      '$route.params.title': {
        handler: function (val) {
          if (val !== '0') {
            this.setArticleTitleOfSearch(val)
            this._searchArticle(1, val)
          } else {
            this.setArticleTitleOfSearch('')
            this._getAllArticle(1, val)
          }
        },
        // 深度观察
        deep: true
      }
    },
    activated() {
      this.getArticles()
    },
    deactivated() {
      this.setArticleTitleOfSearch('')
    },
    methods: {
      getArticles() {
        this.title = this.$route.params.title
        if (this.title !== '0') {
          this._searchArticle(1, this.title)
        } else {
          this._getAllArticle(1, this.title)
        }
      },
      handleCurrentChange(page) {
        if (this.title !== '0') {
          this._searchArticle(page, this.title)
        } else {
          this._getAllArticle(page, this.category)
        }
      },
      _getAllArticle(page, category) {
        getAllArticle(page, category)
          .then((res) => {
            if (res.code === 0) {
              this.articles = res.data.data
              this.page = res.data
            } else {
              console.error('内部错误: ' + res.data.msg)
            }
          })
          .catch((e) => {
            console.error('内部错误: ' + e.toString())
          })
      },
      _searchArticle(page, title) {
        searchArticle(page, title)
          .then((res) => {
            if (res.code === 0) {
              this.articles = res.data.data
              this.page = res.data
            } else {
              console.error(res.data.msg)
            }
          })
          .catch((e) => {
            console.error('内部错误: ' + e.toString())
          })
      },
      ...mapMutations({
        setArticleTitleOfSearch: 'SET_ARTICLE_TITLE_OF_SEARCH'
      })
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
