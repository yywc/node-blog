<template>
  <section>
    <the-nav class="nav-wrapper"></the-nav>
    <div class="main">
      <div class="article-wrapper">
        <article-item :articles="this.articles"></article-item>
      </div>
      <pagination
        ref="pagination" :page="page"
        @handleCurrentChange="handleCurrentChange">
      </pagination>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import { articleMixin } from '@/assets/js/mixin'
  import { mapGetters } from 'vuex'

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
        'updateArticleTime'
      ])
    },
    watch: {
      updateArticleTime(newVal, oldVal) {
        if (newVal !== oldVal) {
          this._getAllArticle()
        }
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
