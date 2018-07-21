<template>
  <div>
    <the-nav class="nav-wrapper"></the-nav>
    <div class="main">
      <sub-header title="统计"></sub-header>
      <div class="content-wrapper">
        <p><em>建站日期</em>：2018-05-20</p>
        <p><em>运行天数</em>：{{ dateTime }} 天</p>
        <p><em>分类数量</em>：{{ categoryCount }} 个</p>
        <p><em>标签数量</em>：{{ tagCount }} 个</p>
        <p><em>日志数量</em>：{{ articleCount }} 篇</p>
        <p><em>评论数量</em>：{{ commentCount }} 篇</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import TheNav from '@/common/the-nav/the-nav'
  import SubHeader from '@/common/sub-header/sub-header'
  import { getStatistics } from '@/api/index'

  export default {
    name: 'Statistics',
    data() {
      return {
        categoryCount: 0,
        tagCount: 0,
        articleCount: 0,
        commentCount: 0
      }
    },
    components: {
      TheNav,
      SubHeader
    },
    computed: {
      dateTime() {
        const startTime = new Date('2018-05-20').getTime()
        const endTime = new Date().getTime()
        const time = (endTime - startTime) / (1000 * 60 * 60 * 24)
        return time | 0
      }
    },
    activated() {
      this._getStatistics()
    },
    methods: {
      _getStatistics() {
        getStatistics()
          .then((res) => {
            if (res.code === 0) {
              this.categoryCount = res.data.categoryCount
              this.tagCount = res.data.tagCount
              this.commentCount = res.data.commentCount
              this.articleCount = res.data.articleCount
            } else {
              console.error('内部错误: ' + res.data.msg)
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

  .nav-wrapper
    margin: 60px 0 0

  .main
    margin: 60px auto 50px
    width: 1000px
    .sub-header
      margin-bottom: 20px
    .content-wrapper
      margin-bottom: 50px
      p
        margin: 10px 0
        padding: 0 22px
        height: 30px
        line-height: 30px
        em
          position: relative
          top: -1px
          font-weight: bold
</style>
