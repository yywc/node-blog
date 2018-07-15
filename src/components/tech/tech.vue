<template>
  <div>
    <the-nav class="nav-wrapper"></the-nav>
    <div class="main">
      <div class="article-wrapper">
        <article-item :articles="this.articles"></article-item>
      </div>
      <pagination ref="pagination" :page="page"
        @handleCurrentChange="handleCurrentChange">
      </pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { articleMixin } from '@/assets/js/mixin/mixin'

  export default {
    mixins: [articleMixin],
    name: 'Tech',
    data() {
      return {
        category: 1
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
