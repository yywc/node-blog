<template>
  <el-container>
    <m-header></m-header>
    <nav class="nav">
      <ul class="menu">
        <li>
          <a href="#"><i class="iconfont icon-home"></i>首页</a>
        </li>
        <li>
          <a href="#"><i class="iconfont icon-computer"></i>技术</a>
        </li>
        <li>
          <a href="#"><i class="iconfont icon-page"></i>杂谈</a>
        </li>
        <li>
          <a href="#"><i class="iconfont icon-category"></i>分类</a>
        </li>
        <li>
          <a href="#"><i class="iconfont icon-message"></i>留言</a>
        </li>
        <li>
          <a href="#"><i class="iconfont icon-statistics"></i>统计</a>
        </li>
        <li>
          <a href="#"><i class="iconfont icon-people"></i>关于</a>
        </li>
      </ul>
    </nav>
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
      this.extraSceneTrigger = 0
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
      MHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/stylus/mixin"

  .nav
    margin-bottom: 40px
    width: 100%
    height: 40px
    .menu
      margin: 0 auto
      width: 1200px
      height: 40px
      line-height: 40px
      text-align: center
      li
        display: inline-block
        padding: 0 15px
        color: $text-secondary-dark
        &:hover
          color: $green-500
      .iconfont
        margin-right: 3px

  .article-wrapper
    margin: 0 auto
    width: 1200px

  .el-footer
    background: $blue-grey-800
</style>
