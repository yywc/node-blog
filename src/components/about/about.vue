<template>
  <section>
    <the-nav class="nav-wrapper"></the-nav>
    <div class="main">
      <div class="content-wrapper">
        <h1 class="title">简介</h1>
        <p><em>博主</em>：眼已望穿</p>
        <p><em>期望</em>：如月之恒，如日之升</p>
        <p><em>联系</em>：gayhub、gmail、 微博在底部有链接</p>
        <p><em>技术</em>：后端 node.js，前端 vue.js，数据库 mysql</p>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import TheNav from '@/common/the-nav/the-nav'

  export default {
    name: 'About',
    components: {
      TheNav
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
    .content-wrapper
      margin-bottom: 50px
      .title
        position: relative
        margin-bottom: 20px
        padding-left: 15px
        height: 36px
        line-height: 36px
        font-size: $text-size-large-x
        font-weight: bold
        border-left: 7px solid $green-400
        &:after
          position: absolute
          top: 50%
          left: 120px
          width: 865px
          height: 1px
          color: $gray-50
          background: $line-dark
          transform: translate3d(0, -50%, 0)
          content: ''
      p
        margin: 10px 0
        padding: 0 10px
        line-height: 1.6
        em
          font-weight: bold
      .name
        padding-right: 50px
      .name, .time
        text-align: right
</style>
