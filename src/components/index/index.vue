<template>
  <el-container>
    <m-header></m-header>
    <m-nav></m-nav>
    <el-main>
      <div class="article-wrapper">
        <ArticleItem :articles="this.articles"></ArticleItem>
      </div>
    </el-main>
    <el-footer>
      <m-footer></m-footer>
    </el-footer>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import ArticleItem from '@/common/article-item/article-item'
  import MHeader from '@/common/m-header/m-header'
  import MNav from '@/common/m-nav/m-nav'
  import MFooter from '@/common/m-footer/m-footer'
  import {getAllArticle} from '@/api/index'

  export default {
    name: 'Index',
    data() {
      return {
        articles: []
      }
    },
    created() {
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
    components: {
      ArticleItem,
      MFooter,
      MNav,
      MHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/stylus/mixin"

  .article-wrapper
    margin: 0 auto
    width: 1200px

  .el-footer
    background: $blue-grey-800
</style>
