<template>
  <section>
    <the-nav class="nav-wrapper"></the-nav>
    <div class="main">
      <div class="article-wrapper">
        <article-item :articles="this.articles"></article-item>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import ArticleItem from '@/common/article-item/article-item'
  import TheHeader from '@/common/the-header/the-header'
  import TheNav from '@/common/the-nav/the-nav'
  import TheFooter from '@/common/the-footer/the-footer'
  import { getAllArticle } from '@/api/index'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Index',
    components: {
      ArticleItem,
      TheFooter,
      TheNav,
      TheHeader
    },
    data() {
      return {
        articles: []
      }
    },
    computed: {
      ...mapGetters([
        'updateArticleTime',
        'articleOfSearch'
      ])
    },
    watch: {
      updateArticleTime(newVal, oldVal) {
        if (newVal !== oldVal) {
          this._getAllArticle()
        }
      },
      articleOfSearch(newVal, oldVal) {
        if (oldVal !== newVal) {
          const arr = [...newVal]
          arr.pop()
          this.articles = arr
        }
      },
      $route(to, from) {
        if (from.name === 'Index') {
          this.setSearchArticle({
            title: '',
            articles: []
          })
          this._getAllArticle()
        }
      }
    },
    created() {
      this._getAllArticle()
    },
    methods: {
      _getAllArticle() {
        getAllArticle()
          .then((res) => {
            if (res.status === 1) {
              this.articles = res.data
            } else {
              console.error('内部错误: ' + res.data)
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
    margin: 60px auto
    width: 1200px
    .article-wrapper
      margin: 0 auto
      width: 1000px

</style>
