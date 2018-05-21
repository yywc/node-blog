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
  import { articleMixin } from '@/assets/js/mixin'
  import { searchArticle } from '@/api/index'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    mixins: [articleMixin],
    name: 'Index',
    data() {
      return {
        category: 0
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
      articleOfSearch(newVal) {
        this.articles = newVal
      }
    },
    deactivated() {
      // 如果有搜索条件，则清空并重新获取数据
      if (this.articleTitleOfSearch !== '') {
        this.setSearchArticle({
          title: '',
          articles: []
        })
        this._getAllArticle(this.currentPage, this.category)
      }
    },
    methods: {
      handleCurrentChange(page) {
        if (this.articleTitleOfSearch !== '') {
          this._searchArticle({
            title: this.articleTitleOfSearch,
            p: page
          })
        } else {
          this._getAllArticle(page, this.category)
        }
      },
      _searchArticle(data) {
        searchArticle(data)
          .then((res) => {
            if (res.status === 1) {
              this.articles = res.data.data
              this.page = res.data
              this.setSearchArticle({
                title: this.articleTitleOfSearch,
                articles: res.data.data
              })
            } else {
              console.error(res.data)
            }
          })
          .catch((e) => {
            console.error('内部错误: ' + e.toString())
          })
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
    width: 1000px
    .article-wrapper
      margin: 0 auto 50px
      width: 1000px

</style>
