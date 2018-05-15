<template>
  <el-container>
    <the-header></the-header>
    <the-nav></the-nav>
    <el-main>
      <div class="article-wrapper">
        <article-item :articles="this.articles"></article-item>
      </div>
    </el-main>
    <el-footer>
      <the-footer></the-footer>
    </el-footer>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import ArticleItem from '@/common/article-item/article-item'
  import TheHeader from '@/common/the-header/the-header'
  import TheNav from '@/common/the-nav/the-nav'
  import TheFooter from '@/common/the-footer/the-footer'
  import { getAllArticle } from '@/api/index'
  import { mapGetters } from 'vuex'

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
        'updateArticleTime'
      ])
    },
    watch: {
      updateArticleTime(oldVal, newVal) {
        if (newVal !== oldVal) {
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
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/stylus/mixin"

  .article-wrapper
    margin: 0 auto
    width: 1200px

  .el-main
    width: 100%
    min-width: 1200px

  .el-footer
    width: 100%
    min-width: 1200px
    background: $blue-gray-800
</style>
