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
  import { getAllArticle } from '@/api/index'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Index',
    components: {
      ArticleItem,
      TheNav,
      Pagination
    },
    data() {
      return {
        articles: [],
        page: {}
      }
    },
    computed: {
      ...mapGetters([
        'updateArticleTime',
        'articleOfSearch',
        'articleTitleOfSearch'
      ])
    },
    watch: {
      updateArticleTime(newVal, oldVal) {
        if (newVal !== oldVal) {
          this._getAllArticle()
        }
      },
      articleOfSearch(newVal, oldVal) {
        const arr = [...newVal]
        arr.pop()
        this.articles = arr
      }
    },
    created() {
      this._getAllArticle()
    },
    deactivated() {
      // 如果有搜索条件，则清空
      if (this.articleTitleOfSearch !== '') {
        this.setSearchArticle({
          title: '',
          articles: []
        })
        this._getAllArticle()
      }
      // 如果有翻页，则恢复到第一页
      if (this.currentPage !== 1) {
        this._getAllArticle()
        // 更新 pagination 组件
        this.$refs.pagination.$children[0].handleCurrentChange(1)
      }
    },
    methods: {
      _getAllArticle(query) {
        getAllArticle(query)
          .then((res) => {
            if (res.status === 1) {
              this.articles = res.data.data
              this.page = res.data
            } else {
              console.error('内部错误: ' + res.data)
            }
          })
          .catch((e) => {
            console.error('内部错误: ' + e.toString())
          })
      },
      handleCurrentChange(page) {
        const data = { p: page }
        this._getAllArticle(data)
      },
      ...mapActions([
        'setSearchArticle'
      ])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/stylus/mixin"

  .nav-wrapper
    margin: 60px 0 0

  .main
    margin: 60px auto 50px
    width: 1200px
    .article-wrapper
      margin: 0 auto 50px
      width: 1000px

</style>
