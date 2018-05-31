<template>
  <section>
    <the-nav class="nav-wrapper"></the-nav>
    <div class="main">
      <sub-header title="简介"></sub-header>
      <div class="content-wrapper">
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
  import SubHeader from '@/common/sub-header/sub-header'

  export default {
    name: 'About',
    components: {
      TheNav,
      SubHeader
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
        line-height: 1.6
        em
          font-weight: bold
</style>
