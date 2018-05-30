<template>
  <section>
    <the-nav class="nav-wrapper"></the-nav>
    <div class="main">
      <sub-header title="统计"></sub-header>
      <div class="content-wrapper">
        <p><em>建站日期</em>：2018-05-20</p>
        <p><em>运行天数</em>：{{ dateTime }}</p>
        <p><em>分类数量</em>：gayhub、gmail、 微博在底部有链接</p>
        <p><em>标签数量</em>：gayhub、gmail、 微博在底部有链接</p>
        <p><em>日志数量</em>：后端 node.js，前端 vue.js，数据库 mysql</p>
        <p><em>评论数量</em>：后端 node.js，前端 vue.js，数据库 mysql</p>
        <p><em>最近更新</em>：后端 node.js，前端 vue.js，数据库 mysql</p>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import TheNav from '@/common/the-nav/the-nav'
  import SubHeader from '@/common/sub-header/sub-header'

  export default {
    name: 'Statistics',
    data() {
      return {
        categoryCount: 0,
        tagCount: 0,
        articleCount: 0,
        commentCount: 0,
        updateTime: ''
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
    methods: {
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
        padding: 0 10px
        height: 30px
        line-height: 30px
        em
          font-weight: bold
</style>
